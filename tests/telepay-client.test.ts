import 'dotenv/config';
import { TelepayClient } from '../src';
import {
    CreateInvoiceBody,
    GetAllBalanceResponse,
    GetWithdrawMinimumBody,
    Invoice,
    TransferBody,
    WalletBalance,
    WithdrawBody
} from '../src/utils/interfaces';
import { AxiosResponse } from 'axios';
import { ApiMethod, UrlHelper } from '../src/utils/enums';

const TEST_SECRET_KEY = <string>process.env['TEST_SECRET_KEY'];
const TEST_TON_WALLET = <string>process.env['TEST_TON_WALLET'];
const TEST_USERNAME = <string>process.env['TEST_USERNAME'];

describe('Testing TelepayClient class constructor', () => {

    it('Success class constructor', () => {
        const client = new TelepayClient(TEST_SECRET_KEY);
        expect(client).toBeInstanceOf(TelepayClient);
    });

    it('Failure class constructor', () => {
        expect(() => {
            const client = new TelepayClient('');
        }).toThrow('[telepay-node] [authorization] must be a valid string.');
    });

});

describe('Testing API Endpoints', () => {

    let client: TelepayClient;
    let walletBalances: WalletBalance[] = [];

    beforeAll(() => {
        client = new TelepayClient(TEST_SECRET_KEY);
    });

    it('Endpoint /getMe', async () => {
        testSuccessResponse(await client.getMe());
    });

    it('Endpoint /getBalance [GET]', async () => {
        walletBalances = (testSuccessResponse(await client.getAllBalances()) as GetAllBalanceResponse).wallets;
    });

    it('Endpoint /getBalance [POST]', async () => {
        if (walletBalances.length > 0)
            testSuccessResponse(await client.getOneBalance(walletBalances[0]));
    });

    it('Endpoint /getAssets', async () => {
        testSuccessResponse(await client.getAssets());
    });

    describe('Testing Invoice Endpoints', () => {
        let invoice: Invoice;

        it('Endpoint /createInvoice', async () => {
            const payload: CreateInvoiceBody = {
                asset: 'TON',
                amount: 100,
                network: 'testnet',
                blockchain: 'TON'
            };

            invoice = testSuccessResponse(await client.createInvoice(payload));
        });

        it('Endpoint /getInvoices', async () => {
            const response = testSuccessResponse(await client.getInvoices());
            expect(response.invoices.length).toBeGreaterThan(1);
        });

        it('Endpoint /getInvoice', async () => {
            const response = testSuccessResponse(await client.getInvoice(invoice.number));

            expect(response).toEqual(invoice);
        });

        it('Endpoint /cancelInvoice', async () => {
            const response = testSuccessResponse(await client.cancelInvoice(invoice.number));

            expect(response.number).toEqual(invoice.number);
        });

        it('Endpoint /deleteInvoice', async () => {
            const response = testSuccessResponse(await client.deleteInvoice(invoice.number));

            expect(response).toEqual({
                error: 'invoice.deleted',
                message: 'Invoice deleted.'
            });
        });

    });

    describe('Testing Withdraw Endpoints', () => {

        it('Endpoint /getWithdrawMinimum', async () => {
            const payload: GetWithdrawMinimumBody = {
                asset: 'TON',
                network: 'testnet',
                blockchain: 'TON'
            };

            testSuccessResponse(await client.getWithdrawMinimum(payload));
        });

        it('Endpoint /getWithdrawFee', async () => {
            const payload: WithdrawBody = {
                amount: 100,
                to_address: TEST_TON_WALLET,
                asset: 'TON',
                network: 'testnet',
                blockchain: 'TON'
            };

            testSuccessResponse(await client.getWithdrawFee(payload));
        });

        it('Endpoint /withdraw', async () => {
            const payload: WithdrawBody = {
                amount: 100,
                to_address: TEST_TON_WALLET,
                asset: 'TON',
                network: 'testnet',
                blockchain: 'TON'
            };

            const error = {
                'error': 'unavailable',
                'message': 'This action is temporarly unavailable.',
            }

            await client.withdraw(payload)
                .catch((err) => {
                    expect(err.response.status).toBe(503);
                    expect(err.response.data).toBeInstanceOf(Object);
                    expect(err.response.data).toEqual(error);
                });
        });

    });

    it('Endpoint /transfer', async () => {
        const payload: TransferBody = {
            amount: 100,
            username: TEST_USERNAME,
            asset: 'TON',
            network: 'testnet',
            blockchain: 'TON'
        };

        const error = {
            error: 'transfer.insufficient-funds',
            message: 'Transfer failed. Insufficient funds.'
        }

        await client.transfer(payload)
            .catch((err) => {
                expect(err.response.status).toBe(500);
                expect(err.response.data).toBeInstanceOf(Object);
                expect(err.response.data).toEqual(error);
            });
    });

    it('Generic function [/getMe]', async () => {
        testSuccessResponse(await client.genericRequest(ApiMethod.GET, '/getMe'));
    });

    it('Generic function [/getWithdrawMinimum]', async () => {
        const payload: GetWithdrawMinimumBody = {
            asset: 'TON',
            network: 'testnet',
            blockchain: 'TON'
        };
        testSuccessResponse(await client.genericRequest(ApiMethod.POST, UrlHelper.getWithdrawMinimum, payload));
    });

});

const testSuccessResponse = (response: AxiosResponse): any => {
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.data).toBeInstanceOf(Object);
    return response.data;
}
