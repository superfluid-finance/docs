---
description: Hungry for data? Hot n' fresh Superfluid subgraphs ready to consume!
---

# Subgraph

Get useful insights into Superfluid using our subgraphs. Use the GraphQL Playground to start testing on any network.

## URLs 

Click a link to start testing queries in the playground:

| Network | URL                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| xDAI    | [https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-xdai](https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-xdai)       |
| Matic   | [https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-matic](https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-matic)     |
| Mumbai  | [https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-mumbai](https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-mumbai)   |
| Goerli  | [https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-goerli](https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-goerli)   |
| Ropsten | [https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-ropsten](https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-ropsten) |
| Kovan   | [https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-kovan](https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-kovan)     |
| Rinkeby | [https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-rinkeby](https://thegraph.com/explorer/subgraph/superfluid-finance/superfluid-rinkeby) |

## Resources

* :star:**New to GraphQL required reading** - [https://graphql.org/learn/](https://graphql.org/learn/)  
* **How to make subgraph queries** - [https://thegraph.com/docs/graphql-api#queries](https://thegraph.com/docs/graphql-api#queries)
* **Deploy your own subgraph -** [https://thegraph.com/docs/deploy-a-subgraph#create-a-graph-explorer-account](https://thegraph.com/docs/deploy-a-subgraph#create-a-graph-explorer-account)
* **GraphQL Schema for Superfluid** - [https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/subgraph/schema.graphql](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/subgraph/schema.graphql)

## Contributing & Local Deployment

If you'd like to help improve the subgraph, there is a complete development guide available in the repo:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/subgraph" %}

## Helpful Tips

* All addresses (`id`, `underlyingAddress`, etc.) are lowercase. Be sure to convert addresses to lowercase first before making queries.

## Examples

There are many different ways to get the same data using graphql. Here are just some examples to help get you started using the Superfluid subgraphs:

### How many tokens are there?

The number of items returned by a query can sometimes be limited. In this example, we are explicitly requesting that up to 1000 items should be returned, by using the `first` parameter.

```javascript
{
  tokens(first: 1000) {
    id
    symbol
    name
    underlyingAddress
  }
}
```

### How much USDCx has Alice streamed to Bob?

The Subgraph can only return a flow's `sum` since the last on-chain event (`flowUpdated`, `flowCreated`, or `flowDeleted`). Therefore, if `flowRate` is greater than zero, you will need to calculate the tokens flowed since the last event. Use this equation to get the the total sum of tokens flowed:  

$$totalSum = sum + flowRate(currentTimestamp-lastUpdate)$$ 

```javascript
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

### Your query here!

If you design a useful query, let us know and we will share it here!

## @superfluid-finance/data-js-sdk

Coming soon is a handy library that will "wraps" subgraph. Instead of spinning up Apollo-graphql, and hand-crafting queries, you can do something like this:

```javascript
const totalSum = sfData.flowed({ owner, recipient, tokenAddress });
```
