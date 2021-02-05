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
    web3: new Web3(window.ethereum),
});
await sf.initialize()
```

## Obtain SuperTokens

Head over to [app.superfluid.finance](https://app.superfluid.finance) using MetaMask or your favorite browser wallet. During log-in you will be sent some goerli ETH and test tokens to play with. 

You can upgrade these test tokens to SuperTokens in the **Currencies** tab by clicking the "+" **Upgrade** button.

![](../../.gitbook/assets/image%20%284%29.png)

## Example usage

Here are some quick code snippets to get you started. If you want to see more, head over to our [Superfluid repo examples](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples).

### Constant Flow Agreement

For a more thorough explanation, see [🔀 Create a Superfluid Flow](../create-a-superfluid-flow.md)

```javascript
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import { Web3Provider } from '@ethersproject/providers';

const testFlow = async () => {
    const walletAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
      tokens: ['fDAI']
    });
    await sf.initialize();
    const carol = sf.user({
      address: walletAddress[0],
      token: '0x8ae68021f6170e5a766be613cea0d75236ecca9a'
    });
  
    await carol.flow({
      recipient: '0xA8f3447922d786045CB582B0C825723B744a54df',
      flowRate: 385802469135802
    });
    
    const details = await carol.details();
    console.log(details);
  };

testFlow();
```

### Instant Distribution Agreement

For a more thorough explanation see [💰 Perform an Instant Distribution](../perform-an-instant-distribution.md)

```javascript
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';

const testPool = async () => {
    const walletAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
      tokens: ['fDAI']
    });
    await sf.initialize();
    const carol = sf.user({
      address: walletAddress[0],
      token: '0x8ae68021f6170e5a766be613cea0d75236ecca9a'
    });
    await carol.createPool({ poolId: 1 });
    await carol.giveShares({
      poolId: 1,
      shares: 100,
      recipient: '0xA8f3447922d786045CB582B0C825723B744a54df'
    });
    await carol.distributeToPool({
      poolId: 1,
      amount: BigNumber.from(100).toString()
    });
  };
  
testPool();
```

## Up next

Next we'll learn how to stream money in [🔀 Create a Superfluid Flow](../create-a-superfluid-flow.md)





