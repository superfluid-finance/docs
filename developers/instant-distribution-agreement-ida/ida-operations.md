---
description: >-
  Send one to many transactions with the Instant Distribution Agreement using
  the SDK Core
---

# IDA - SDK Core

The `InstantDistributionAgreementV1` helper class provides access to a variety of IDA functions. You can access this via the `Framework` class (`sf.idaV1`) or initialize this as a standalone class.

#### Using the `Framework` Class

```typescript
// Some code
import { Framework } from "@superfluid-finance/sdk-core"
import { ethers } from "ethers";

const sf = await Framework.create({
  chainId: 137,
  provider
});

//access the idaV1 object via the Framework class
//see below for a complete example
const flowInfo = await sf.idaV1.getSubscription(...)

```

#### Direct Initialization

```typescript
import { InstantDistributionAgreementV1 } from "@superfluid-finance/sdk-core";

const config = {
  hostAddress: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7",
  cfaV1Address: "0x6EeE6060f715257b970700bc2656De21dEdF074C",
  idaV1Address: "0xB0aABBA4B2783A72C52956CDEF62d438ecA2d7a1"
};

//load a super token - this can be done by symbol or address
const daix = await sf.loadSuperToken("DAIx");
const idaV1 = new InstantDistributionAgreementV1({ options: config });
```

**IDAV1 Functions**

```typescript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

// Read functions
await daix.getSubscription({
  publisher: string,
  indexId: string,
  subscriber: string,
  providerOrSigner: string
});

await daix.getIndex({
  publisher: string,
  indexId: string,
  providerOrSigner: string
});


// Write operations
daix.createIndex({
  indexId: string,
  userData?: string
});

daix.distribute({
  indexId: string,
  amount: string,
  userData?: string
});

daix.updateIndexValue({
  indexId: string,
  indexValue: string,
  userData?: string
});

daix.updateSubscriptionUnits({
  indexId: string,
  subscriber: string,
  units: string,
  userData?: string
});

daix.approveSubscription({
  indexId: string,
  publisher: string,
  userData?: string
});

daix.revokeSubscription({
  indexId: string,
  publisher: string,
  userData?: string
});

daix.deleteSubscription({
  indexId: string,
  subscriber: string,
  publisher: string,
  userData?: string
});

daix.claim({
  indexId: string,
  subscriber: string,
  publisher: string,
  userData?: string
});
```

**Example Usage**

```typescript
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);

const sf = await Framework.create({
  chainId: 137,
  provider
});

//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

// Read example
const subscription = await daix.getSubscription({ publisher: "0x...", indexId: "1", subscriber: "0x...", providerOrSigner: provider });
console.log(subscription);


// Write operation example
const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });
const createIndexOperation = daix.createIndex({ indexId: "0", userData: "0x" });
const txnResponse = await createIndexOperation.exec(signer);
const txnReceipt = await txnResponse.wait();
// Transaction Complete when code reaches here
```
