---
description: Getting Started with the Constant Flow Agreement
---

# Frontend Examples

Let's walk through creating Superfluid streams using the Superfluid SDK Core. We'll get straight into the code with some examples, but you can scroll down to learn about how the SDK works in more detail.

{% hint style="info" %}
We recommend using the [Superfluid Console](https://console.superfluid.finance) and the [Superfluid Dashboard](https://app.superfluid.finance) as you go through these interactive tutorials. They'll help you view your streams in action.

Also, these examples require Mumbai MATIC and test super tokens. You can get some from our faucet [here](../super-tokens/super-token-faucet.md).
{% endhint %}

Within each example, you'll see that we're importing the Superfluid SDK in each key component, then initializing the SDK using the following logic:

```javascript
// initialization of the core SDK

const sf = await Framework.create({ 
   chainId: Number, 
   provider: ethersProvider 
});
```

Here we're using a `web3Provider` (i.e. a Metamask connection in the browser) instead of an RPC URL for our `provider`.

## Creating a Flow

{% embed url="https://codesandbox.io/embed/cfa-createflow-metamask-i3fo4?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FCreateFlow.js&theme=dark&view=split" %}

## Updating a Flow

{% embed url="https://codesandbox.io/embed/cfa-updateflow-metamask-9hbw8y?fontsize=14&hidenavigation=1&theme=dark&view=split" %}

## Deleting a Flow

{% embed url="https://codesandbox.io/embed/cfa-deleteflow-metamask-3mio8c?fontsize=14&hidenavigation=1&module=/src/DeleteFlow.js&theme=dark&view=split" %}

## Updating Flow Permissions

Modify permissions of an account to manage streams on your behalf.

{% embed url="https://codesandbox.io/embed/updateflowpermissions-example-3k8hor?fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpdateFlowPermissions.js&theme=dark&view=split" %}
Updating flow permissions
{% endembed %}

## Create Flow with Operator Permissions

{% embed url="https://codesandbox.io/embed/create-flow-as-operator-nv607c?fontsize=14&hidenavigation=1&module=%2Fsrc%2FCreateFlowAsOperator.js&theme=dark&view=split" %}
Creating a flow as an operator
{% endembed %}

## Update Flow with Operator Permissions

{% embed url="https://codesandbox.io/embed/update-flow-as-operator-xceyyz?fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpdateFlowAsOperator.js&theme=dark&view=split" %}
Updating a flow as an operator
{% endembed %}

## Delete Flow with Operator Permissions

{% embed url="https://codesandbox.io/embed/delete-flow-as-operator-rfk6pd?fontsize=14&hidenavigation=1&module=%2Fsrc%2FDeleteFlowAsOperator.js&theme=dark&view=split" %}
Deleting a flow as an operator
{% endembed %}

## Calculating Flow Rates

The flow rate is the # of tokens you'd like to send per second, denominated in wei. You can use the calculator below to get the flow rate for an amount of tokens you want to send per month. You can pass this calculated flow rate into the examples above to create & update your streams.

{% embed url="https://codesandbox.io/embed/flowratecalc-8h8ksz?fontsize=12&hidenavigation=1&theme=dark&view=preview" %}
