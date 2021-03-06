export enum UrlHelper {
    getMe = '/getMe',
    getBalance = '/getBalance',
    getAsset = '/getAsset',
    getAssets = '/getAssets',
    getInvoice = '/getInvoice',
    getInvoices = '/getInvoices',
    getWebhook = '/getWebhook',
    getWebhooks = '/getWebhooks',
    createInvoice = '/createInvoice',
    cancelInvoice = '/cancelInvoice',
    deleteInvoice = '/deleteInvoice',
    transfer = '/transfer',
    getWithdrawFee = '/getWithdrawFee',
    getWithdrawMinimum = '/getWithdrawMinimum',
    withdraw = '/withdraw',
    createWebhook = '/createWebhook',
    updateWebhook = '/updateWebhook',
    activateWebhook = '/activateWebhook',
    deactivateWebhook = '/deactivateWebhook',
    deleteWebhook = '/deleteWebhook'
}

export type ApiEndpoint = UrlHelper | string;
