---
description: Supporting Streams in Your Application
---

# Supporting Money Streams

{% hint style="info" %}
You can learn more about streaming [here](../../../developers/constant-flow-agreement-cfa/).&#x20;
{% endhint %}

When an account opens a money stream using the constant flow agreement, they need to define the receiver, the super token being streamed, and the flow rate of that stream. For example, in our sdk, it looks like this:

```jsx
sf.cfaV1.createFlow({
	receiver: “0x123…”,
	superToken: daix.address,
	flowRate: “385802469135802” //equivalent to 1000 dai per month
});
```

{% hint style="info" %}
💡 Note that the flow rate is the number of tokens that the user will send per second to the receiver (denominated in wei: i.e. with 18 decimals)
{% endhint %}

When this stream is opened, 4 hours worth of that stream is held in escrow by the protocol. This is known as the stream’s _buffer._ The buffer is a mechanism to help keep Superfluid secure. With Superfluid streams, you don’t need to lock up the entire stream amount up front. You can learn more about why this works the way that it does [here](https://docs.superfluid.finance/superfluid/sentinels/liquidations-and-toga), but it’s worth keeping that buffer amount in mind.

For example, as long as I have at least 4 hours worth of the stream in my balance, I can open the above stream at 1000/month. Having all 1k tokens in my wallet is unnecessary: I can keep them working in Aave or Compound, and then periodically top up my wallet balance.

An account can be sending and receiving an arbitrary number of streams at any given point in time. However, the thing that will likely matter for your integration is going to be an account’s **net flow rate**.

The `netFlowRate` is the total number of tokens being sent or received each second. Accounts will have different net flow rates for each token depending on their streaming activity. As we’ll see in the next section, this will be relevant for displaying a balance that is changing in real time. You can get the `netFlowRate` in three different ways:

1\) Using the [SDK Core](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/getting-data#cfav1-read-operations):

```jsx
await sf.cfaV1.getNetFlow({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
```

2\) Using the Superfluid [subgraph](https://docs.superfluid.finance/superfluid/developers/subgraph), using an entity such as `accountTokenSnapshot`

```graphql
#this query will return the total netFlowRate for account "0xDCB..." and DAIx on Goerli
query MyQuery {
  accountTokenSnapshots(
    where: {account: "0xdcb45e4f6762c3d7c61a00e96fb94adb7cf27721", token: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00"}
  ) {
    token {
      name
      symbol
    }
    totalNetFlowRate
  }
}
```

> Note that you can experiment with your own queries in the subgraph playground in the [Superfluid console](https://console.superfluid.finance).

3\) You can also get `netFlowRate` data in solidity by calling `getNetFlow` on the [CFA contract directly:](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol)

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-11-29 at 9.52.04 AM.png" alt=""><figcaption></figcaption></figure>
