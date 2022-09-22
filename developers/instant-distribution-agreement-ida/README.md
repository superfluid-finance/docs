---
description: Scalable one-to-many distributions
---

# ✳ Instant Distribution Agreement (IDA)

## What is the IDA?

Recurring one-to-many distributions are hard to scale; the more receivers there are, the more transfers must be done, which runs up gas costs.

The Instant Distribution Agreement (IDA) makes recurring one-to-many distributions scalable. It does so by letting a sending account assign proportions to many receiving accounts and distribute tokens to them on the basis of the set proportions in a single transaction at a fixed gas cost. Here's how it works 👇

1\. First, a sender (called a "publisher") publishes an IDA index which will work like a channel organizing how Super Tokens will proportionally distribute to receivers (called "subscribers").

2\. Then, the publisher can set proportions for various subscriber accounts under the IDA Index. This is done by issuing units to the IDA Index which work like distribution shares. The more units an account has relative to other receivers, the more it will receive of each distribution.

3\. When Super Tokens are distributed through the IDA Index, every subscriber will instantly receive tokens _in proportion_ to the amount of units they have over the total outstanding units. This is done all at once with a fixed gas cost.

{% hint style="info" %}
**NOTE**: Instant Distribution Agreements are NOT one-and-done; they do not reset after a distribution is triggered. Each receiver's units for the index will persist across distributions, so the sender can continue to distribute through the index as many times and in various amounts as desired. A receiver's units can be increased or decreased as the sender sees fit.
{% endhint %}

**This section will show you how to develop code that interacts with the IDA. For something more conceptual, check out this simple conceptual breakdown** 👇

{% content-ref url="../../protocol-overview/in-depth-overview/super-agreements/instant-distribution-agreement-ida.md" %}
[instant-distribution-agreement-ida.md](../../protocol-overview/in-depth-overview/super-agreements/instant-distribution-agreement-ida.md)
{% endcontent-ref %}
