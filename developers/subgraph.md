---
description: Hungry for data? Hot n' fresh Superfluid subgraphs ready to consume!
---

# Subgraph

The Graph is the indexing layer of our industry. There is an ocean of open data created by blockchain networks, and the Graph will help you query it. You can use the Graph to get data on activity in the Superfluid ecosystem as well as many other types of on-chain data. You can also use the [GraphQL Playground](https://thegraph.com/hosted-service/) to start getting Superfluid specific data on any network.

## URLs

Click a link to start testing queries in the playground:

| Network          | URL                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| xDAI             | [https://console.superfluid.finance/subgraph?\_network=xdai](https://console.superfluid.finance/subgraph?\_network=xdai)                                                                     |
| Matic            | [https://console.superfluid.finance/subgraph?\_network=matic](https://console.superfluid.finance/subgraph?\_network=matic)                                                                   |
| Avalanche        | [https://console.superfluid.finance/subgraph?\_network=avalanche-c](https://console.superfluid.finance/subgraph?\_network=avalanche-c)                                                       |
| Optimism         | [https://console.superfluid.finance/subgraph?\_network=optimism-mainnet](https://console.superfluid.finance/subgraph?\_network=optimism-mainnet)                                             |
| Arbitrum         | [https://console.superfluid.finance/subgraph?\_network=arbitrum-one](https://console.superfluid.finance/subgraph?\_network=arbitrum-one)                                                     |
| Avalanche Fuji   | [https://console.superfluid.finance/subgraph?\_network=avalanche-fuji](https://console.superfluid.finance/subgraph?\_network=avalanche-fuji)                                                 |
| Optimism Kovan   | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-optimism-kovan](https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-optimism-kovan)     |
| Arbitrum Rinkeby | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-arbitrum-rinkeby](https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-arbitrum-rinkeby) |
| Mumbai           | [https://console.superfluid.finance/subgraph?\_network=mumbai](https://console.superfluid.finance/subgraph?\_network=mumbai)                                                                 |
| Goerli           | [https://console.superfluid.finance/subgraph?\_network=goerli](https://console.superfluid.finance/subgraph?\_network=goerli)                                                                 |
| Ropsten          | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-ropsten](https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-ropsten)                   |
| Kovan            | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-kovan](https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-kovan)                       |
| Rinkeby          | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-rinkeby](https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-rinkeby)                   |

## Resources

* :star:**New to GraphQL required reading** - [https://graphql.org/learn/](https://graphql.org/learn/)
* **How to make subgraph queries** - [https://thegraph.com/docs/en/developer/query-the-graph/](https://thegraph.com/docs/en/developer/query-the-graph/)
* **Deploy your own subgraph -** [https://thegraph.com/docs/en/developer/create-subgraph-hosted/](https://thegraph.com/docs/en/developer/create-subgraph-hosted/)
* **GraphQL Schema for Superfluid** - [https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/subgraph/schema.graphql](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/subgraph/schema.graphql)
* Apollo Client - for writing queries in your front end - [https://www.apollographql.com/docs/](https://www.apollographql.com/docs/)

## Contributing & Local Deployment

If you'd like to help improve the subgraph, there is a complete development guide available in the repo:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/subgraph" %}

## Helpful Tips

* All addresses (`id`, `underlyingAddress`, etc.) are lowercase (i.e. not checksummed). Be sure to convert addresses to lowercase first before making queries.

### Notable Breaking Changes When Migrating From Our Legacy Subgraph to V1 (as of October 2021)

* The field `totalSubscriptions` on the `Index`, `AccountTokenSnapshot` and `TokenStatistic` types is now `totalSubscriptionsWithUnits` .
* The `Subscriber` entity has been changed to `Subscription`. If you have been using the `subscriber` property when querying any events, this has been changed to `subscriptions` everywhere. The only place where `subscriber` is still a field is on the `Subscription` entity as a property of type `Account` .
* The `createdAt` and `updatedAt` fields are now `createdAtTimestamp` and `updatedAtTimestamp` on every type.

## Schema

The Superfluid Subgraph consists of many entities that can be queried. You can think of entities as similar to tables within a traditional database. We have added significantly more entities in October 2021 - particularly new event entities and aggregate entities. We'll give you an overview of the subgraph's structure in this post, but you can always dive deeper by looking at the [schema](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/subgraph/schema.graphql) inside of our repository.

### **Event Entities**

These entities are for the most part 1-to-1 mappings with the raw events from the contract. However for some of them, we have added additional data. This is noted in the `schema.graphql` file and will be viewable in the playground as well. These entities are created once and never updated. For example, the `FlowUpdatedEvent` type will mirror the properties on the `FlowUpdated` event inside of the Superfluid contracts.

> Note: Each event entity `id` is formulated as follows: `eventName-transactionHash-logIndex`.

> Note: event types in our legacy subgraph did not have 'Event' appended onto the end of their name. In our new v1 implementation, every event type is named 'Event Name' + 'Event.' For example, `FlowUpdated` is now `FlowUpdatedEvent` and `IndexCreated` is now `IndexCreatedEvent`. This schema is applied to every other event type as well.

### Higher Order Level Entities

Higher order level entities (HOL) are an additional abstraction on top of events. They are not ephemeral in the same way the event entities are. They contain data on an entity over its "lifetime" and therefore may be updated over time. Here is an overview of our Higher Order Level Entities:

**`Account`**

An entity created for any address which interacts with the Superfluid protocol.

**`Token`**

An entity created for all 'valid' SuperTokens. Valid tokens are defined as tokens that have set the Superfluid host's value to the correct Superfluid host address within the token contract.

> Note: [this network directory](https://docs.superfluid.finance/superfluid/networks/networks) is where you can find the address of the host for each network.

**`Index`**

An entity that represents an `Index` within a Superfluid instant distribution agreement (IDA)

**`IndexSubscription`**

An entity that contains subscription data for a `subscriber` account of a particular `index`

**`Stream`**

An entity that represents the lifetime of a stream between a `sender` and a `receiver`. An account can create a stream or update its flow rate, but when they delete it, it is considered "dead." The next stream that is created between the same `sender` and `receiver` will generate a new stream entity. Therefore, multiple stream entities can be created between the same `sender` and `receiver`.

**`StreamPeriod`**

An entity that represents a period of time in a `Stream` with a specific constant flowRate. You can think of it as a portion of a `Stream`. Each time a Stream's `flowRate` is updated, a new `StreamPeriod` will be created.

> Note: the stream type is a replacement for the previously used Flow type (as of October '21). The below image provides a good visual outline of how the `Stream` and `StreamPeriod` types compare to the previously used `Flow` type.

![A StreamPeriod vs a Stream vs a Flow](../.gitbook/assets/Flows\_Streams.png.png)

### **Aggregate Entities**

Aggregate entities are exactly what the name suggests - they are entities that store aggregate data. More specifically, we do this at an account-token level and also at a global token level. Here is an overview of our two Aggregate Entities:

**`TokenStatistic`**

An entity which aggregates all data for a single Token type.

**`AccountTokenSnapshot`**

An aggregate entity which aggregates data on an account's interaction with a given `token`.

## Examples

There are many different ways to get the same data using GraphQL. Here are some examples to help get you started using the Superfluid subgraphs.

### Super Token Data

The number of items returned by a query can sometimes be limited. In this example, we are explicitly requesting that up to 100 items should be returned, by using the `first` parameter

> Note: keep in mind that a maximum of 1000 items may be returned in a single query.

```javascript
{
  tokens(first: 100) {
    id
    symbol
    name
    underlyingAddress
  }
}
```

### Get All Streams for a Given Account

List all streams that an account is currently receiving. You can swap receiver for sender to get all streams that an account is currently sending.&#x20;

```javascript
//graphql
query MyQuery {
  streams(where: {receiver: "YOUR_ADDRESS_HERE"}) {
    currentFlowRate
    token {
      symbol
    }
    sender {
      id
    }
    receiver {
      id
    }
  }
}
```

### Getting Stream Data Between 2 Parties

The following query will allow us to answer the following questions for an active stream between Alice ("0x658...") and Bob ("0xd66...")

`token` will return the token entity type - with the `symbol` and `id` in this case.

`createdAtTimestamp` will return the timestamp at which the `stream` was created.

`updatedAtTimestamp` will return the timestamp of the last time the stream was updated.

`currentFlowRate` will return the current flow rate of the stream.

`streamedUntilUpdatedAt` will return the amount streamed until `updatedAtTimestamp`/`updatedAtBlock`

> Note: to get the current (dynamic) total amount streamed, you can use the following formula: _**streamedUntilUpdatedAt + ((current time in seconds) - updatedAtTimestamp) \* currentFlowRate**_

```
{
    streams(where:{
          sender: "0x658e1b019f2f30c8089a9ae3ae5820f335bd9ce4"
          receiver: "0xd66e40b0c30595bec72153b502ac1e0c4785991b"
        }
       ) {
    	token {
        id
        symbol
      }
	    createdAtTimestamp
	    updatedAtTimestamp
	    currentFlowRate
	    streamedUntilUpdatedAt
        }
  }
```

### Get The Most Recently Updated Flows

Here, we can query the FlowUpdatedEvent type and use `first`, `orderBy` and `orderDirection` to get the 10 most recently updated flows.

> Note: as explained in the previous higher order level entities section under the `Stream` type, it's important to understand the difference between a Flow and a Stream. A Flow represents all streaming activity between 2 addresses for a given token, while a Stream may only represent a portion of that flow. A new stream period is created each time the `flowRate` is updated, and a new stream is created each time a stream is terminated and restarted again (with the creation happening upon restarting)

`oldFlowRate` - the flowRate of the previous stream (will return "0" if this is a newly created Flow)

`flowRate` - the flowRate of the current stream

`userData` - [user data](https://docs.superfluid.finance/superfluid/docs/user-data) associated with the update.

`stream` - the Stream type associated with the flow. In our case, the next few items will come from the Stream type. Several streams may be returned if there have been multiple streams created for this `flow`.

`token` - the `token` used in the updated flow. Here we are returning this token's `symbol`

`sender` - the `sender` of the updated flow. Here we will return this sender's `id` (their address)

`receiver` - the `receiver` of the updated flow. Here we will return this receiver's `id` (their address)

```
{
   flowUpdatedEvents(first: 10, orderBy: timestamp, orderDirection: desc) {
     	oldFlowRate
	flowRate
	userData	
	stream {
	    token {
	    symbol
	}
	    sender {
		id
	}
	    receiver {
		id
	}
     }	
  }
}
```

### Get an Account's IDA Index Subscriptions

Here, we can query all of the subscriptions a particular account is subscribed to.

`subscriptions` will return an `IndexSubscription` type for each `Index` that this account is subscribed to

`token` - the `Token` used in each subscription. Here we display the `symbol`.

`id` - the ID of the `IndexSubscription`. This ID is composed of: `subscriberAddress`-`publisherAddress`-`tokenAddress`-`IndexId`

`approved` - a boolean value that represents whether or not the subscription is `approved`. Approved subscriptions don't require subscribers to claim tokens that are distributed from the publisher.

`units` - the total number of units allocated to this account in the index. If `units` is 0, it indicates that the subscription is "deleted". They are no longer subscribed to the index.

`totalAmountReceivedUntilUpdatedAt` - the total amount of tokens that this account has received via this IDA index until `updatedAtTimestamp`/`updatedAtBlock`.

```
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

### Get Recent Index Information By Querying an Event Type

In this example, we can filter by & return data using a combination of an event type and HOL type. Here, we'll get the 10 most recent indexUpdatedEvents where the newIndexValue is greater than 1000 tokens.

We'll return the following from the Index type

`indexValue` - used to calculate the distribution amount that a user receives when the publisher updates the index value. The distribution amount can be calculated using the following formula:

> (index.indexValue - subscriber.indexValue) \* subscriber.units

`totalUnitsPending` - he number of units allocated by the `Index` that are pending. This refers to the current (as of updatedAt) `totalUnitsPending` - not all that has ever been pending.

`totalUnitsApproved` - he number of units allocated by the `Index` that have been approved. This refers to the current (as of updatedAt) `totalUnitsApproved` - not all that has ever been approved.

`totalUnits` - the sum of `totalUnitsPending` and `totalUnitsApproved`.

`token` - the type `Token` used in the index.

`symbol` - the symbol of the `Token` used in the index

```
{
   indexUpdatedEvents (
      first: 10,
      orderBy: timestamp
      orderDirection: desc
      where: {
	indexValue_gt: "1000000000000000000000"
      }) {
	  index {
	  indexValue
	  totalUnitsPending
	  totalUnitsApproved
	  totalUnits
	  token {
	    symbol
	  }
	}
  }
}
```

### Get Aggregate Flow Data For a Given Token

As an example of how to use aggregate entities, let's take a look at a query using the Token Statistic type. In this case, we can see aggregate data for Super DAI on Polygon.

`totalNumberOfActiveStreams` - the total count of active streams using the token.

`totalNumberOfActiveIndexes` - total number of active IDA indexes for the token.

`totalAmountStreamedUntilUpdatedAt` - all-time total amount streamed until the `updatedAtTimestamp`/`updatedAtBlock`.

`totalOutFlowRate` - total outflow rate of the `token` (how much value is being moved).

`totalAmountDistributedUntilUpdatedAt` - all-time total amount distributed until the `updatedAtTimestamp`/`updatedAtBlock`.

```
{
  tokenStatistics(where: {
     #DAIx address on Matic
     id: "0x1305f6b6df9dc47159d12eb7ac2804d4a33173c2"
     })
	{
	   totalNumberOfActiveStreams
	   totalNumberOfActiveIndexes
	   totalAmountStreamedUntilUpdatedAt
	   totalOutflowRate
	   totalAmountDistributedUntilUpdatedAt
	}
}
```

### Get Data On a Specific Account

To query data on a specific account, we can use both the Account entity and the aggregate AccountTokenSnapshot entity. Note: if you're only interested in seeing an account's activity with a particular token, you can query AccountTokenSnapshot to get that data. Otherwise, the `Account` entity will return an `AccountTokenSnapshot` for every token used for each `id` (i.e. for each Account's address).

**On the `Account` entity:**

`isSuperApp` - returns `true` if the account is a super app, `false` if not.

`inflows` - will return all `Streams` where `Account` is the `sender`.

`outflows` - will return all `Streams` where `Account` is the `receiver`.

**On the `AccountTokenSnapshot` entity:**

`token` - the address of the token used in streams or subscriptions

`totalNumberOfActiveStreams` - the total number of streams the account is associated with for the given token

`totalNetFlowRate` - the total net flow rate of the `account` for the given token as of `updatedAtTimestamp`/`updatedAtBlock`.

```
{
  accounts(where: {
  #enter an address below
  id: "0x..."
  })
   {
     isSuperApp
     inflows {
      currentFlowRate
      token{
        symbol
      }
      sender {
        id
      }
    }
     outflows {
      currentFlowRate
      token {
        symbol
      }
      receiver {
        id
      }
    }
     accountTokenSnapshots{
     token {
       id
     }
     totalNumberOfActiveStreams
     totalNetFlowRate		
    }
  }
}
```

### Your query here!

If you design a useful query, let us know and we will share it here!

## Legacy Subgraph Documentation

## Legacy Subgraph URLs

Click a link to start testing queries in the playground:

| Network | URL                                                                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| xDAI    | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-xdai](https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-xdai)       |
| Matic   | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-matic](https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-matic)     |
| Mumbai  | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-mumbai](https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-mumbai)   |
| Goerli  | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-goerli](https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-goerli)   |
| Ropsten | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-ropsten](https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-ropsten) |
| Kovan   | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-kovan](https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-kovan)     |
| Rinkeby | [https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-rinkeby](https://thegraph.com/hosted-service/subgraph/superfluid-finance/superfluid-rinkeby) |

## Legacy Schema

The Legacy schema contains fewer entities and some subtle differences in schema. These differences are outlined in the above sections, but you can find the previous schema in full here:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/ethereum-contracts%40v1.0.0-rc.7/packages/subgraph/schema.graphql" %}

> NOTE: Please refer to the above section on Breaking Changes as of October 2021, and the section on Streams vs Flows in the above section on the V1 Subgraph documentation. For example, you'll notice in the below example that the `Flow` type is used in a query. This type has been deprecated.

### How much USDCx has Alice streamed to Bob? \[_Legacy Query_]

The Subgraph can only return a flow's `sum` since the last on-chain event (`flowUpdated`, `flowCreated`, or `flowDeleted`). Therefore, if `flowRate` is greater than zero, you will need to calculate the tokens flowed since the last event. Use this equation to get the the total sum of tokens flowed:

$$totalSum = sum + flowRate(currentTimestamp-lastUpdate)$$

```
{
    tokens(where: { symbol: "USDCx" }) {
        flows(
            where: {
                owner: "0x658e1b019f2f30c8089a9ae3ae5820f335bd9ce4"
                recipient: "0xd66e40b0c30595bec72153b502ac1e0c4785991b"
            }
        ) {
            sum
            flowRate
      	    lastUpdate
        }
    }
}
```
