/**
 * Feishu API Client
 * 自动管理 tenant_access_token（缓存 + 自动刷新）
 */

import type { FeishuTokenResponse } from './types';

const API_BASE = 'https://open.feishu.cn/open-apis';
const TOKEN_CACHE_TTL = 7000; // 飞书 token 有效期 2 小时，提前刷新

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

function getEnvVar(name: string): string {
  const val = process.env[name];
  if (!val) {
    console.error(`❌ Missing environment variable: ${name}`);
    process.exit(1);
  }
  return val;
}

/**
 * 获取有效的 tenant_access_token（优先复用缓存）
 */
export async function getToken(): Promise<string> {
  const now = Date.now();

  // 缓存未过期，直接返回
  if (tokenCache && now < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  // 获取新 token
  const appId = getEnvVar('FEISHU_APP_ID');
  const appSecret = getEnvVar('FEISHU_APP_SECRET');

  const response = await fetch(
    `${API_BASE}/auth/v3/tenant_access_token/internal`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    }
  );

  const data = await response.json() as FeishuTokenResponse;

  if (data.code !== 0) {
    console.error(`❌ Failed to get token: ${data.code} ${data.msg}`);
    process.exit(1);
  }

  tokenCache = {
    token: data.tenant_access_token,
    expiresAt: now + (data.expire - TOKEN_CACHE_TTL) * 1000,
  };

  console.log('✅ Got new tenant_access_token');
  return tokenCache.token;
}

/**
 * 通用 GET 请求
 */
async function request<T>(
  path: string,
  token: string,
  params?: Record<string, string>
): Promise<T> {
  let url = `${API_BASE}${path}`;
  if (params) {
    const qs = new URLSearchParams(params).toString();
    url += `?${qs}`;
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json() as { code: number; msg: string; data: T };

  if (data.code !== 0) {
    throw new Error(`Feishu API error ${data.code}: ${data.msg}`);
  }

  return data.data;
}

/**
 * 读取电子表格多个单元格范围
 * @param spreadsheetToken 电子表格 token
 * @param sheetId Sheet ID
 * @param range 例如 "A1:R6"
 */
export async function getSheetValues(
  spreadsheetToken: string,
  sheetId: string,
  range: string
): Promise<(string | number | boolean)[][]> {
  const token = await getToken();
  // GET /sheets/v2/spreadsheets/{token}/values/{sheetId}!{range}
  const url = `${API_BASE}/sheets/v2/spreadsheets/${spreadsheetToken}/values/${sheetId}!${range}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json() as { code: number; msg: string; data: { value: (string | number | boolean)[][] } };
  if (result.code !== 0) {
    throw new Error(`Feishu API error ${result.code}: ${result.msg}`);
  }
  return result.data.value;
}

/**
 * 获取电子表格的 sheet 列表
 */
export async function getSheetList(
  spreadsheetToken: string
): Promise<{ sheet_id: string; title: string; index: number }[]> {
  const token = await getToken();
  const path = `/sheets/v3/spreadsheets/${spreadsheetToken}/sheets/query`;
  const data = await request<{ sheets: { sheet_id: string; title: string; index: number }[] }>(
    path,
    token
  );
  return data.sheets;
}
