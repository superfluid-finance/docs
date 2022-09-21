---
description: Automatically maintain your Super Token balance to keep your streams going
---

# Auto Top Up

## What's Auto Top Up?

Your Superfluid stream will continue until you cancel it yourself or your Super Token balance reaches zero. Upon reaching zero, you face [liquidation](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa#buffer) causing the loss of your 4-hour buffer.

So, if your Super Token balance is approaching zero but you want your stream to continue, you'll want to _top-up_ your Super Token balance to avoid ending your streams and liquidation. That's where Auto Top Up comes in!

The Auto Top Up Protocol is an automated top-up service. When your Super Token balance reaches a certain lower threshold, Auto Top Up steps in and converts some or your tokens into the needed Super Token on your behalf. This replenishes your Super Token balance to keep your streams going.

## Basic Structuring

<figure><img src="../../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

### **The Auto Top Up Protocol consists of 2 main parts:**

The **Auto Top Up Manager** contract, which lets you:

* Set up your Auto Top Up service
* View if an account is in need of topping up - utilized by off-chain keepers
* Call the top up on the account - utilized by off-chain keepers

{% content-ref url="auto-top-up-manager.md" %}
[auto-top-up-manager.md](auto-top-up-manager.md)
{% endcontent-ref %}

The **Strategy** contract is the contract that actually pulls tokens from your account to perform the topping up (hence you have to approve it to spend your tokens for the Auto Top Up to work).

It specifies how your account is to be topped up. It contains the top up functionality and is called exclusively upon by the Auto Top Up Manager contract.

{% content-ref url="strategies.md" %}
[strategies.md](strategies.md)
{% endcontent-ref %}

### Set Up an Auto Top Up!

After reading through the docs, check out our step-by-step guide on setting up your Auto Top Up

{% content-ref url="setting-up.md" %}
[setting-up.md](setting-up.md)
{% endcontent-ref %}
