---
description: Get started in a frontend or nodejs environment
---

# 💅 Frontend + NodeJS

**In this tutorial we will**:

* Use `@superfluid-financ/js-sdk` with goerli testnet
* Obtain SuperTokens 
* Check SuperToken balances 

## Installation

The sdk can be used with both `web3.js` and `ethers`

### Ethers

To use `ethers`, we must include a peer dependency for `@ethersproject/contracts` when we install the sdk:

```bash
yarn install @superfluid-finance/js-sdk @ethersproject/contracts
```

Now in our application, we can create the `SuperfluidSDK` object and initialize.

```javascript
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

const sf = new SuperfluidSDK.Framework({
    version: "v1", // Protocol release version
    ethers: new Web3Provider(window.ethereum)
});
await sf.initialize()
```

### Web3.js

To use `web3.js`, we must include a peer dependency for `@truffle/contract` when we install the sdk:

```bash
yarn install @superfluid-finance/js-sdk @truffle/contract
```

Now in our application, we can create the `SuperfluidSDK` object and initialize.

```javascript
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");

const sf = new SuperfluidSDK.Framework({
    version: "v1", // Protocol release version
    web3: new Web3(window.ethereum),
});
await sf.initialize()
```

## Obtain SuperTokens

Head over to [app.superfluid.finance](https://app.superfluid.finance) using MetaMask or your favorite browser wallet. During log-in you will be sent some goerli ETH and test tokens to play with. 

## Up next

Next we'll learn how to stream money in [🔀 Create a Superfluid Flow](../create-a-superfluid-flow.md)





