---
description: Query CFA Data
---

# Money Streaming Events

## CFA Events (For Money Streaming)

`flowUpdated`: emits any time there is a creation, update, or deletion event of a stream. Note that “type” will represent the type of update:

0 = creation event

1 = update event

2 = deletion event

[**Solidity Event:**](https://github.com/superfluid-finance/protocol-monorepo/blob/ace5c3186a8880df0e8d9f99db0d02c6fc941ae1/packages/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol#L399)

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-11-29 at 10.00.51 AM.png" alt=""><figcaption></figcaption></figure>

**Sample Subgraph Query:**

```graphql
#returns the new netFlowRate along with all flowUpdated events for a user
query MyQuery {
  flowUpdatedEvents(where: {sender: "0xdcb45e4f6762c3d7c61a00e96fb94adb7cf27721"}) {
    timestamp
    token
		type
    totalSenderFlowRate
		totalAmountStreamedUntilTimestamp
		stream {
	      streamedUntilUpdatedAt
	    }
  }
}
```

> **Note** that `totalAmountStreamedUntil` timestamp is useful because it will return the total amount streamed until the state change, and `streamedUntilUpdatedAt` will return the total amount stream since the _previous_ state change. Learn more about this [here](https://docs.superfluid.finance/superfluid/developers/subgraph#higher-order-level-entities).
