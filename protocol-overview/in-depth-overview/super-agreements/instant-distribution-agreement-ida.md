---
description: One transaction to distribute to any number of receivers with a fixed gas cost
---

# ✳ Instant Distribution Agreement (IDA)

## **Definition**

Recurring one-to-many distributions are hard to scale; the more receivers there are, the more transfers must be done, which runs up gas costs.

An IDA makes recurring one-to-many distributions scalable. It does so by letting a sending account assign proportions to many receiving accounts and distribute tokens to them on the basis of the set proportions in a single transaction at a fixed gas cost. Here's how it works 👇

1\. First, a sender (called a "publisher") publishes an IDA index which will work like a channel organizing how Super Tokens will proportionally distribute to receivers (called "subscribers").

2\. Then, the publisher can set proportions for various subscriber accounts under the IDA Index. This is done by issuing units to the IDA Index which work like distribution shares. The more units an account has relative to other receivers, the more it will receive of each distribution.

3\. When Super Tokens are distributed through the IDA Index, every subscriber will instantly receive tokens _in proportion_ to the amount of units they have over the total outstanding units. This is done all at once with a fixed gas cost.

{% hint style="info" %}
**NOTE**: Instant Distribution Agreements are NOT one-and-done; they do not reset after a distribution is triggered. Each receiver's units for the index will persist across distributions, so the sender can continue to distribute through the index as many times and in various amounts as desired. A receiver's units can be increased or decreased as the sender sees fit.
{% endhint %}

## **Terminology**

* **IDA Index**: A channel made by a publisher account to distribute Super Tokens to any amount of receivers on a proportional basis.
* **Distribution**: Pulls the specified amount of Super Tokens from the sender's account and distributes them to all receivers.
* **Units**: Dictate the proportion of Super Tokens distributed through an index that a subscriber is to receive. They work like distribution _shares_. Receivers get Super Tokens sent through the IDA index in proportion to the units issued to them divided by total units issued for the index.&#x20;
* **Publisher**: The sender. Creates the IDA index and issues units to receivers
* **Subscribers**: The receivers. Accounts that are given units to an IDA index and are able to receive Super Tokens distributed through it.

## **Computation**

After publishing an index, a publisher can begin issuing units to subscribers. A subscriber's share of Super Tokens distributed through the index is equal to amount of shares owned divided by total amount of shares issued.

![](<../../../.gitbook/assets/image (77).png>)

When a distribution is called, the publisher's Super Token balance falls by the total distribution amount while the receivers' balances rise by the transfer amount multiplied by the fraction of the total outstanding distribution shares they each respectively own.

![](<../../../.gitbook/assets/image (46).png>)

## **Formula**:

Calculating the current balance of an account subscribed to one or many IDA Indices.&#x20;

![](<../../../.gitbook/assets/image (56).png>)

{% hint style="info" %}
**NOTE:** Accounts are not limited to publishing one index; they are able to concurrently own and utilize multiple indices, each with their own unique subscriber proportions. Likewise, subscribers can be subscribed to multiple indices at once.
{% endhint %}

## **Example - Account A's IDA Index**

**1. Account A publishes an IDA Index**

**2. Account A issue's **_**5**_** units to Account X, **_**10**_** units Account Y, and **_**15**_** units to Account Z.**

![](<../../../.gitbook/assets/image (55).png>)

**3. Account A distributes 500 USDCx through the IDA Index**

![](<../../../.gitbook/assets/image (51).png>)

**4. Account A updates Account Z to **_**10**_** units**

![](<../../../.gitbook/assets/image (34).png>)

**5. Account A distributes 500 USDCx through the IDA Index**

![](<../../../.gitbook/assets/image (73).png>)

##
