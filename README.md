# telepay-node

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/TelePay-cash/telepay-node/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/TelePay-cash/telepay-node/actions/workflows/main.yml)
[![GitHub issues](https://img.shields.io/github/issues/TelePay-cash/telepay-node)](https://github.com/TelePay-cash/telepay-node/issues)
[![GitHub forks](https://img.shields.io/github/forks/TelePay-cash/telepay-node)](https://github.com/TelePay-cash/telepay-node/network)
[![GitHub stars](https://img.shields.io/github/stars/TelePay-cash/telepay-node)](https://github.com/TelePay-cash/telepay-node/stargazers)
[![npm](https://img.shields.io/npm/v/telepay-node.svg)](https://www.npmjs.com/package/telepay-node)

**Integration to TelePay API with Node.js.**

## Installation

Install the package using npm:

```bash
npm install telepay-node
```

Install the package using yarn:

```bash
yarn add telepay-node
```

## Using the library

**Import and construct a client**

```typescript
import { TelepayClient } from 'telepay-node';

const telepayClient: TelepayClient = new TelepayClient(process.env['TELEPAY_SECRET_KEY']);
```

## Telepay API Endpoints

The API endpoints are documented in the [TelePay documentation](https://telepay.readme.io/reference/endpoints).

**/getMe**

Info about the current merchant. [⤴️](https://telepay.readme.io/reference/getme)

```typescript
const response = await telepayClient.getMe();

// or

telepayClient.getMe()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getBalance**

Get your merchant wallet assets with corresponding balance. [⤴️](https://telepay.readme.io/reference/getbalance)

```typescript
const response = await telepayClient.getBalance();

// or

telepayClient.getBalance()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getAssets**

Get assets supported by TelePay. [⤴️](https://telepay.readme.io/reference/getassets)

```typescript
const response = await telepayClient.getAssets();

// or

telepayClient.getAssets()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getInvoices**

Get your merchant invoices. [⤴️](https://telepay.readme.io/reference/getinvoices)

```typescript
const response = await telepayClient.getInvoices();

// or

telepayClient.getInvoices()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getInvoice**

Get invoice details, by ID. [⤴️](https://telepay.readme.io/reference/getinvoice)

```typescript
const response = await telepayClient.getInvoice(invoiceNumber);

// or

telepayClient.getInvoice(invoiceNumber)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/createInvoice**

Creates an invoice, associated to your merchant. [⤴️](https://telepay.readme.io/reference/createinvoice)

```typescript
const data: CreateInvoiceBody = {
    asset: 'TON',
    amount: 100,
    network: 'testnet',
    blockchain: 'TON'
};

const response = await telepayClient.createInvoice(data);

// or

telepayClient.createInvoice(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/cancelInvoice**

Cancel invoice, by its number. [⤴️](https://telepay.readme.io/reference/cancelinvoice)

```typescript
const invoiceNumber: string = 'TEST1234';

const response = await telepayClient.cancelInvoice(invoiceNumber);

// or

telepayClient.cancelInvoice(invoiceNumber)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/deleteInvoice**

Delete invoice, by its number. [⤴️](https://telepay.readme.io/reference/deleteinvoice)

```typescript
const invoiceNumber: string = 'TEST1234';

const response = await telepayClient.deleteInvoice(invoiceNumber);

// or

telepayClient.deleteInvoice(invoiceNumber)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/transfer**

Transfer funds between internal wallets. Off-chain operation. [⤴️](https://telepay.readme.io/reference/transfer)

```typescript
const data: TransferBody = {
    amount: 10,
    username: 'TEST_USERNAME',
    asset: 'TON',
    network: 'testnet',
    blockchain: 'TON'
};

const response = await telepayClient.transfer(data);

// or

telepayClient.transfer(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getWithdrawMinimum**

Obtains minimum amount required to withdraw funds on a given
asset. [⤴️](https://telepay.readme.io/reference/getwithdrawminimum)

```typescript
const data: GetWithdrawMinimumBody = {
    asset: 'TON',
    network: 'testnet',
    blockchain: 'TON'
};

const response = await telepayClient.getWithdrawMinimum(data);

// or

telepayClient.getWithdrawMinimum(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getWithdrawFee**

Get estimated withdraw fee, composed of blockchain fee and processing
fee. [⤴️](https://telepay.readme.io/reference/getwithdrawfee)

```typescript
const data: WithdrawBody = {
    amount: 10,
    to_address: 'TEST_TON_WALLET',
    asset: 'TON',
    network: 'testnet',
    blockchain: 'TON'
};

const response = await telepayClient.getWithdrawFee(data);

// or

telepayClient.getWithdrawFee(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/withdraw**

Withdraw funds from merchant wallet to external wallet. On-chain
operation. [⤴️](https://telepay.readme.io/reference/withdraw)

```typescript
const data: WithdrawBody = {
    amount: 10,
    to_address: 'TEST_TON_WALLET',
    asset: 'TON',
    network: 'testnet',
    blockchain: 'TON'
};

const response = await telepayClient.withdraw(data);

// or

telepayClient.withdraw(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**Extra feature**

Generic function for perform requests to any endpoint

```typescript
const method: ApiMeth = 'GET';
const endpoint: ApiEndpoint = '/getMe';

const response = await telepayClient.genericRequest(method, endpoint);

// or

telepayClient.genericRequest(method, endpoint)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=flat-squeare&logo=telegram&logoColor=white)](https://t.me/TelePayCash)
