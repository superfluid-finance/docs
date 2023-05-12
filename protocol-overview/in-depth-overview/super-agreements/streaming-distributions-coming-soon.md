---
description: The General Distribution Agreement
---

# 🌊 Streaming Distributions \[Coming Soon]

The Superfluid Protocol team also has a groundbreaking new agreement that is currently in development: the General Distribution Agreement (GDA). The GDA will enhance the current [Instant Distribution Agreement (IDA)](instant-distribution-agreement-ida.md) to allow for one-to-many Superfluid streaming distributions, becoming most scalable way to distribute recurring funds to a large set of recipients in web3.

Like the IDA, the GDA will function with an index, and allow publishers to give units to subscribers within that index. The key difference will be that, instead of having a function which distributes tokens in discrete amounts, publishers will be able to start streaming funds to all subscribers or update the total amount that is being streamed.

Flow rates for each subscriber will be calculated based on the total proportion of units they hold within the index, and they’ll be updated automatically in a single transaction if the publisher’s flow rate is modified. Here’s how it will work 👇

1. First, a sender (called a `publisher`) will create a GDA index which works like a channel setting out how funds will be distributed to all receivers (called `subscribers`) in ongoing streams. The channel can be thought of like ‘piping’ that will be used to stream funds to each subscriber second by second.
2. Then, the publisher can set proportions for various subscriber accounts under the GDA Index. This is done by issuing units to the index which work like distribution shares. The more units an account has relative to other receivers, the bigger proportion of the total streaming distribution it will receive.
3. When the publisher calls `createDistributionFlow()` (function name still TBD), every subscriber will start receiving a stream with a flow rate _proportional_ to the amount of units they have over the total outstanding units. Regardless of the amount of recipients, the gas cost paid by the sender to create/update/delete this flow will remain fixed.

**Check out these early mockup diagrams for more details:**

### GDA Basics

This diagram outlines the flow of a standard GDA. One publisher (left) distributes funds to an index of subscribers with different units (right) via money streams. Note that creating this stream to`n` subscribers will only take a single transaction.

*

    <figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.22.13 AM.png" alt=""><figcaption></figcaption></figure>

### Changing Unit Counts

This diagram shows the case where the publisher updates unit counts. This changes the flow rate of every other subscriber instantly - all in a single transaction. Note that you can use batch calls to change large numbers of units in a single transaction.

<figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.25.33 AM.png" alt=""><figcaption></figcaption></figure>

### Changing the Flow Rate

This final diagram outlines the case where the publisher updates the GDA flow rate. This changes the flow rate of every subscriber instantly - all in a single transaction.

<figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.26.18 AM.png" alt=""><figcaption></figcaption></figure>
