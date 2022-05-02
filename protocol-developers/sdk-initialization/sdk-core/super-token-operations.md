---
description: >-
  Perform basic transfers, approvals, token wrapping & unwrapping using the SDK
  Core
---

# 🪙 Super Token Operations

The `SuperToken` class can also be accessed via the `Framework` class and allows you read from/write to the blockchain. It also provides write functions for both the CFAV1 and IDAV1 contracts in the context of the token. That is, the token field for these different methods will be the token address specified during the creation of this class.

**Framework based initialization**

```
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

const usdcx = await sf.loadSuperToken("0xCAa7349CEA390F89641fe306D93591f87595dc1F");
```

**Direct Initialization**

```
import { SuperToken } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);

const config = {
  hostAddress: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7",
  cfaV1Address: "0x6EeE6060f715257b970700bc2656De21dEdF074C",
  idaV1Address: "0xB0aABBA4B2783A72C52956CDEF62d438ecA2d7a1"
};

const usdcx = await SuperToken.create({
  address: "0xCAa7349CEA390F89641fe306D93591f87595dc1F",
  config,
  networkName: "matic", // you can also pass in chainId instead (e.g. chainId: 137)
  provider
});
```

**SuperToken Functions**

```
const usdcx = await sf.loadSuperToken("0xCAa7349CEA390F89641fe306D93591f87595dc1F");

// ERC20 `Token`
// Read functions
await usdcx.balanceOf({
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await usdcx.allowance({
  owner: string,
  spender: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await usdcx.name({
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await usdcx.symbol({
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await usdcx.totalSupply({
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});


// Write operations
usdcx.approve({
  receiver: string,
  amount: string
});

usdcx.transfer({
  receiver: string,
  amount: string
});

usdcx.transferFrom({
  sender: string,
  receiver: string,
  amount: string
});

// `SuperToken` only function
await usdcx.realtimeBalanceOf({
  account: string,
  timestamp: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

// Write Functions

// All write functions return Promise<Operation>

// SuperToken Write operations
usdcx.downgrade({ amount: string });

usdcx.upgrade({ amount: string });

// SuperToken CFAV1/IDAV1 Functions are the same as the
// ConstantFlowAgreementV1/InstantDistributionAgreementV1 class functions
// except instead of the sf.cfaV1/idaV1.function() signature, it is token.function()
// e.g. await usdcx.createIndex({ indexId: "0", userData: "0x" }).exec(signer);
// and you don't need to pass in a token as a parameter as it uses the token address
// of the instantiated class.
```

**Example Usage**

```
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

const usdcx = await sf.loadSuperToken("0xCAa7349CEA390F89641fe306D93591f87595dc1F");

// Read example
const name = await usdcx.name();
console.log(name);

// Write operation example
const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });
const transferOperation = usdcx.transfer({ receiver: "0x...", amount: "1000000" });
const txnResponse = await transferOperation.exec(signer);
const txnReceipt = await txnResponse.wait();
// Transaction Complete when code reaches here
```

> Note: you can also get the underlying Token object which only has ERC20 token read/write methods-this is useful for things like approving token spend to a SuperToken contract prior to upgrading for example.

```
const usdc = usdcx.underlyingToken;
const totalSupply = await usdc.totalSupply();
```
