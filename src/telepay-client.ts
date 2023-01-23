import { ApiEndpoint, ApiMethod, UrlHelper } from './utils/enums';
import axios, { Axios, AxiosResponse } from 'axios';
import {
    Asset,
    CreateInvoiceBody,
    GetAllBalanceResponse,
    GetAssetsResponse,
    GetInvoicesResponse,
    GetMeResponse,
    GetOneAssetBody,
    GetOneBalanceBody,
    GetWebhooksResponse,
    GetWithdrawFeeResponse,
    GetWithdrawMinimumBody,
    GetWithdrawMinimumResponse,
    Invoice,
    StatusWebhookBody,
    TelePayResponse,
    TransferBody,
    Webhook,
    WebhookBody,
    WithdrawBody
} from './utils/interfaces';
import {
    BASE_URL,
    validateAuthorization,
    validateCreateInvoice,
    validateGetOneBalance,
    validateGetWithdrawMinimum,
    validateInvoiceNumber,
    validateStatusWebhookBody,
    validateTransfer,
    validateWebhookBody,
    validateWithdraw
} from './utils';

/**
 * @link Documentation: https://telepay.readme.io/reference/welcome
 */
export class TelepayClient {
    private readonly authorization: string;
    private readonly axios: Axios;

    /**
     * @link Documentation: https://telepay.readme.io/reference/authentication
     * @param {string} authorization Secret Key (one by merchant)
     */
    constructor(authorization: string) {
        validateAuthorization(authorization);
        this.authorization = authorization;
        this.axios = axios.create({
            baseURL: BASE_URL,
            headers: { 'AUTHORIZATION': this.authorization },
            timeout: 30000,
            responseType: 'json',
            transformRequest: [
                (data: any, headers: any) => {
                    headers['Content-Type'] = 'application/json';
                    return JSON.stringify(data);
                }
                // @ts-ignore
            ].concat(axios.defaults.transformRequest),
            transformResponse: data => (typeof data === 'string') ? JSON.parse(data) : data
        });
    }

    /**
     * @link Documentation: https://telepay.readme.io/reference/getme
     * @method GET
     * @return Promise<AxiosResponse<GetMeResponse>>
     * Info about the current merchant.
     */
    public getMe = (): Promise<AxiosResponse<GetMeResponse>> => this.axios.get(UrlHelper.getMe);

    /**
     * @link Documentation: https://telepay.readme.io/reference/getbalance
     * @method GET
     * @return Promise<AxiosResponse<GetAllBalanceResponse>>
     * Get your merchant wallet balance, specifying the asset.
     */
    public getAllBalances = (): Promise<AxiosResponse<GetAllBalanceResponse>> => this.axios.get(UrlHelper.getBalance);

    /**
     * @link Documentation: https://telepay.readme.io/reference/getbalance-1
     * @method POST
     * @return Promise<AxiosResponse<GetAllBalanceResponse>>
     * Get your merchant wallet assets with corresponding balance.
     */
    public getOneBalance = (data: GetOneBalanceBody): Promise<AxiosResponse<GetAllBalanceResponse>> => {
        validateGetOneBalance(data);
        return this.axios.post(UrlHelper.getBalance, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/getasset
     * @method GET
     * @param {GetOneAssetBody} data Payload of asset.
     * @return Promise<AxiosResponse<Asset>>
     * Get asset details.
     */
    public getAsset = (data: GetOneAssetBody): Promise<AxiosResponse<Asset>> =>
        this.axios.post(UrlHelper.getAsset, data);

    /**
     * @link Documentation: https://telepay.readme.io/reference/getassets
     * @method GET
     * @return Promise<AxiosResponse<GetAssetsResponse>>
     * Get assets supported by TelePay.
     */
    public getAssets = (): Promise<AxiosResponse<GetAssetsResponse>> => this.axios.get(UrlHelper.getAssets);

    /**
     * @link Documentation: https://telepay.readme.io/reference/getinvoice
     * @method GET
     * @param {string} invoiceNumber ID of invoice.
     * @return Promise<AxiosResponse<Invoice>>
     * Get invoice details, by ID.
     */
    public getInvoice = (invoiceNumber: string): Promise<AxiosResponse<Invoice>> => {
        validateInvoiceNumber(invoiceNumber);
        return this.axios.get(`${ UrlHelper.getInvoice }/${ invoiceNumber }`);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/getinvoice
     * @method GET
     * @return Promise<AxiosResponse<GetInvoicesResponse>>
     * Get invoices details.
     */
    public getInvoices = (): Promise<AxiosResponse<GetInvoicesResponse>> => this.axios.get(UrlHelper.getInvoices);

    /**
     * @link Documentation: https://telepay.readme.io/reference/getwebhook
     * @method GET
     * @param {number} webhook_id Webhook ID.
     * @return Promise<AxiosResponse<Webhook>>
     * Get webhook details.
     */
    public getWebhook = (webhook_id: number): Promise<AxiosResponse<Webhook>> =>
        this.axios.get(`${ UrlHelper.getWebhook }/${ webhook_id }`);

    /**
     * @link Documentation: https://telepay.readme.io/reference/getwebhooks
     * @method GET
     * @return Promise<AxiosResponse<GetWebhooksResponse>>
     * Get webhooks.
     */
    public getWebhooks = (): Promise<AxiosResponse<GetWebhooksResponse>> =>
        this.axios.get(UrlHelper.getWebhooks);

    /**
     * @link Documentation: https://telepay.readme.io/reference/createinvoice
     * @method POST
     * @param {CreateInvoiceBody} data Payload of new invoice.
     * @return Promise<AxiosResponse<Invoice>>
     * Creates an invoice, associated to your merchant.
     */
    public createInvoice = (data: CreateInvoiceBody): Promise<AxiosResponse<Invoice>> => {
        validateCreateInvoice(data);
        return this.axios.post(UrlHelper.createInvoice, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/cancelinvoice
     * @method POST
     * @param {string} invoiceNumber ID of invoice.
     * @return Promise<AxiosResponse<Invoice>>
     * Cancel invoice, by its number.
     */
    public cancelInvoice = (invoiceNumber: string): Promise<AxiosResponse<Invoice>> => {
        validateInvoiceNumber(invoiceNumber);
        return this.axios.post(`${ UrlHelper.cancelInvoice }/${ invoiceNumber }`);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/deleteinvoice
     * @method POST
     * @param {string} invoiceNumber ID of invoice.
     * @return Promise<AxiosResponse<TelePayResponse>>
     * Delete invoice, by its number.
     */
    public deleteInvoice = (invoiceNumber: string): Promise<AxiosResponse<TelePayResponse>> => {
        validateInvoiceNumber(invoiceNumber);
        return this.axios.delete(`${ UrlHelper.deleteInvoice }/${ invoiceNumber }`);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/transfer
     * @method POST
     * @param {TransferBody} data Payload for transfer.
     * @return Promise<AxiosResponse<TelePayResponse>>
     * Transfer funds between internal wallets. Off-chain operation.
     */
    public transfer = (data: TransferBody): Promise<AxiosResponse<TelePayResponse>> => {
        validateTransfer(data);
        return this.axios.post(UrlHelper.transfer, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/getwithdrawminimum
     * @method POST
     * @param {GetWithdrawMinimumBody} data Payload for know minimum amount of withdraw.
     * @return Promise<AxiosResponse<GetWithdrawMinimumResponse>>
     * Obtains minimum amount required to withdraw funds on a given asset.
     */
    public getWithdrawMinimum = (data: GetWithdrawMinimumBody): Promise<AxiosResponse<GetWithdrawMinimumResponse>> => {
        validateGetWithdrawMinimum(data);
        return this.axios.post(UrlHelper.getWithdrawMinimum, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/getwithdrawfee
     * @method POST
     * @param {WithdrawBody} data Payload for withdraw.
     * @return Promise<AxiosResponse<GetWithdrawFeeResponse>>
     * Get estimated withdraw fee, composed of blockchain fee and processing fee.
     */
    public getWithdrawFee = (data: WithdrawBody): Promise<AxiosResponse<GetWithdrawFeeResponse>> => {
        validateWithdraw(data);
        return this.axios.post(UrlHelper.getWithdrawFee, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/withdraw
     * @method POST
     * @param {WithdrawBody} data Payload for withdraw.
     * @return Promise<AxiosResponse<{ success: boolean }>>
     * Withdraw funds from merchant wallet to external wallet. On-chain operation.
     */
    public withdraw = (data: WithdrawBody): Promise<AxiosResponse<{ success: boolean }>> => {
        validateWithdraw(data);
        return this.axios.post(UrlHelper.withdraw, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/createwebhook
     * @method POST
     * @param {WebhookBody} data Payload for new webhook.
     * @return Promise<AxiosResponse<Webhook>>
     * Create a new webhook.
     */
    public createWebhook = (data: WebhookBody): Promise<AxiosResponse<Webhook>> => {
        validateWebhookBody(data);
        return this.axios.post(UrlHelper.createWebhook, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/updatewebhook
     * @method POST
     * @param {number} webhook_id Webhook ID.
     * @param {WebhookBody} data Payload for update webhook.
     * @return Promise<AxiosResponse<Webhook>>
     * Update a webhook.
     */
    public updateWebhook = (webhook_id: number, data: WebhookBody): Promise<AxiosResponse<Webhook>> => {
        validateWebhookBody(data);
        return this.axios.put(`${ UrlHelper.updateWebhook }/${ webhook_id }`, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/activatewebhook
     * @method POST
     * @param {number} webhook_id Webhook ID.
     * @param {StatusWebhookBody} data Payload for activate webhook.
     * @return Promise<AxiosResponse<Webhook>>
     * Activates a webhook.
     */
    public activateWebhook = (webhook_id: number, data: StatusWebhookBody): Promise<AxiosResponse<Webhook>> => {
        validateStatusWebhookBody(data);
        return this.axios.post(`${ UrlHelper.activateWebhook }/${ webhook_id }`, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/deactivatewebhook
     * @method POST
     * @param {number} webhook_id Webhook ID.
     * @param {StatusWebhookBody} data Payload for deactivate webhook.
     * @return Promise<AxiosResponse<Webhook>>
     * Deactivates a webhook.
     */
    public deactivateWebhook = (webhook_id: number, data: StatusWebhookBody): Promise<AxiosResponse<Webhook>> => {
        validateStatusWebhookBody(data);
        return this.axios.post(`${ UrlHelper.deactivateWebhook }/${ webhook_id }`, data);
    };

    /**
     * @link Documentation: https://telepay.readme.io/reference/deletewebhook
     * @method POST
     * @param {number} webhook_id Webhook ID.
     * @return Promise<AxiosResponse<TelePayResponse>>
     * Deletes a webhook.
     */
    public deleteWebhook = (webhook_id: number): Promise<AxiosResponse<TelePayResponse>> => {
        return this.axios.delete(`${ UrlHelper.deleteWebhook }/${ webhook_id }`, {});
    };

    /**
     * @method GET | POST
     * @return Promise<AxiosResponse<Object>>
     * @param {ApiMethod} method
     * @param {ApiEndpoint} endpoint
     * @param {?Object} payload
     * Generic function for perform requests to any endpoint
     */
    public genericRequest = (method: ApiMethod, endpoint: ApiEndpoint, payload?: Object): Promise<AxiosResponse<Object>> => {
        return this.axios.request({
            method,
            url: endpoint,
            data: payload ?? {}
        });
    };

}
