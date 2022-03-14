---
description: Interact with Superfluid using Javascript/Typescript
---

# 🧨 SDKs Overview

The **SDK-Core** is an application framework for interacting with the Superfluid Protocol without Solidity knowledge. You can find it in the NPM library [here](https://www.npmjs.com/package/@superfluid-finance/sdk-core), and check out the complete README[ here](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/sdk-core/README.md). If you're interested in building high performance, production grade front end products on top of Superfluid, you should also consider using the **SDK Redux**, which serves as a wrapper around the SDK Core for applications which make use of Redux. You can find the SDK Redux on NPM [here](https://www.npmjs.com/package/@superfluid-finance/sdk-redux), and the complete README [here](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/sdk-redux).&#x20;

> NOTE: More documentation on the SDK Redux is coming soon.

You can find reference docs for both of our SDKs at the following two links:

* [SDK Core Reference Docs](https://refs.superfluid.finance/sdk-core)
* [SDK Redux Reference Docs](https://refs.superfluid.finance/sdk-redux/)

The Superfluid SDK-Core is a wrapper library around `@superfluid-finance/ethereum-contracts` which allows web developers to interact with the Superfluid contracts. Under the hood, SDK-Core leverages TypeScript, ethers.js and The Graph and GraphQL.

In this section, we will provide examples for initializing the framework, creating signers, and performing operations. You'll see all of this in action in our next 4 sections on Money Streaming, Instant Distribution, Using Super Tokens, and Batching Transactions.&#x20;

## Framework Initialization

**Here is a quick look at initializing the SDK in different environments:**

TypeScript / JavaScript (Module) vs. JavaScript (CommonJS) - usually a Node.js environment

The primary difference between the two environments is the import/require of the sdk-core package, everything else is the same.

#### TS/ESModule

```javascript
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
```

#### Infura Provider Initialization&#x20;

```javascript
// infura provider initialization
const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);
const sf = await Framework.create({
  networkName: "matic",
  provider
});

// web3.js + Hardhat provider initialization
const web3jsProvider = new ethers.providers.Web3Provider(
  (global as any).web3.currentProvider
);
const web3jsSf = await Framework.create({
  networkName: "matic",
  provider: web3jsProvider
});

// injected web3.js initialization (Hardhat) 
// most likely to be used on backend for testing
// NOTE: if you're using truffle, you should be able to
// omit the (global as any) as this should be
// exposed already (in JS at least)
const injectedWeb3jsSf = await Framework.create({
  networkName: "custom",
  provider: (global as any).web3,
  dataMode: "WEB3_ONLY",
  resolverAddress: <RESOLVER_ADDRESS>,
  protocolReleaseVersion: "test",
});

// injected hardhat ethers initialization
// most likely to be used on backend for testing
import hardhat from "hardhat";
const injectedHardhatEthersSf = await Framework.create({
  networkName: "custom",
  provider: hardhat.ethers,
  dataMode: "WEB3_ONLY",
  resolverAddress: <RESOLVER_ADDRESS>,
  protocolReleaseVersion: "test",
})

// ethers.js + hardhat provider initialization (in testing environment w/ hardhat-ethers)
import { ethers } from "hardhat";
const [deployer] = await ethers.getSigners();
const ethersProvider = deployer.provider;
const ethersjsSf = await Framework.create({
  networkName: "custom",
  dataMode: "WEB3_ONLY",
  resolverAddress: <RESOLVER_ADDRESS>,
  protocolReleaseVersion: "test",
  provider: ethersProvider
});

// metamask
const mmProvider = new ethers.providers.Web3Provider(window.ethereum);
const mmSf = await Framework.create({
  networkName: "matic",
  provider: mmProvider
});

// web3modal
import Web3Modal from "web3modal";
const web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions: {}
});
const web3ModalRawProvider = await web3Modal.connect();
const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalRawProvider);
const web3ModalSf = await Framework.create({
  networkName: "matic",
  provider: web3ModalProvider
});

//bnc-onboard
const onboard = Onboard({
    dappId: "<API_KEY>",
    networkId: 4,
    subscriptions: {
        wallet: wallet => {
            const web3Provider = new ethers.providers.Web3Provider(wallet.provider);
            (async () => {
                const framework = await Framework.create({ networkName: "matic", provider: web3Provider });
            })();
        }
    }
});
// this is triggered by:
await onboard.walletSelect();
```

> Note: You specify your project type in `package.json` - `"type": "module"` or `"type": "commonjs"`.

The absolute minimum you need to provide the constructor is `chainId` or `networkName` and a `provider` object if all you want to do are read operations. It is also important to note that the provider does not need to be an InfuraProvider - it just needs to satisfy the `SupportedProvider` interface: `ethers.providers.Provider | (typeof ethers & HardhatEthersHelpers) | Web3`.

## Creating a Signer

### **Web3Provider Signer Example**

Below is an example of using the `Web3Provider` object to create a signer. This will likely be the way that most client-side applications create a signer.

```javascript
import { Framework } from "@superfluid-finance/sdk-core";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";

// web3Modal example
const web3ModalRawProvider = await web3Modal.connect();
const web3ModalProvider = new Web3Provider(web3ModalRawProvider, "any");

const sf = await Framework.create({
  networkName: "matic",
  provider: web3ModalProvider,
});

const web3ModalSigner = sf.createSigner({ web3Provider: web3ModalProvider });

// MetaMask example
const metamaskProvider = new Web3Provider(window.ethereum);
const metaMaskSigner = sf.createSigner({ web3Provider: metamaskProvider });
```

### Hardhat Signer Example

Below is an example of creating a signer in a `Hardhat` + `ethers.js` environment. This will likely be the way that the `sdk-core` is used in a testing environment.

```javascript
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "hardhat";

const sf = await Framework.create({
  networkName: "matic",
  provider: ethers.provider,
});

const signer = sf.createSigner({
  privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>",
  provider: ethers.provider,
});
```

### Signer/Wallet Example

Below is an example of creating a signer passing in a signer object (this can be a wallet for example). This will likely be the way that the `sdk-core` is used in a Node.js environment (back-end) or a testing environment.

```javascript
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);

const wallet = new ethers.Wallet(
  "cf2bea4c6aad8dbc387d5dd68bf408999b0b1ee949e04ff1d96dd60bc3553a49",
  provider
);

const sf = await Framework.create({
  networkName: "matic",
  provider,
});

const signer = sf.createSigner({ signer: wallet });
```

## Operations

The `Operation` class is an object that is returned after you execute a contract call from this package - instead of immediately executing, we return the `Operation` class which can be either executed to broadcast the transaction or used to create and execute a `BatchCall`. We'll make use of this class in our next sections.

```javascript
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);

const sf = await Framework.create({
  networkName: "matic",
  provider
});

// create a signer
const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });

// load the usdcx SuperToken via the Framework
const usdcx = sf.loadSuperToken("0xCAa7349CEA390F89641fe306D93591f87595dc1F");

// create an approve operation
const approveOperation = usdcx.approve({ receiver: "0xab...", amount: ethers.utils.parseUnits("100").toString() });

// execute the approve operation, passing in a signer
const txn = await approveOperation.exec(signer);

// wait for the transaction to be confirmed
const receipt = await txn.wait();

// or you can create and execute the transaction in a single line
const approveTxn = await usdcx.approve({ receiver: "0xab...", amount: ethers.utils.parseUnits("100").toString() }).exec(signer);
const approveTxnReceipt = await approveTxn.wait();
```
