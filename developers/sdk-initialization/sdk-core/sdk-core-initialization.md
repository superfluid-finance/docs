---
description: How to initialize the SDK Core
---

# 🔥 SDK Core Initialization

## Required Imports

To install the Superfluid SDK Core, you can run&#x20;

You'll need to have a project which already includes `graphql` and `ethers` as dependencies.

From here, you can install the Superfluid SDK Core like so:

```
npm install @superfluid-finance/sdk-core
```

## I**nitializing the SDK Core**

When creating the framework, you'll use `Framework.create()` like so:

```
const sf = await Framework.create({
  chainId: 137, // you can also use chainId here instead
  provider: ethersProvider
});
```

### Framework Options

When creating the framework, you must pass in the following options.  The only required params are the `provider` and a `chainId`

`chainId: number` - the chain Id for the network

`provider: SupportedProvider` - the provider being used

`customSubgraphQueriesEndpoint?: string` - an option to add your own custom subgraph endpoint for writing custom queries

`resolverAddress?: string` - an optional parameter that can be included for getting the framework in a test environment. If you pass in `process.env.RESOLVER_ADDRESS`, this will work successfully as seen [here](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/examples/tradeable-cashflow/tradeable-cashflow-hardhat/test/TradeableCashflow.test.js#L51).

`protocolReleaseVersion?: string` - options here are "v1," "test," or your own release version (which is almost always not necessary unless you're doing experimental work)

## Examples For Various Environments

#### TS/ESModule

```javascript
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
```

#### Infura Provider Initialization

```javascript
// infura provider initialization
const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);
const sf = await Framework.create({
  chainId: 137, //note, you can also use provider.getChainId() to get the active chainId
  provider
});

// web3.js + Hardhat provider initialization
const web3jsProvider = new ethers.providers.Web3Provider(
  (global as any).web3.currentProvider
);
const web3jsSf = await Framework.create({
  chainId: 137, //note, you can also use provider.getChainId() to get the active chainId
  provider: web3jsProvider
});

// injected web3.js initialization (Hardhat) 
// most likely to be used on backend for testing
// NOTE: if you're using truffle, you should be able to
// omit the (global as any) as this should be
// exposed already (in JS at least)
const injectedWeb3jsSf = await Framework.create({
  chainId: 31337,
  provider: (global as any).web3,
  resolverAddress: <RESOLVER_ADDRESS>,
  protocolReleaseVersion: "test",
});

// injected hardhat ethers initialization
// most likely to be used on backend for testing
import hardhat from "hardhat";
const injectedHardhatEthersSf = await Framework.create({
  chainId: 31337,
  provider: hardhat.ethers,
  resolverAddress: <RESOLVER_ADDRESS>,
  protocolReleaseVersion: "test",
})

// ethers.js + hardhat provider initialization (in testing environment w/ hardhat-ethers)
import { ethers } from "hardhat";
const [deployer] = await ethers.getSigners();
const ethersProvider = deployer.provider;
const ethersjsSf = await Framework.create({
  chainId: 31337,
  resolverAddress: <RESOLVER_ADDRESS>,
  protocolReleaseVersion: "test",
  provider: ethersProvider
});

// metamask
const mmProvider = new ethers.providers.Web3Provider(window.ethereum);
const mmSf = await Framework.create({
  chainId: mmProvider.getChainId(),
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
  chainId: 137, //your chainId here
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
                const framework = await Framework.create({ chainId: 137, provider: web3Provider });
            })();
        }
    }
});
// this is triggered by:
await onboard.walletSelect();
```

> Note: You specify your project type in `package.json` - `"type": "module"` or `"type": "commonjs"`.

It is also important to note that the provider does not need to be an InfuraProvider - it just needs to satisfy the `SupportedProvider` interface: `ethers.providers.Provider | (typeof ethers & HardhatEthersHelpers) | Web3`.

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
  chainId: 137, //your chainId here
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
  chainId: 137, //your chainId here
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
  chainId: 137, //your chainId here
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
  chainId: 137, //this is for matic - enter your own chainId here
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
