# Stream Scheduler Subgraph

## Repo

{% embed url="https://github.com/superfluid-finance/platform-monorepo/tree/master/packages/subgraph/flow-scheduler" %}

## Subgraph Explorers

**Mainnets**

[Ethereum Mainnet](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-eth-mainnet)

[Polygon](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-polygon-mainnet)

[Gnosis (xDAI)](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-xdai-mainnet)

[Avalanche](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-avalanche-c)

[Arbitrum](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-arbitrum-one)

[Optimism](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-optimism-mainnet)

[Binance Smart Chain (BSC)](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-bsc-mainnet)

**Testnets**

[Polygon Mumbai](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-polygon-mumbai)

[Ethereum Goerli](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-eth-goerli)

## Basic Example Queries

You can test these out in the [Ethereum Mainnet](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-eth-mainnet) sandbox.

{% hint style="info" %}
Remember that subgraph queries expect all letters within provided addresses to be in full lowercase.
{% endhint %}

#### Fetching all Flow Schedules for a certain sender

```javascript
{
  flowScheduleCreatedEvents(where: {sender: "0xbd5a76f59df49527e47df66d7d7b5590a237871d"}) {
    id
    order
    sender
    receiver
    startAmount
    startDate
    startDateMaxDelay
    superToken
    flowRate
  }
}
```

{% hint style="info" %}
Note that that the `id` attribute is formatted as "{Event Name}-{Transaction Hash}-{Log Index}". Log index is provided as it's possible that multiple of the same event occur in the same transaction, so with the log index gives unique identification.\


`id:` `"FlowScheduleCreated-0x04ca752e609289f6144df3e0096ccb9772ba4923781612096ec5582f62c3ff46-171"`

\
indicates...\


_Event Name_: FlowScheduleCreated

_Transaction Hash_: [`0x04ca752e609289f6144df3e0096ccb9772ba4923781612096ec5582f62c3ff46`](https://etherscan.io/tx/0x04ca752e609289f6144df3e0096ccb9772ba4923781612096ec5582f62c3ff46)

_Log Index_: 171
{% endhint %}

#### Fetching all Flow Deletion tasks executed before a certain time

```
{
  deleteTasks(where: {executedAt_lt: "1688457635"}) {
    sender
    receiver
    superToken
  }
}
```
