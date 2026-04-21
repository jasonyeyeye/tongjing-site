import { getSheetValues } from './client.ts';

const rows = await getSheetValues('By6bsNps8hU3lst9puPcjKsknEf', '7bb28e', 'A1:R7');
console.log('Type:', typeof rows);
console.log('IsArray:', Array.isArray(rows));
console.log('Keys:', Object.keys(rows));
console.log('First row:', rows[0]);
