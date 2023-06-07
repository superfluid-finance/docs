---
description: The General Distribution Agreement
---

# 🌊 Streaming Distributions

The Superfluid Protocol team also has a groundbreaking new agreement that is currently in development: the General Distribution Agreement (GDA). The GDA introduces a new primitive which enables one-to-many Superfluid streaming distributions, becoming most scalable way to distribute recurring funds to a large set of recipients in web3.

{% hint style="info" %}

{% endhint %}

The GDA will allow anyone to create a **pool** and to give units within that pool to any non-pool address. These accounts which are given units within the pool will be called **pool members**. This is similar to the IDA's function with indexes & subscribers, with the key difference being that, instead of only having a function which distributes tokens in discrete amounts, **distributors** (any account who wants to stream to a pool) will be able to start streaming funds to all pool members or update the total amount that is being streamed.

Flow rates for each member will be calculated based on the total proportion of units they hold within the pool, and they'll be updated automatically in a single transaction if the pool's flow rate or the members' units are modified. Here’s how it will work 👇

1. First, an account (called a `pool admin`) will create a GDA pool which will act as a 'channel' between the distributors of funds & future stream recipients (called `pool members`). The channel can be thought of like ‘piping’ that will be used to stream funds to each subscriber every single second.
2. Then, the pool admin can set proportions for various member accounts under the GDA pool. This is done by issuing units to members which work like distribution shares. The more units an account has relative to other receivers, the bigger proportion of the total streaming distribution it will receive.
3. Any account has the ability to create/update/delete their own streams to the pool (all distributor streams to a given pool are essentially aggregated together). When a distributor calls `createDistributionFlow()` (function name still TBD), every connected pool member will start receiving a stream with a flow rate _proportional_ to the amount of units they have over the total outstanding units. Regardless of the amount of recipients, the gas cost paid by the distributor to create/update/delete this flow will remain fixed.

**Check out these early mockup diagrams for more details:**

### GDA Basics

This diagram outlines the flow of a standard GDA. A distributor (left) distributes funds to a pool with different units (right) via money streams. Note that creating this stream to`n` members will only take a single transaction.

*

    <figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.22.13 AM.png" alt=""><figcaption></figcaption></figure>

### Changing Unit Counts

This diagram shows the case where a distributor updates unit counts. This changes the flow rate of every other member instantly - all in a single transaction. Note that you can use batch calls to change large numbers of units in a single transaction.

<figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.25.33 AM.png" alt=""><figcaption></figcaption></figure>

### Changing the Flow Rate

This final diagram outlines the case where a distributor updates the GDA flow rate. This changes the flow rate of every member instantly - all in a single transaction.

<figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.26.18 AM.png" alt=""><figcaption></figcaption></figure>

### Handling Odd Numbers with the Adjustment Flow Rate

The GDA manages for scenarios in which there is a remainder in the amount of tokens to be sent to the pool because solidity does not allow for floating point arithmetic. This is done with an **adjustment flow rate** which is sent to the pool admin, and is best explained via an example:

Alice creates a pool and assigns 3 units each to Bob, Carol and Dave. Alice's pool has 9 total units. She then does a flow distribution of 100 DAIx/second. The issue here is that 100 / 9 is not fully divisible. Therefore, an adjustment flow is required. The adjustment flow rate handles the cases where the desired flow rate is not divisible by the total number of units. In the case of Alice's pool, the flow rate that will be sent to the members is 99/s and 1/s will be the adjustment flow rate. This adjustment flow rate will always go to the admin (creator) of the pool.

{% hint style="info" %}
The GDA is currently available on select testnets - see [Contract Addresses](../../../developers/networks.md). We are in the process of solidifying its security and developer experience.
{% endhint %}
