---
description: Stream money with the Constant Flow Agreement using the SDK Core
---

# SDK Core

The `ConstantFlowAgreementV1` class provides access to the `ConstantFlowAgreementV1` smart contract, allowing you to create/update/delete flows, update ACL permissions for an operator and modify flows on behalf of another account as an operator. You can access this class via the `Framework` class (`sf.cfaV1`) or initialize this as a standalone class.

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

// access the cfaV1 object and get a flow via the created Framework class
const flowInfo = await sf.cfaV1.getFlow({
  superToken: "0x...",
  sender: "0x...",
  receiver: "0x...",
  providerOrSigner: "0x..."
});
```

**Direct Initialization**

```typescript
import { ConstantFlowAgreementV1 } from "@superfluid-finance/sdk-core";

const hostAddress = "0x3E14dC1b13c488a8d5D310918780c983bD5982E7";
const cfaV1Address = "0x6EeE6060f715257b970700bc2656De21dEdF074C";
const cfaV1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";

const cfaV1 = new ConstantFlowAgreementV1(hostAddress, cfaV1Address, cfaV1ForwarderAddress);
// get a flow via the standalone ConstantFlowAgreementV1 class
const flowInfo = await cfaV1.getFlow({
  superToken: "0x...",
  sender: "0x...",
  receiver: "0x...",
  providerOrSigner: "0x..."
});
```

## **Methods**

### **Read Methods**

[`getFlow`](cfa-operations/read-methods/getflow.md): Get data on a stream between two accounts

[`getNetFlow`](cfa-operations/read-methods/getnetflow.md): Get the net flow rate of an account for a certain Super Token

[`getAccountFlowInfo`](cfa-operations/read-methods/getaccountflowinfo.md): Get summed flow data of an account for a certain Super Token

### **Write Methods**

#### **Create, Update, Delete**

[`createFlow`](cfa-operations/write-methods/createflow.md): Starts a stream from a sender to a chosen receiver&#x20;

[`updateFlow`](cfa-operations/write-methods/updateflow.md): Updates an existing stream from a sender to a chosen receiver

[`deleteFlow`](cfa-operations/write-methods/deleteflow.md): Cancels an existing stream from a sender to a chosen receiver

#### **Create, Update, Delete with ACL Permissions**

[`createFlowByOperator`](cfa-access-control-list-acl/sdk-core/createflowbyoperator.md): Starts a stream between two accounts using ACL permissions

[`updateFlowByOperator`](cfa-access-control-list-acl/sdk-core/updateflowbyoperator.md): Updates a stream between two accounts using ACL permissions&#x20;

[`deleteFlowByOperator`](cfa-access-control-list-acl/sdk-core/deleteflowbyoperator.md): Deletes a stream between two accounts using ACL permissions

#### **Manage ACL Permissions**

[`updateFlowOperatorPermissions`](cfa-access-control-list-acl/sdk-core/updateflowoperatorpermissions.md): Lets a sender set the ACL permissions of another account

[`revokeFlowOperatorPermissions`](cfa-access-control-list-acl/sdk-core/revokeflowoperatorpermissions.md): Revokes all ACL permissions that an account has over the sender's account

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
