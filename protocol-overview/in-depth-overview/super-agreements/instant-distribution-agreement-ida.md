---
description: One transaction to distribute to any number of receivers with a fixed gas cost
---

# ✳ Instant Distribution Agreement (IDA)

## **Definition**

Recurring one-to-many distributions are hard to scale; the more receivers there are, the more transfers must be done, which runs up gas costs.&#x20;

An IDA makes one-to-many distributions scalable through a proportion model:

1\. First, a sender (called a "publisher") publishes an IDA index which will work like a channel managing how Super Tokens will move to receivers (called "subscribers").

2\. Then, the publisher can set proportions for various subscriber accounts under the IDA Index. This is done by issuing units which work like distribution shares.&#x20;

* The more units an account has relative to other receivers, the more of the distribution it will receive.&#x20;
* The information on these proportions are organized under the publisher's IDA Index within the IDA Super Agreement contract.&#x20;

3\. When Super Tokens are distributed through the IDA Index, every subscriber will instantly receive tokens _in proportion_ to the amount of units they have over the total outstanding units. This is done all at once with a fixed gas cost.

{% hint style="info" %}
**NOTE**: Instant Distribution Agreements are NOT one-and-done; they do not reset after a distribution is triggered. Each receiver's units for the index will persist across distributions, so the sender can continue to distribute through the index as many times and in various amounts as desired. A receiver's units can be increased or decreased as the sender sees fit.
{% endhint %}

## **Terminology**

* **IDA Index**: A channel created by an account (the publisher) to distribute Super Tokens to any amount of receivers on a proportional basis.&#x20;
* **Distribution**: Pulls the specified amount of Super Tokens from the sender's account and distributes them to all receivers.
* **Units**: Dictate the proportion of Super Tokens distributed through an index that a subscriber is to receive. They are effectively distribution _shares_. Receivers receive Super Tokens sent through the IDA index in proportion to the units issued to them divided by total units issued for the index.&#x20;
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
