/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON',
 *  network: string => default: 'mainnet',
 *  amount: double,
 *  to_address: string
 *
 * optional:
 *  message: string
 */
export interface WithdrawBody {
    asset: string,
    blockchain: string,
    network: string,
    amount: number,
    to_address: string,
    message?: string
}
