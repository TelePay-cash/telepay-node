import { Owner } from './owner';

export interface Merchant {
    name: string,
    url: string,
    logo_url: string,
    logo_thumbnail_url: string,
    owner: Owner
}
