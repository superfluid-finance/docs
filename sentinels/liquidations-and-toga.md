---
description: How does Superfluid keep streams solvent? Who's job is it?
---

# 🥅 Liquidations & TOGA

## Liquidation and Solvency

When opening a stream, a user must lock a certain amount of tokens as a `buffer` or `deposit` which is taken out of their balance. By leaving their streams open for too long, they stand to lose the `buffer`. This mechanism creates the main incentive for users to close their Superfluid streams before running out of tokens. It is a user's own responsibility to close their stream.

`superApps` can also draw an `owedDeposit`, allowing them to open a stream of the same size, without needing an initial balance.

Here's the general flow of solvency states for Super Tokens in a Constant Flow Agreement:

#### 1. Solvent

Everyone is in good standing. The sender's balance is greater than 0. The stream flows to the receiver as expected, and there are enough tokens to back the stream.

#### 2. Critical

The sender's balance is now zero, and the permissions on the stream now allow anyone to close it. Until the stream is actually closed, funds are paid to the receiver's wallet using the sender's initial `buffer`.

The critical period is subdivided into 2 sub-periods:\
a) _**Patrician Period**_: starts when the stream becomes critical (duration defined as governance parameter)\
b) _**Plebs Period**_: spans the remaining timeframe until the stream becomes insolvent

When the stream is closed, any remaining `buffer` is taken and assigned/distributed either to the _**PIC**_ or a _**Pleb**_.\
If the stream is closed during the Plebs Period, we call the account closing the stream a Pleb.

#### 3. Insolvent

If the stream isn't closed, and the sender's deposit is completely consumed, then the insolvent period begins. The stream will continue to the receiver, however since these tokens don't actually exist in the sender's wallet, we must keep track of this `deficit` so that the Super Token itself can remain solvent within the Superfluid Protocol.\
We also call this open ended timeframe the _**Pirate Period**_.

When the stream is eventually closed, the `deficit` is taken from the PICs stake as a slashing fee. This slashing fee is then burned, to offset the tokens created by the insolvent stream. Additionally, a reward equal in amount to the `buffer` amount before its consumption is issued to the account closing the stream, whom we call a _**Pirate.**_. This reward is also detracted from the PICs stake.

![](https://lh6.googleusercontent.com/X7ShIBo-weuUDIVwxj4Klj0VNy0PNP7ajC9zNC9WxiCOMkPDfhjpK4YpNJQ8i1Oor2OjDYzxr1493JxtCU4ycHwU7lZ9rRkiwm4mRQEA9xTDybxd4WXht3JW95U6qEqEvSHA60zi)

### Patricians, Plebs and Pirates (3Ps)

Each token has an account called a _**PIC (Patrician in Charge)**_.

Every time a stream is closed while Critical during the Patrician Period, the remaining amount of the `buffer` balance of the closed stream is taken and added to the PICs stake as a reward.

Every time a stream is closed while Critical during the Plebs Period, the remaining buffer is rewarded to the Pleb.

Every time a stream is closed while Insolvent, the PIC is slashed, and the Pirate is rewarded with the full buffer amount.

The monopoly on rewards during the Patrician Period gives PICs an incentive to make sure streams are closed during that timeframe.\
They can set up one or multiple redundant instances of the [superfluid-sentinel](https://github.com/superfluid-finance/superfluid-sentinel) (and/or other mechanisms for closing streams) to ensure this. Note that the PIC account is not needed (not in a _hot wallet_) for this operations as the rewards incurred during the patrician period will be added to the PIC stake regardless of transaction sender.

Plebs act as a fallback in case PICs fail to do their job despite of the incentives.\
The earlier in the Pleb Period a Pleb closes the stream, the more buffer there's left as a reward.

Unlike the PIC, individual Plebs and Pirates don't have a monopoly. Whoever manages to get a stream closing transaction included first during the Plebs / Pirate Period, gets the reward.

Patrician, Pleb and Pirate are roles which map to accounts in specific circumstances.\
The same account could have any of those roles in the context of various stream closing transactions, defined by the timing of that transaction and the state of the TOGA contract (list of PICs) at the time of transaction execution. The reference sentinel implementation provides configuration options influencing that behaviour and timing of transactions.

Note that thanks to this flexible roles model, PICs have an incentive to close streams even after missing the Patrician Period:

1. they can still get rewards, essentially acting as a Pleb or Pirate in the context of that transaction
2. due to the slashing of the `deficit` from their stake, their incentive to close insolvent streams grows linearly over time

### TOGA - Transparent OnGoing Auction

Since the role of a PIC comes with a monopoly on rewards incurred during the Patrician Period, a fair mechanism for assigning this role is needed. Such a mechanism is provided by the TOGA.

To become a PIC for a token, aspiring Patricians must post a `stake` to the TOGA contract, in the token they are trying to become a PIC for. If the new `stake` is higher than the existing `stake`, the new Patrician becomes the PIC, and the previous Patrician gets their current `stake` back.

PICs can't remove their `stake` at will through a single transaction, but rather, they have to specify an `exitRate`, which defines the flowrate of a Stream to their account. The `exitRate` is also not completely arbitrary, it is limited such that the `stake` will remain above zero for at least a week.

All liquidation rewards are added to the `stake`, thus - depending on the exitRate set by the PIC and the number of size of streams becoming critical - the stake of a PIC could shrink, grow or stay the same over time. (The maximum allowed `exitRate` is calculated based on the worst case of no rewards being added during that timeframe.)

In order to become the PIC, you can either use the Dapp at https://toga.superfluid.finance/ or use `ERC777.send()` to post the desired stake to the TOGA contract - optinally with an `exitRate` set in the `data` parameter if you don't like the default `exitRate`. The TOGA contract implements an ERC777 callback for the auction mechanism.

**!! CAUTION !!** Do NOT use `ERC20.transfer()` for TOGA bids, because those may not trigger the needed callback in the future.

Check out the [network directory](../protocol-developers/networks/#mainnet-networks) for the TOGA contract address on different networks.

### Current Parameters

{% tabs %}
{% tab title="Polygon" %}
**Deposit**

4 hour `deposit`

4 hour maximum `owedDeposit`

30 minutes `patrician period`

**TOGA**

1 week minimum `exitPeriod`

4 week default `exitPeriod`
{% endtab %}

{% tab title="Gnosis Chain" %}
**Deposit**

4 hour `deposit`

4 hour maximum `owedDeposit`

30 minutes `patrician period`

**TOGA**

1 week minimum `exitPeriod`

4 week default `exitPeriod`
{% endtab %}

{% tab title="Goerli" %}
**Deposit**

1 hour `deposit`

1 hour maximum `owedDeposit`

12 minutes `patrician period`

**TOGA**

1 week minimum `exitPeriod`

4 week default `exitPeriod`
{% endtab %}
{% endtabs %}

These parameters can be changed by Governance decision. Previously established `deposit` for Constant Flow Agreements is _grandFathered,_ so future changes can't impact existing agreements.

The TOGA contract is set as the `rewardAddress` in the Superfluid host. The `rewardAddress` may be changed to a different address. Every SuperToken may have a different `rewardAddress`, so it's possible that different SuperTokens have different implementations.
