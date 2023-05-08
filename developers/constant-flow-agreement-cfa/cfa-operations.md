---
description: Stream money with the Constant Flow Agreement using the SDK Core
---

# CFA - SDK Core

The `ConstantFlowAgreementV1` helper class provides access to create/update/delete flows. You can access this via the `Framework` class (`sf.cfaV1`) or initialize this as a standalone class.

## Accessing the CFAv1 Contract

**Using SDK Core Framework Object**

```typescript
// refresher on initializing the Framework
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const sf = await Framework.create({
  chainId: 137,
  provider
});

// access the cfaV1 object via the Framework class
// see below for a complete example
const flowInfo = await sf.cfaV1.getFlowInfo(...)
```

**Direct Initialization**

```typescript
import { ConstantFlowAgreementV1 } from "@superfluid-finance/sdk-core";

const config = {
  hostAddress: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7",
  cfaV1Address: "0x6EeE6060f715257b970700bc2656De21dEdF074C",
  idaV1Address: "0xB0aABBA4B2783A72C52956CDEF62d438ecA2d7a1"
};

const cfaV1 = new ConstantFlowAgreementV1({ options: config });
//super tokens can be loaded directly as well 
const daix = await sf.loadSuperToken("DAIx");
```

## **Methods**

### **Read Methods**

[`getFlow`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations/read-methods/getflow): Get data on a stream between two accounts

[`getNetFlow`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations/read-methods/getnetflow): Get the net flow rate of an account for a certain Super Token

[`getAccountFlowInfo`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations/read-methods/getaccountflowinfo): Get summed flow data of an account for a certain Super Token

### **Write Methods**

#### **Create, Update, Delete**

[`createFlow`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations/write-methods/createflow): Starts a stream from a sender to a chosen receiver&#x20;

[`updateFlow`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations/write-methods/updateflow): Updates an existing stream from a sender to a chosen receiver

[`deleteFlow`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations/write-methods/deleteflow): Cancels an existing stream from a sender to a chosen receiver

#### **Create, Update, Delete with ACL Permissions**

[`createFlowByOperator`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl/acl-features): Starts a stream between two accounts using ACL permissions

[`updateFlowByOperator`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl/acl-features): Updates a stream between two accounts using ACL permissions&#x20;

[`deleteFlowByOperator`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl/acl-features): Deletes a stream between two accounts using ACL permissions

#### **Manage ACL Permissions**

[`updateFlowOperatorPermissions`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl/acl-features): Lets a sender set the ACL permissions of another account

[`revokeFlowOperatorPermissions`](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl/acl-features): Revokes all ACL permissions that an account has over the sender's account

## **Example Usage**

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

const daix = await sf.loadSuperToken("DAIx");

// Read example
const flowInfo = await daix.getFlow({
  sender: "0x...",
  receiver: "0x...",
  providerOrSigner: provider
});
console.log("flowInfo", flowInfo);

// Write operation example
const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });
const createFlowOperation = daix.createFlow({
  sender: "0x...",
  receiver: "0x...",
  flowRate: "1000000000"
});
const txnResponse = await createFlowOperation.exec(signer);
const txnReceipt = await txnResponse.wait();
// Transaction Complete when code reaches here
```
