---
description: How does Superfluid keep streams solvent? Who's job is it?
---

# 🥅 Liquidations & TOGA

## Liquidation and Solvency

When opening a stream, a user must lock a certain amount of tokens as a `buffer` or `deposit` which is taken out of their balance. By leaving their streams open for too long, they stand to lose the `buffer`. This mechanism creates the main incentive for users to close their Superfluid streams before running out of tokens. It is a user's own responsibility to close their stream.

`superApps` can also draw an `owedDeposit`, allowing them to open a stream of the same size, without needing an initial balance.&#x20;

Here's the general flow of solvency states for Super Tokens in a Constant Flow Agreement:

**1.** **Solvent**

Everyone is in good standing. The sender's balance is greater than 0. The stream flows to the receiver as expected, and there are enough tokens to back the stream.&#x20;

#### **2. Critical**

The sender's balance is now zero, and the permissions on the stream now allow anyone to close it. Until the stream is actually closed, funds are paid to the receiver's wallet using the sender's initial `buffer`.&#x20;

When the stream is closed, any remaining `buffer` is added to the `rewardAddress` (the _**TOGA**_ contract), which adds it to the current _**Patrician**_'s `stake`.

#### **3. Insolvent**

If the stream isn't closed, and the sender's deposit is completely consumed, then the insolvent period begins. The stream will continue to the receiver, however since these tokens don't actually exist in the sender's wallet, we must keep track of this `deficit` so that the Super Token itself can remain solvent within the Superfluid Protocol.

When the stream is eventually closed, the `deficit` is taken from their Stake as a slashing fee. This slashing fee is then burned, to offset the tokens created by the insolvent stream. At the same time, a reward is issued to the account closing the stream, whom we call (depending on who closes it and when) a _**Patrician**_ or a _**Pirate.**_

### Patricians and Pirates

Each token has an account called a PIC (Patrician in Charge).

Every time a stream is closed while Critical, the remaining amount of the `buffer` balance of the closed stream is taken as a reward by a Patrician.&#x20;

Every time a stream is closed while Insolvent, the Patrician is slashed, and the Pirate is rewarded as a result.&#x20;

Patricians have Priority and do the bulk of the work. Pirates must be always vigilant, and are essential in keeping the Patrician in check. Remember, a Pirate can be rewarded for closing streams that Patricians _miss_.

### TOGA - Transparent OnGoing Auction

PICs have a strong incentive to close streams as soon as possible, since they earn the remaining balance of the sender's deposit. Technically, anyone can close stream during the Critical or Insolvent states, however rewards are added to the Patrician's `stake`.

To become a PIC for a token, aspiring Patricians must post a `stake` to the TOGA contract, in the token they are trying to become a PIC for. If the new `stake` is higher than the existing `stake`, the new Patrician becomes the PIC, and the previous Patrician gets their `stake` back.&#x20;

PICs can't remove their `stake` at will through a single transaction, but rather, they have to specify an `exitRate`, which defines the flowrate of a Stream to their account. The `exitRate` is also not completely arbitrary, it has be long enough to keep the `stake` above zero for at least a week.

All liquidation rewards are added to the `stake`.&#x20;

The TOGA contract leverages the ERC777 callbacks, so you can become the PIC by simply sending a regular transfer to the right contract address! In this case, the `exitRate` will be set at the default rate.

Check out the [network directory](../protocol-developers/networks/#mainnet-networks) for the **** contract address on different networks.

### Current Parameters

{% tabs %}
{% tab title="Polygon" %}
#### Deposit

4 hour `deposit`

4 hour maximum `owedDeposit`

#### TOGA

1 week minimum `exitPeriod`

4 week default `exitPeriod`
{% endtab %}

{% tab title="xDAI" %}
#### Deposit

4 hour `deposit`

4 hour maximum `owedDeposit`

#### TOGA

1 week minimum `exitPeriod`

4 week default `exitPeriod`
{% endtab %}

{% tab title="Testnets" %}
#### Deposit

1 hour `deposit`

1 hour maximum `owedDeposit`

#### TOGA

1 week minimum `exitPeriod`

4 week default `exitPeriod`
{% endtab %}
{% endtabs %}

These parameters can be changed by Governance decision. Previously established `deposit` for Constant Flow Agreements is _grandFathered,_ so future changes can't impact existing agreements.&#x20;

The TOGA contract is set as the `rewardAddress` in the Superfluid host. The `rewardAddress` may be changed to a different address. Every SuperToken may have a different `rewardAddress`, so it's possible that different SuperTokens have different implementations.

