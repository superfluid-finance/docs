---
description: Query IDA Events
---

# Instant Distribution Events

## IDA Events (For Distributions)

`indexDistributionClaimed`: emits when a subscriber claims a pending distribution. This will increment the super balance of the subscriber

[**Solidity Event:**](https://github.com/superfluid-finance/protocol-monorepo/blob/ace5c3186a8880df0e8d9f99db0d02c6fc941ae1/packages/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol#L480)

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-11-29 at 10.03.06 AM.png" alt=""><figcaption></figcaption></figure>

**Sample Subgraph Query:**

```graphql
#get events where subscriber "0xdcb" claimed a pending distribution
query MyQuery {
  indexDistributionClaimedEvents(
    where: {subscriber: "0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721"}
  ) {
    amount
    indexId
    timestamp
    token
  }
}
```

`subscriptionApprovedEvents` : emits when a subscribed approves a subscription. If the subscribed has any unclaimed distributions, this will increment the token balance of the subscriber

[Solidity Event:](https://github.com/superfluid-finance/protocol-monorepo/blob/ace5c3186a8880df0e8d9f99db0d02c6fc941ae1/packages/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol#L235)

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-11-29 at 10.03.30 AM.png" alt=""><figcaption></figcaption></figure>

Sample Subgraph Query:

```graphql
#get events where subscriber "0xdcb" approved a subscription
query MyQuery {
  subscriptionApprovedEvents(
    where: {subscriber: "0xdcb45e4f6762c3d7c61a00e96fb94adb7cf27721"}
  ) {
    timestamp
    token
    transactionHash
  }
}
```

`indexUpdatedEvents`: emits when an index is updated. This will happen when a publisher distributes funds to an index. If a subscriber has approved the subscription by calling `approveSubscription()`, then these events will increment the user’s balance. In this case, we’d recommend getting a user’s list of index subscriptions and then simply calling `balanceOf()` when an indexUpdatedEvent is emitted for one of those subscriptions.

[**Solidity Event:**](https://github.com/superfluid-finance/protocol-monorepo/blob/ace5c3186a8880df0e8d9f99db0d02c6fc941ae1/packages/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol#L148)

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-11-29 at 10.04.07 AM.png" alt=""><figcaption></figcaption></figure>

**Sample Subgraph Queries**

```graphql
#get a subscriber's index subscriptions
{
   accounts(where: {
   #your address below
    id: "0x..."
    }) {
    subscriptions{
      	index {
          token{
            symbol
          }
        }
        id
        approved
        units
        totalAmountReceivedUntilUpdatedAt
    }
  }
}
```

Then, you can listen for events for the above indexIds^

```graphql
query MyQuery {
  indexUpdatedEvents(where: {indexId: $id}) {
    timestamp
  }
}
```
