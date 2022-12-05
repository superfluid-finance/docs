---
description: Generating pre-filled dashboard links for your users
---

# Constructing Links to The Superfluid Dashboard

### How do I create a prefilled **Superfluid Dashboard** Send Stream link?

If you want to send a payment request using the Superfluid Dashboard, you can do so by tweaking the URL parameters

If you're interested in sending someone else a prefilled Send Stream link, here's how:

A fully-filled send stream link looks as follows:

```
<https://app.superfluid.finance/send?network=polygon&receiver=0x7BDa037dFdf9CD9Ad261D27f489924aebbcE71Ac&token=0x263026e7e53dbfdce5ae55ade22493f828922965&flow-rate=250/minute>
```

**You may tweak the parameters as follows:**

`network`: The intended network of the stream to be created. Examples: `gnosis`, `polygon`, `polygon-mumbai`, `avalanche-fuji`, `optimism`, `arbitrum-one`, `avalanche`, `bsc`, `goerli`

`receiver`: The hex address of the intended recipient of the stream to be created.

`token`: The hex address of the Super Token to be used for the stream. You can find Super Token addresses in the [Superfluid Console](https://console.superfluid.finance/).

`flow-rate`: The flow rate of the intended stream, `number/frequency` e.g. `1/second`, `1000/month`, `120000/year`

### **How to construct links to Superfluid Dashboard Stream Details Pages**

**Method 1 (recommended):** [https://app.superfluid.finance/stream/polygon/0xd964ab7e202bab8fbaa28d5ca2b2269a5497cf68-0x7bda037dfdf9cd9ad261d27f489924aebbce71ac-0x3862c15cdc4c38517aa4c6f94197a93253502168-0.0](https://app.superfluid.finance/stream/polygon/0xd964ab7e202bab8fbaa28d5ca2b2269a5497cf68-0x7bda037dfdf9cd9ad261d27f489924aebbce71ac-0x3862c15cdc4c38517aa4c6f94197a93253502168-0.0)

`sender-receiver-tokenaddress-StreamRevision.revisionIndex`

**Method 2 (legacy):** [https://app.superfluid.finance/stream/polygon/0x2214a32b03a13a68f5f3d84c17c9fd549ab6fcc01b96ffcea8cf209982cf32da-95](https://app.superfluid.finance/stream/polygon/0x2214a32b03a13a68f5f3d84c17c9fd549ab6fcc01b96ffcea8cf209982cf32da-95)

`txhash-logindex`

### **How do I create a prefilled Superfluid Dashboard** [**Li.Fi**](http://li.fi/) **Bridge link?**

Instructions for a prefilled link to Swap and Bridge in the Superfluid Dashboard

A fully prefilled [Li.Fi](http://li.fi) Bridge Widget link looks as follows:

```
<https://app.superfluid.finance/bridge?fromChain=137&toChain=10&fromToken=0xCAa7349CEA390F89641fe306D93591f87595dc1F&toToken=0x7f5c764cbc14f9669b88837ca1490cca17c31607&fromAmount=100>
```

**You may tweak the parameters as follows:**

`fromChain`: The chainId of the source chain. e.g. `137` for Polygon

`toChain`: The chainId of the destination chain. e.g. `10` for Optimism

`fromToken`: The token hex address of the source token

`toToken`: The token hex address of the destination token

`fromAmount`: The amount of tokens to be swapped
