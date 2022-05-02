---
description: >-
  Send one to many transactions with the Instant Distribution Agreement using
  the SDK Core
---

# 🏟 IDA Operations

The `InstantDistributionAgreementV1` helper class provides access to a variety of IDA functions. You can access this via the `Framework` class (`sf.idaV1`) or initialize this as a standalone class.

**Direct Initialization**

```
import { InstantDistributionAgreementV1 } from "@superfluid-finance/sdk-core";

const config = {
  hostAddress: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7",
  cfaV1Address: "0x6EeE6060f715257b970700bc2656De21dEdF074C",
  idaV1Address: "0xB0aABBA4B2783A72C52956CDEF62d438ecA2d7a1"
};

const idaV1 = new InstantDistributionAgreementV1({ options: config });
```

**IDAV1 Functions**

```
// Read functions
await sf.idaV1.getSubscription({
  superToken: string,
  publisher: string,
  indexId: string,
  subscriber: string,
  providerOrSigner: string
});

await sf.idaV1.getIndex({
  superToken: string,
  publisher: string,
  indexId: string,
  providerOrSigner: string
});


// Write operations
sf.idaV1.createIndex({
  indexId: string,
  superToken: string,
  userData?: string
});

sf.idaV1.distribute({
  indexId: string,
  superToken: string,
  amount: string,
  userData?: string
});

sf.idaV1.updateIndexValue({
  indexId: string,
  superToken: string,
  indexValue: string,
  userData?: string
});

sf.idaV1.updateSubscriptionUnits({
  indexId: string,
  superToken: string,
  subscriber: string,
  units: string,
  userData?: string
});

sf.idaV1.approveSubscription({
  indexId: string,
  superToken: string,
  publisher: string,
  userData?: string
});

sf.idaV1.revokeSubscription({
  indexId: string,
  superToken: string,
  publisher: string,
  userData?: string
});

sf.idaV1.deleteSubscription({
  indexId: string,
  superToken: string,
  subscriber: string,
  publisher: string,
  userData?: string
});

sf.idaV1.claim({
  indexId: string,
  superToken: string,
  subscriber: string,
  publisher: string,
  userData?: string
});
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
const subscription = await sf.idaV1.getSubscription({ superToken: "0x...", publisher: "0x...", indexId: "1", subscriber: "0x...", providerOrSigner: provider });
console.log(subscription);


// Write operation example
const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });
const createIndexOperation = sf.idaV1.createIndex({ indexId: "0", userData: "0x" });
const txnResponse = await createIndexOperation.exec(signer);
const txnReceipt = await txnResponse.wait();
// Transaction Complete when code reaches here
```
