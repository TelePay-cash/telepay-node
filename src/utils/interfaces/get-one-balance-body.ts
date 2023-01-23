import { Network } from '../enums';

/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON'
 *  network: Network => default: 'mainnet'
 */
export interface GetOneBalanceBody {
    asset: string,
    blockchain: string,
    network: Network
}
