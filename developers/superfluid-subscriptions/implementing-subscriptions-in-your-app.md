---
description: Reference material for building subscription products on Superfluid
---

# Implementing Subscriptions in your App

##

### Write Operations

Unless you have a very specific reason to use a smart contract or a deeper integration for these write operations, we recommend that you use our [superfluid-checkout-widget.md](superfluid-checkout-widget.md "mention") toolkit. If you prefer to use the [SDK](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations). You can find several examples of our SDK in action with front end examples [here](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/money-streaming-1), and a node module example [here](https://github.com/superfluid-finance/super-examples/blob/main/projects/tradeable-cashflow/scripts/createFlow.js).&#x20;

### Getting Stream Data

There are two ways to get stream data: via our SDK and our Subgraph. If you only want to check whether a single address is streaming to you, then [our SDK](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations/read-methods/getflow) is the simplest way to get this data is to load the token you'd like to use like this.&#x20;

{% hint style="info" %}
Note that tokens may be loaded by symbol or by address&#x20;
{% endhint %}

```javascript
// Some code
const daix = await sf.loadSuperToken("DAIx"); 
let flowInfo = await daix.getFlow({ 
    sender: string, 
    receiver: string, 
    providerOrSigner: ethers.providers.Provider | ethers.Signer 
});
```



But if you want to get a list of all addresses streaming to you, then [our subgraph](https://docs.superfluid.finance/superfluid/developers/subgraph#get-all-streams-for-a-given-account) is going to be best for this. This is also our recommended method for querying data on a subset of those addresses based on specific criteria (i.e. all addresses with an existing flow rate about x amount).&#x20;

You can workshop different subgraph queries at [console.superfluid.finance/subgraph](http://console.superfluid.finance/subgraph) and use Apollo Client or a similar framework to actually run these queries inside of your application.

Here’s an example which will give you all streams that are currently open to your address:

<pre class="language-javascript"><code class="lang-javascript">//graphql query
query MyQuery { 
    streams(where: {receiver: "YOUR_ADDRESS_HERE", currentFlowRate_gt: "0"}) { 
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
<strong>    }     
</strong>}
</code></pre>

### Events

There is more than one way to handle updates to subscriptions. However, it may be useful for you to listen for specific events that are thrown on chain when streams are created, updated, or deleted. The event you’re looking for here is the flowUpdated event. You can get flowUpdated events from our subgraph, or query them on chain. You can also set up no-code alerts with [Boto.io](http://boto.io/) and trigger actions like membership record creation and NFT minting [using a webhook](https://www.superfluid.finance/post/boto-integrates-superfluid-in-their-automation-recipes).

If you want to get these events from the subgraph, then you can do so with a query like this:

```javascript
// graph query
query MyQuery {
  flowUpdatedEvents(
    where: {receiver: "MY_ADDRESS"}
  ) {
    sender
    token
    flowRate
    timestamp
  }
}
```

## Simple Flow Authentication Example

If you’re interesting in seeing this all together, here is an example of an Express app that checks whether or not a stream exists to a specific address before returning 200 (if the stream does not exist, a 401 error is returned).

{% embed url="https://github.com/saflamini/superfluidInfraPayments/blob/master/index.js#L48" %}
