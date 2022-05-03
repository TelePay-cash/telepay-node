export enum UrlHelper {
    getMe = '/getMe',
    getBalance = '/getBalance',
    getAssets = '/getAssets',
    getInvoices = '/getInvoices',
    getInvoice = '/getInvoice',
    createInvoice = '/createInvoice',
    cancelInvoice = '/cancelInvoice',
    deleteInvoice = '/deleteInvoice',
    transfer = '/transfer',
    getWithdrawFee = '/getWithdrawFee',
    getWithdrawMinimum = '/getWithdrawMinimum',
    withdraw = '/withdraw'
}

export type ApiEndpoint = UrlHelper | string;
