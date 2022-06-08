---
description: Create an index and distribute tokens using the Superfluid Core-SDK
---

# ⚡ Instant Distribution

## Introduction

Let's take a look at another Superfluid Agreement - the **Instant Distribution Agreement (IDA).** This agreement can be used to make one-time-payments to multiple recipients. The IDA is great way to implement a revenue sharing system or issue airdrops. It consists of a **Publishing Index** with `indexId`, an `indexValue`, and one or more **subscribers** who receive varying amounts of `units` within the Index.

{% hint style="info" %}
NOTE: we recommend using the [Superfluid Console](https://console.superfluid.finance) and the [Superfluid Dashboard](https://app.superfluid.finance) as you go through these interactive tutorials. They'll help you view your IDA interactions.
{% endhint %}

### Create an Index

Creating an index will allow you to get started with the IDA. You can use the below example to generate an index ID which can be used in the next 2 steps. Click the button below to create your index, then open up the console to see your randomly generated index ID.

{% embed url="https://codesandbox.io/embed/ida-walkthrough-createpool-l32ud?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FCreateIndex.js&theme=dark&view=split" %}
Create an index
{% endembed %}

### Update Your Index By Issuing Units

Once you've created an index, you can issue units to new `subscribers`. You can think of '`units`' as shares within a pool. In the next step, we'll distribute funds to the entire index, which will send a portion of the total amount distributed to each `subscriber`, depending on how many shares each `subscriber` has.

Enter your index ID, a subscriber address, and a number of shares (units) to give your subscriber, then click the button to update your index.

{% embed url="https://codesandbox.io/embed/ida-walkthrough-updateindex-4yrbi?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpdateSubscription.js&theme=dark&view=split" %}
Update subscriptions
{% endembed %}

### Distribute Funds to Your Index

Finally, we can send funds to our index. Enter an amount below in wei, and click the Distribute button to send funds. If you own the address of one of your subscribers, you can visit the 'Distributions' tab in the Superfluid dashboard to approve the subscription & claim that subscriber's portion of the distribution.

The Superfluid protocol is essentially dividing the total amount of funds sent via the distribution according to the amount of units each subscriber holds. You can think of it as similar to shareholders of a company receiving a dividend payment in proportion to the number of shares owned.

{% embed url="https://codesandbox.io/embed/ida-walkthrough-distribute-6li4t?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FDistributeFunds.js&theme=dark&view=split" %}
Distribute funds
{% endembed %}

Thats it! One thing to keep in mind - for a recipient's balance to reflect the distribution event, they should first call `approveSubscription` one time. If they fail to do this, don't worry, they can still receive their tokens after calling the `claim` function at any time.

If you used an address you have access to in the above tutorial, you can see this process in action by visiting the 'Distributions' tab in the [Superfluid dashboard](https://app.superfluid.finance/dashboard) after distributing funds. While there, you'll see the option to either 'approve subscription' or 'claim' previously distributed funds
