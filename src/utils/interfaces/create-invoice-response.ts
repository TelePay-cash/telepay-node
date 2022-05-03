import { Metadata } from './metadata';

export interface CreateInvoiceResponse {
    number: string,
    asset: string,
    blockchain: string,
    network: string,
    status: string,
    amount: string,
    description: string,
    hidden_message: string,
    metadata: Metadata,
    checkout_url: string,
    success_url: string,
    cancel_url: string,
    explorer_url: string,
    expires_at: string,
    created_at: string,
    updated_at: string
}
