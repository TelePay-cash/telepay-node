import { Network } from '../enums';

export interface Asset {
    asset: string,
    blockchain: string,
    usd_price: number,
    url: string,
    networks: Network[],
    coingecko_id: string,
    precision: 9,
    deposit_minimum: string,
    deposit_enabled: boolean,
    withdrawal_minimum: string,
    withdrawal_enabled: boolean,
    withdrawal_fee_percentage: string,
    withdrawal_fee_fixed: string,
}
