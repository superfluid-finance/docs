---
description: Reference material for building subscription products on Superfluid
---

# Supporting Superfluid for Subscriptions

{% hint style="info" %}
This guide discusses implementing streaming subscriptions _without_ the [Superfluid Subscriptions](../superfluid-subscriptions.md) tooling
{% endhint %}

## Subscriptions on Superfluid

When building a subscriptions product on Superfluid, we expect that you’ll need a few things

1\) You’ll need to enable users to create a subscription stream, update that stream if they change their plan, or delete that stream if they opt to cancel

2\) You may need to validate whether an address is currently streaming to you, and perhaps get a list of all addresses currently streaming to you

3\) You’ll need to know when a user deletes a stream or updates their plan so that you may make the proper changes to their account.

There are many ways that this process can be managed, and your implementation will depend on the needs of your users. With that said, here are a few concepts & code examples that should help you in your development.

### Basic Superfluid Terminology

**Super Token**: Tokens which may be used for any Superfluid related operation. There are 3 types of Super Tokens: ERC20 Wrapper Tokens, Pure Super Tokens, and Native Asset Super Tokens. More can be found on this in our[ section on Super Tokens](https://www.notion.so/superfluid/developers/super-tokens/super-tokens)

**Stream**: A continuous flow of money that is sent from one address to another. A sender can only have a single stream open to the same receiver on each token. This term is often used interchangeably with “flow”

**Flow Rate:** The number of tokens being sent in a stream, denominated in wei per second. For example, a flow rate of `“100000000000000000”` = 0.1 tokens/second

**Buffer**: The amount of tokens that an account must temporarily lock up when a stream is started.

**Super Tokens**

Before we get into subscription logic, you should know that to use Superfluid, you must use Super Tokens. These tokens are an extension of the ERC20 and ERC777 standard. With super tokens, you get full compatibility with ERC20 (i.e. approve, transferFrom, etc) and also things like send() from ERC777. What makes super tokens special is that they are plugged into the rest of the Superfluid framework, which allows users to move tokens in entirely novel ways via things like money streaming & scalable one-to-many distributions.

#### **There are 2 general types of Super Tokens**

1\) Wrapper Super Tokens

2\) Pure Super TokensWrapper super tokens enable existing assets - such as ERC20 tokens or native assets like MATIC or ETH - to be used as Super Tokens. There are wrapper tokens for almost every major asset on every network that Superfluid is deployed, and [deploying a new wrapper contract takes less than 5 minutes](https://docs.superfluid.finance/superfluid/developers/super-tokens/deployment). It’s likely that most of your users will be using wrapper tokens.

To support wrapper tokens, you may want to allow users to wrap their existing assets in your UI. We recommend using our SDK for this as it requires just a few lines of code (an ERC20 approve and a single call on the wrapper contract - a code example is [here](https://docs.superfluid.finance/superfluid/developers/super-tokens/using-super-tokens)). You can also reference [our dashboard](https://app.superfluid.finance/wrap?upgrade) for an example of how our product team does this.

💡Note that you may also use batch calls with our SDK to bundle Superfluid operations into a single transaction. For example, you could allow users to wrap their ERC20 tokens and open a stream in a single transaction (but note that ERC20 approve() calls may not be used in batch calls). You can learn more about batching transactions [here](https://docs.superfluid.finance/superfluid/developers/batch-calls).

Pure super tokens are tokens that are deployed as super tokens from the get-go. These tokens contain all the Super Token logic directly on the canonical token contract, and do not require wrapping or unwrapping. If you’re interested in deploying a token of your own and know that it will be used heavily for Superfluid operations, we recommend that you consider deploying it as a pure super token. You can learn more about them [here](https://docs.superfluid.finance/superfluid/developers/super-tokens/super-tokens/types-of-super-tokens/pure-super-tokens).

#### **Two more important things about Super Tokens**

1\) Super Tokens always have 18 decimals as a matter of standard

2\) Wrapper super token symbols take the format of “SYMBOLx”. So Super Token ETH = ETHx. Super Token DAI = DAIx.

### Write Operations

Unless you have a very specific reason to use a smart contract for these write operations, we recommend that you use our [SDK](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations). You can find several examples of our SDK in action with front end examples [here](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/money-streaming-1), and a node module example [here](https://github.com/superfluid-finance/super-examples/blob/main/projects/tradeable-cashflow/scripts/createFlow.js).&#x20;

We have several examples like what you can find [here](../constant-flow-agreement-cfa/money-streaming-1.md) as well (although we hope you’re better front end devs than our DevX team 😄)

💡An Important Note About the Buffer: When you create a flow, 4 hours worth of the stream is temporarily deducted from the streamer’s balance. This is a security mechanism which is very important for the protocol, and it is part of the reason that users can create streams without having to lock up the full stream amount in advance. If users forget to close their stream before their token balance hits zero, then this buffer amount will be liquidated. As such, we recommend educating users about this when creating a stream. You can see an example of how we do this in our [dashboard](https://app.superfluid.finance/send):

<figure><img src="../../.gitbook/assets/image (14).png" alt="" width="375"><figcaption><p>disclosing the buffer amount - example</p></figcaption></figure>

### Getting Stream Data

There are two ways to get stream data: via our SDK and our Subgraph.If you only want to check whether a single address is streaming to you, then [our SDK](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-operations/read-methods/getflow) is the simplest way to get this data://load the token you'd like to use like this //note that tokens may be loaded by symbol or by address&#x20;

```javascript
// Some code
const daix = await sf.loadSuperToken("DAIx"); 
let flowInfo = await daix.getFlow({ 
    sender: string, 
    receiver: string, 
    providerOrSigner: ethers.providers.Provider | ethers.Signer 
});
```



But if you want to get a list of all addresses streaming to you, then [our subgraph](https://docs.superfluid.finance/superfluid/developers/subgraph#get-all-streams-for-a-given-account) is going to be best for this. This is also our recommended method for querying data on a subset of those addresses based on specific criteria (i.e. all addresses with an existing flow rate about x amount). You can workshop different subgraph queries at [console.superfluid.finance/subgraph](http://console.superfluid.finance/subgraph) and use Apollo Client or a similar framework to actually run these queries inside of your application.

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

There is more than one way to handle updates to subscriptions. However, it may be useful for you to listen for specific events that are thrown on chain when streams are created, updated, or deleted. The event you’re looking for here is the flowUpdated event.You can get flowUpdated events from our subgraph, or query them on chain if you’d like.If you want to get these events from the subgraph, then you can do so with a query like this:

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
