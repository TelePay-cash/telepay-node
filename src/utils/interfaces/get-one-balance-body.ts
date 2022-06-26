/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON'
 *  network: string => default: 'mainnet'
 */
export interface GetOneBalanceBody {
    asset: string,
    blockchain: string,
    network: string
}
