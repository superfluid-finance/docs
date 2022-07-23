---
description: Stream money with the Constant Flow Agreement using the SDK Core
---

# 🌊 CFA Operations

The `ConstantFlowAgreementV1` helper class provides access to create/update/delete flows. You can access this via the `Framework` class (`sf.cfaV1`) or initialize this as a standalone class.

**Direct Initialization**

```
import { ConstantFlowAgreementV1 } from "@superfluid-finance/sdk-core";

const config = {
  hostAddress: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7",
  cfaV1Address: "0x6EeE6060f715257b970700bc2656De21dEdF074C",
  idaV1Address: "0xB0aABBA4B2783A72C52956CDEF62d438ecA2d7a1"
};

const cfaV1 = new ConstantFlowAgreementV1({ options: config });
```

**CFAV1 Functions**

```
// Read functions
await sf.cfaV1.getFlow({
  superToken: string,
  sender: string,
  receiver: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await sf.cfaV1.getAccountFlowInfo({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await sf.cfaV1.getNetFlow({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});


// Write operations
sf.cfaV1.createFlow({
  sender: string,
  receiver: string,
  superToken: string,
  flowRate: string,
  userData?: string
});

sf.cfaV1.updateFlow({
  sender: string,
  receiver: string,
  superToken: string,
  flowRate: string,
  userData?: string
});

sf.cfaV1.deleteFlow({
  sender: string,
  receiver: string,
  superToken: string,
  userData?: string
});

//ACL Usage

sf.cfaV1.updateFlowOperatorPermissions({
  flowOperator: string,
  permissions: number, // should enter 1-7
  flowRateAllowance: string,
  superToken: string
});

sf.cfaV1.revokeFlowOperatorPermissions({
  flowOperator: string,
  superToken: string
})

sf.cfav1.createFlowByOperator({
  sender: string,
  receiver: string,
  superToken: string,
  userData?: string
});

sf.cfaV1.updateFlowByOperator({
  sender: string,
  receiver: string,
  superToken: string,
  userData?: string
});

sf.cfaV1.deleteFlowByOperator({
  sender: string,
  receiver: string,
  superToken: string,
  userData?: string
})
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

// Read example
const flowInfo = await sf.cfaV1.getFlow({
  superToken: "0x...",
  sender: "0x...",
  receiver: "0x...",
  providerOrSigner: provider
});
console.log("flowInfo", flowInfo);

// Write operation example
const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });
const createFlowOperation = sf.cfaV1.createFlow({
  sender: "0x...",
  receiver: "0x...",
  superToken: "0x...",
  flowRate: "1000000000"
});
const txnResponse = await createFlowOperation.exec(signer);
const txnReceipt = await txnResponse.wait();
// Transaction Complete when code reaches here
```
