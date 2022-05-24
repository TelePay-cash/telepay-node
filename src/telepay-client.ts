import { ApiEndpoint, ApiMethod, UrlHelper } from './utils/enums';
import axios, { Axios, AxiosResponse } from 'axios';
import {
    CreateInvoiceBody,
    CreateInvoiceResponse,
    GetAssetsResponse,
    GetBalanceResponse,
    GetInvoicesResponse,
    GetMeResponse,
    GetWithdrawFeeResponse,
    GetWithdrawMinimumBody,
    GetWithdrawMinimumResponse,
    Invoice,
    TransferBody,
    WithdrawBody
} from './utils/interfaces';
import {
    BASE_URL,
    validateAuthorization,
    validateCreateInvoice,
    validateGetWithdrawMinimum,
    validateInvoiceNumber,
    validateTransfer,
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
            transformResponse: data => {
                if (typeof data === 'string') return JSON.parse(data); else return data;
            }
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
     * @return Promise<AxiosResponse<GetBalanceResponse>>
     * Get your merchant wallet assets with corresponding balance.
     */
    public getBalance = (): Promise<AxiosResponse<GetBalanceResponse>> => this.axios.get(UrlHelper.getBalance);

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
     * @return Promise<AxiosResponse<GetInvoicesResponse>>
     * Get invoice details, by ID.
     */
    public getInvoices = (): Promise<AxiosResponse<GetInvoicesResponse>> => this.axios.get(UrlHelper.getInvoices);

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
    }

    /**
     * @link Documentation: https://telepay.readme.io/reference/createinvoice
     * @method POST
     * @param {CreateInvoiceBody} data Payload of new invoice.
     * @return Promise<AxiosResponse<CreateInvoiceResponse>>
     * Creates an invoice, associated to your merchant.
     */
    public createInvoice = (data: CreateInvoiceBody): Promise<AxiosResponse<CreateInvoiceResponse>> => {
        validateCreateInvoice(data);
        return this.axios.post(UrlHelper.createInvoice, data);
    }

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
    }

    /**
     * @link Documentation: https://telepay.readme.io/reference/deleteinvoice
     * @method POST
     * @param {string} invoiceNumber ID of invoice.
     * @return Promise<AxiosResponse<{ status: string }>>
     * Delete invoice, by its number.
     */
    public deleteInvoice = (invoiceNumber: string): Promise<AxiosResponse<{ status: string }>> => {
        validateInvoiceNumber(invoiceNumber);
        return this.axios.post(`${ UrlHelper.deleteInvoice }/${ invoiceNumber }`);
    }

    /**
     * @link Documentation: https://telepay.readme.io/reference/transfer
     * @method POST
     * @param {TransferBody} data Payload for transfer.
     * @return Promise<AxiosResponse<{ success: boolean }>>
     * Transfer funds between internal wallets. Off-chain operation.
     */
    public transfer = (data: TransferBody): Promise<AxiosResponse<{ success: boolean }>> => {
        validateTransfer(data);
        return this.axios.post(UrlHelper.transfer, data);
    }

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
    }

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
    }

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
    }

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
        })
    }

}
