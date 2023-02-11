---
description: Scalable one-to-many distributions
---

# ✳ Distributions (IDA)

## What is the IDA?

Recurring one-to-many distributions are hard to scale; the more receivers there are, the more transfers must be done, which runs up gas costs.

The Instant Distribution Agreement (IDA) makes recurring one-to-many distributions scalable. It does so by letting a sending account assign proportions to many receiving accounts and distribute tokens to them on the basis of the set proportions in a single transaction at a fixed gas cost. Here's how it works 👇

1\. First, a sender (called a "publisher") publishes an IDA index which will work like a channel organizing how Super Tokens will proportionally distribute to receivers (called "subscribers").

2\. Then, the publisher can set proportions for various subscriber accounts under the IDA Index. This is done by issuing units to the IDA Index which work like distribution shares. The more units an account has relative to other receivers, the more it will receive of each distribution.

{% hint style="info" %}
**NOTE:** When working within solidity, precision errors can happen when the result of a division operation is not a whole number. In the case of the IDA, these precision errors rear their head with _very small distribution values_ and _really large unit values._ However, keep in mind that there is a tradeoff: if you keep the total amount of units too low, then this prevents you from maintaining a flexible ratio between members of a pool.

In most cases, it's unlikely that your distribution values will be low enough to cause problems (because super tokens have 18 trailing decimals anyway). However, there _is_ a chance that you will run into problems with unit values which are too small or too large.

You want units small enough to avoid precision errors while still being accurate. Our recommendation is to use somewhere between 7 and 9 trailing decimals for your IDA unit values. For example, if you have an index that is to be split into thirds, break it up like so:

`subscriber1 = 100000000`

`subscriber2 = 100000000`

`subscriber3 = 100000000`

`totalUnits = 300000000`
{% endhint %}



3\. When Super Tokens are distributed through the IDA Index, every subscriber will instantly receive tokens _in proportion_ to the amount of units they have over the total outstanding units. This is done all at once with a fixed gas cost.

{% hint style="info" %}
**NOTE**: Instant Distribution Agreements are NOT one-and-done; they do not reset after a distribution is triggered. Each receiver's units for the index will persist across distributions, so the sender can continue to distribute through the index as many times and in various amounts as desired. A receiver's units can be increased or decreased as the sender sees fit.
{% endhint %}

**This section will show you how to develop code that interacts with the IDA. For something more conceptual, check out this simple conceptual breakdown** 👇

{% content-ref url="../../protocol-overview/in-depth-overview/super-agreements/instant-distribution-agreement-ida.md" %}
[instant-distribution-agreement-ida.md](../../protocol-overview/in-depth-overview/super-agreements/instant-distribution-agreement-ida.md)
{% endcontent-ref %}
