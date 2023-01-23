import { Network } from '../enums';

/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON'
 *
 * optional:
 *  network: Network => default: 'mainnet'
 */
export interface GetOneAssetBody {
    asset: string,
    blockchain: string,
    network?: Network
}
