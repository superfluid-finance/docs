---
description: Supporting IDA Operations in Your App
---

# Supporting Instant Distributions

{% hint style="info" %}
You can learn more about the IDA [here](../../../developers/instant-distribution-agreement-ida/).
{% endhint %}

The instant distribution agreement (IDA) allows users to send one-to-many transfers in a scalable way with a single transaction. The IDA allows a `publisher` to create an `index`, and grant `units` of this index to `subscribers`. Once units are given, a publisher can `distribute` a number of super tokens to the index. These super tokens will be automatically distributed to each subscriber in amounts that are proportional to the number of units each subscriber has been granted relative to the total number of outstanding units.

After funds are distributed, subscribers can call `claim()` to receive all tokens distributed to them so far through that index. Calling `approveSubscription()` will give a user all funds distributed so far, and will allow them to automatically receive all funds distributed in the future.
