/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON'
 *
 * optional:
 *  network: string => default: 'mainnet'
 */
export interface GetOneAssetBody {
    asset: string,
    blockchain: string,
    network?: string
}
