import { Asset } from './asset';

export interface GetOneAssetResponse extends Asset {
    usd_price: string,
    coingecko_id: string
}
