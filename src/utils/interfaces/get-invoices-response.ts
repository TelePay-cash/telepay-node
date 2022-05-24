import { Invoice } from './invoice';

export type Invoices =
    'number'
    | 'asset'
    | 'blockchain'
    | 'status'
    | 'amount'
    | 'description'
    | 'metadata'
    | 'created_at'
    | 'updated_at'

export interface GetInvoicesResponse {
    invoices: Pick<Invoice, Invoices>[]
}
