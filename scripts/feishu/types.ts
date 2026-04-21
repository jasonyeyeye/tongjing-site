// Feishu API types

export interface FeishuTokenResponse {
  code: number;
  msg: string;
  tenant_access_token: string;
  expire: number;
}

export interface SheetCell {
  value: string | number | boolean;
}

export interface SheetRow {
  [col: string]: string | number | boolean;
}
