/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON',
 *  network: string => default: 'mainnet',
 *  amount: double
 *  username: string
 *
 * optional:
 *  message: string
 */
export interface TransferBody {
    asset: string,
    blockchain: string,
    network: string,
    amount: number,
    username: string,
    message?: string
}
