import { Merchant } from './merchant';

export interface GetMeResponse {
    version: string,
    merchant: Merchant,
    is_active: boolean
}
