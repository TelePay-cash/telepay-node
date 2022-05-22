import { Owner } from './owner';

export interface Merchant {
    name: string,
    url: string,
    logo_url: string,
    logo_thumbnail_url: string,
    verified: boolean,
    username: string,
    public_profile: string,
    owner: Owner,
    created_at: string,
    updated_at: string
}
