# Auto Wrap Subgraph

## Repo

{% embed url="https://github.com/superfluid-finance/platform-monorepo/tree/master/packages/subgraph/wrap-scheduler" %}

## Subgraph Explorers

**Mainnets**

[Ethereum Mainnet](https://thegraph.com/hosted-service/subgraph/superfluid-finance/auto-wrap-v1-eth-mainnet)

[Polygon](https://thegraph.com/hosted-service/subgraph/superfluid-finance/auto-wrap-v1-polygon-mainnet)

[Gnosis (xDAI)](https://thegraph.com/hosted-service/subgraph/superfluid-finance/auto-wrap-v1-xdai-mainnet)

[Avalanche](https://thegraph.com/hosted-service/subgraph/superfluid-finance/auto-wrap-v1-avalanche-c)

[Arbitrum](https://thegraph.com/hosted-service/subgraph/superfluid-finance/auto-wrap-v1-arbitrum-one)

[Optimism](https://thegraph.com/hosted-service/subgraph/superfluid-finance/auto-wrap-v1-optimism-mainnet)

[Binance Smart Chain (BSC)](https://thegraph.com/hosted-service/subgraph/superfluid-finance/scheduling-v1-bsc-mainnet)

**Testnets**

[Polygon Mumbai](https://thegraph.com/hosted-service/subgraph/superfluid-finance/auto-wrap-v1-polygon-mumbai)

[Ethereum Goerli](https://thegraph.com/hosted-service/subgraph/superfluid-finance/auto-wrap-v1-eth-goerli)

## Basic Example Query

```
wrapSchedules( where: { account: "0x0aff3384ef1299290a052b5b779bf6c231110841" } ) {
    id
    account
    superToken
    liquidityToken
    manager
    strategy
    lowerLimit
    upperLimit
    deletedAt 
}
```

**Attributes**

`id` - (see note at bottom of page)

`account` - The address of the user who is wrapping the liquidity tokens. Remember that subgraph queries expect all letters within provided addresses to be in full lowercase.

`superToken` - The Super Token that the user is streaming should have its balance topped up automatically.

`liquidityToken`: The address of the underlying token of the superToken (i.e. USDC for USDCx) that the user approved the Auto-Wrap contract to spend.

`manager` - The Schedule contract that manages the auto-wrap. Strategy: The address of the Auto-Wrap Strategy contract which decides how to execute wrap.

`strategy` - The address of the Auto-Wrap Strategy contract which decides how to execute wrap.

`lowerLimit` - The amount of time (in seconds) left until your stream hits zero at which a top-up should be triggered. (ex. 172800)&#x20;

`upperLimit` - The amount of time (in seconds) worth of streaming that the wrapped tokens will cover. (ex. 604800)&#x20;

`deletedAt` - Whether the scheduled wrap has been deleted by the user.

{% hint style="info" %}
Note that that the `id` attribute is formatted as "{Transaction Hash}-{Log Index}". Log index is provided as it's possible that multiple of the same event occur in the same transaction, so with the log index gives unique identification.\


`id:` "0x00262727baccf2ce26c9dee1e27d7646eb8980656a22c1362c9da7d8b97cd106-0"

\
indicates...\


_Transaction Hash_: [`0x04ca752e609289f6144df3e0096ccb9772ba4923781612096ec5582f62c3ff46`](https://etherscan.io/tx/0x04ca752e609289f6144df3e0096ccb9772ba4923781612096ec5582f62c3ff46)

_Log Index_: 0
{% endhint %}
