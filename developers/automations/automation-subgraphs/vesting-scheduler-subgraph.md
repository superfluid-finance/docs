# Vesting Scheduler Subgraph

## Repo

{% embed url="https://github.com/superfluid-finance/platform-monorepo/tree/master/packages/subgraph/vesting-scheduler" %}

## Subgraph Explorers

**Mainnets**

[Ethereum Mainnet](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-eth-mainnet)

[Polygon](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-polygon-mainnet)

[Gnosis (xDAI)](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-xdai-mainnet)

[Avalanche](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-avalanche-c)

[Arbitrum](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-arbitrum-one)

[Optimism](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-optimism-mainnet)

[Binance Smart Chain (BSC)](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-bsc-mainnet)

**Testnets**

[Polygon Mumbai](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-polygon-mumbai)

[Ethereum Goerli](https://thegraph.com/hosted-service/subgraph/superfluid-finance/vesting-v1-eth-goerli)

## Basic Example Queries

**Essential details on vesting schedules**

```
{
  vestingSchedules(first: 10) {
    cliffAmount
    cliffAndFlowExpirationAt
    cliffDate
    tasks {
      id
    }
    endDate
    cliffAndFlowExecutedAt
    createdAt
    startDate
    flowRate
    superToken
  }
}
```

**Querying by tokenSenderReceiverCursor**

The `tokenSenderReceiverCursor` is comprised as "{super token address}-{sender}-{receiver}". This way you can look up vesting schedules with these parameters on hand.

<pre><code><strong>{
</strong>  tokenSenderReceiverCursor(
    id: "0x288398f314d472b82c44855f3f6ff20b633c2a97-0x9be85a79d847dfa90584f3fd40cc1f6d4026e2b9-0xf9ce34dfcd3cc92804772f3022af27bcd5e43ff2"
  ) {
    currentVestingSchedule {
      startDate
      endDate
      cliffDate
      endExecutedAt
      cliffAndFlowExecutedAt
    }
    currentCliffAndFlowTask {
      executedAt
      executionAt
      expirationAt
      failedAt
    }
    currentEndVestingTask {
      executedAt
      executionAt
      expirationAt
      failedAt
    }
  }
}
</code></pre>

**Finding all vesting schedules between a certain sender and receiver.**

```
{
  vestingSchedules(where:{
    and: [
      {sender: "0x9be85a79d847dfa90584f3fd40cc1f6d4026e2b9"}
      {receiver:"0xf9ce34dfcd3cc92804772f3022af27bcd5e43ff2"}
    ]
  }) {
    sender
    receiver
    startDate
    cliffDate
    cliffAmount
    flowRate
    endDate
    tasks {
      type
      executionAt
      expirationAt
    }
  }
}
```
