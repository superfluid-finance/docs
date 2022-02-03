---
description: Getting Started with the Constant Flow Agreement
---

# 🌊 Money Streaming

Let's walk through creating Superfluid streams using the Superfluid Core-SDK. We'll get straight into the code with some examples, but you can scroll down to learn about how the SDK works in more detail.&#x20;

### Creating a Flow

Creating a flow requires you to call `sf.cfaV1.createFlow()` and pass in the sender, receiver, flowRate, and superToken. There's also an optional field you can use called `userData` - which you can learn more about [in our guide on the topic](../guides/user-data.md).&#x20;

See below for an example of how this works. You can enter your own Ethereum address and `flowRate` (i.e. how much DAIx you want to send in in wei/second) to send yourself a stream of DAIx. Scroll down in the React App page (on the right side of the screen below) to see your flowRate converted into DAIx per month.

{% embed url="https://codesandbox.io/embed/cfa-createflow-walkthrough-ougpu?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FCreateFlow.js&theme=dark&view=split" %}

### Updating a Flow

Updating a flow is very similar to creating one. You'll need to pass the same parameters that you passed in the create flow function to `sf.cfaV1.updateFlow()`- except this time you'll need to pass in a new `flowRate`. If you attempt to use the same `flowRate`, or if you try to edit a stream which does not currently exist, this function will revert. Give it a try:

{% embed url="https://codesandbox.io/embed/cfa-updateflow-walkthrough-9v6rj?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpdateFlow.js&theme=dark&view=split" %}

### Deleting a Flow

Finally, we can delete flows. To delete a flow, you'll just need to pass the `sender`, `receiver`, and `superToken` to the `sf.cfaV1.deleteFlow()` function. If you attempt to delete a flow which does not exist, it will revert.

{% embed url="https://codesandbox.io/embed/cfa-deleteflow-walkthrough-346ek?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FDeleteFlow.js&theme=dark&view=split" %}
Delete a flow
{% endembed %}

### Metamask/Web3Provider Example

In the previous 3 examples, we demonstrated usage of the SDK with an unlocked account. You can also use a browser wallet with the SDK. Here's an example of how you can use a connected wallet address with Superfluid.

{% embed url="https://codesandbox.io/embed/cfa-createflow-metamask-i3fo4?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FCreateFlow.js&theme=dark&view=split" %}

### Money Streaming

A money stream (or 'flow' - you'll see these terms used interchangeably) is a continuous stream of funds sent from one account to another. You can open up a stream by passing a few arguments to the `sf.cfaV1.createFlow()` function within our SDK:

`flowRate` - the amount of tokens being streamed per second, denominated in wei (i.e. with 18 decimals)

`receiver` - the recipient of the money stream

`superToken` - the token being streamed

Once you call this function, the protocol will take a small deposit up front in escrow. On testnets, this amount is 1 hour worth of the stream, and on mainnets, it is 4 hours worth of the stream.&#x20;

> **Note**: if you send funds to a 'super app' contract, these deposit amounts will double. You can learn more about this in our [Super App guide](../guides/super-app.md#super-app-deposits).&#x20;

Once the stream is opened, it will stay open as long as the `sender` account has a balance > 0 of the `superToken` being used for the stream. If you let your balance hit zero, your deposit will be liquidated by the network, and your stream will be closed.&#x20;

In the above examples, we've created a small React App which makes use of the Superfluid [Core-SDK](https://www.npmjs.com/package/@superfluid-finance/sdk-core). You will see an example of creating, updating, and deleting flows. Each interactive section can be opened and forked for your own projects.

You'll see that we're importing the Superfluid SDK in each key component, then initializing the SDK using the following logic:

```
// initialization of the core SDK
const sf = await Framework.create({ 
   networkName: "kovan", 
   provider: customHttpProvider 
});
```

In our case, we're using a link from Alchemy to get our own custom HTTP provider for the Kovan network. You could easily change this so that you use a `web3Provider` (i.e. a metamask connection in the browser) instead of an RPC URL. You can see the [SDK's README](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/sdk-core) for an example of this.

We've also provided an unlocked address that is loaded up with test net Super Tokens for example purposes. We've used the `sf.createSigner()` method to create a signer with this address.&#x20;

```
// Creating a signer
  const signer = sf.createSigner({
    privateKey:
      "0x...", //private key goes here
    provider: customHttpProvider
  });
```

> **NOTE**: In the above sections, you'll be able to send yourself test tokens. Please don't take egregious amounts of tokens from the example address used. It will never be used to hold real value. You'll just be making this tutorial worse for everyone else who comes here trying to learn (and you're 100% NGMI if you can't figure out how to get free test tokens from our [dashboard](money-streaming-1.md#creating-a-flow)).&#x20;

### FlowRates

The flowRate is the # of tokens you'd like to send per second, denominated in wei. You can use the calculator below to get the flowRate for an amount of tokens you want to send per month. You can pass this calculated flowRate into the examples above to create & update your streams.&#x20;

{% embed url="https://codesandbox.io/embed/flowratecalc-hz89i?fontsize=12&module=%2Fsrc%2FCalculateFlowRate.js&theme=dark" %}

Next, we'll follow a similar process for working with the Instant Distribution Agreement.&#x20;
