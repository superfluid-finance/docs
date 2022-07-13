---
description: >-
  With Superfluid, you can batch many, many operations into a single
  transaction. Here's how you do it with the SDK Core
---

# 🤌 Batch Calls

The `BatchCall` class allows the user to batch multiple supported operations/transactions in one operation. Similar to the other helper classes, we can create this either through the `Framework` or directly initialize this.

**Supported Operations**

Not all operations are supported by the batch call feature, below is a list of the supported operations:

* `ERC20_APPROVE (SuperToken only)`
* `ERC20_TRANSFER_FROM`
* `SUPERTOKEN_UPGRADE`
* `SUPERTOKEN_DOWNGRADE`
* `SUPERFLUID_CALL_AGREEMENT`
* `CALL_APP_ACTION`

Most of the token methods are self explanatory, but some additional context for the last two operations is helpful. `SUPERFLUID_CALL_AGREEMENT` refers to all operations related to the CFA or IDA (`createFlow`, `updateIndex`, `distribute`, etc.). `CALL_APP_ACTION` refers to an operation which is created from calling a function that exists on a super app you have created. Refer to Usage below to see how you can create a `CALL_APP_ACTION` operation.

**Framework based initialization**

```
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);

const sf = await Framework.create({
  chainId: 137, //chain Id for matic - change depending on current network
  provider
});

const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });
const batchCall = sf.batchCall([<OPERATION_A>, <OPERATION_B>, ...]);
```

**Direct Initialization**

```
import { SuperToken } from "@superfluid-finance/sdk-core";

const batchCall = new BatchCall({
  hostAddress: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7",
  operations: [<OPERATION_A>, <OPERATION_B>, ...],
});
```

**Usage**

```
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider(
  "matic",
  "<INFURA_API_KEY>"
);

const sf = await Framework.create({
  chainId: 137, //matic chainId
  provider
});
 
 // 0xabc is the signer on Rinkeby testnet
const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });
const daix = await sf.loadSuperToken("0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90");
const fromAddress = "0xabc";
const paymentAddress = "0xdef";
const approveOp = daix.approve({ receiver: paymentAddress, amount: "10000" });
const transferFromOp = daix.transferFrom({
  sender: fromAddress,
  receiver: paymentAddress,
  amount: "10000",
});
const batchCall = sf.batchCall([approveOp, transferFromOp]);
const txn = await batchCall.exec(signer);

// creating an operation from a super app function
// initialize your super app contract
const superApp = new ethers.Contract("0x...", <SUPER_APP_ABI>);

// populate the transaction
const superAppTransactionPromise = superApp.populateTransaction.helloWorld("hello world");

// create the super app operation you can execute this operation directly or pass it in to a batch call
const superAppOperation = new Operation(superAppTransactionPromise, "CALL_APP_ACTION");
```
