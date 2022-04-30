import { TelepayClient } from '../src';
import {
    CreateInvoiceBody,
    GetWithdrawMinimumBody,
    Invoice,
    TransferBody,
    WithdrawBody
} from '../src/utils/interfaces';
import { AxiosResponse } from 'axios';

const TEST_SECRET_KEY = 'secret_RW182YA8LFH5T5IHIK15LTD6G9KM2CVMOU0H1YM6G21XZQ7HXEDPIBBBBIQ1Z4EQ6ME73F12NA3IGM9PDS0TJOU5E5AG8825W5U3';
const TEST_TON_WALLET = 'UQBDIIYmDSgWO8UqhyYiU8qV0Lkmchhor3BwLVB6TX_3Vmsr';
const TEST_USERNAME = 'darkmatter';

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

    beforeAll(() => {
        client = new TelepayClient(TEST_SECRET_KEY);
    });

    it('Endpoint /getMe', async () => {
        testSuccessResponse(await client.getMe());
    });

    it('Endpoint /getBalance', async () => {
        testSuccessResponse(await client.getBalance());
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

            expect(response).toEqual({ 'status': 'deleted' });
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
                'error': 'insufficient-funds',
                'message': 'Insufficient funds to withdraw'
            }

            await client.withdraw(payload)
                .catch((err) => {
                    expect(err.response.status).toBe(401);
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
            'error': 'insufficient-funds',
            'message': 'Insufficient funds to transfer'
        }

        await client.transfer(payload)
            .catch((err) => {
                expect(err.response.status).toBe(401);
                expect(err.response.data).toBeInstanceOf(Object);
                expect(err.response.data).toEqual(error);
            });
    });

});

const testSuccessResponse = (response: AxiosResponse): any => {
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.data).toBeInstanceOf(Object);
    return response.data;
}
