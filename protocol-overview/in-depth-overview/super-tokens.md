---
description: Tokens that possess Superfluid functionality
---

# Super Tokens

## Definition

We usually experience on-chain value transfer is through the ERC20 token. ERC20 contracts work like bank balances, moving value through discrete lump transfers (i.e. my balance goes down "X" amount and your balance goes up "X" amount).

The Super Token is a new extension of the ERC20 token standard that plugs into the Superfluid Protocol to include Super Agreement abilities. These Super Agreements allow Super Tokens to be transferred in novel ways such as in streams or instant distributions. Super Tokens come in two forms: **wrapper** and **custom.**

{% hint style="info" %}
Super Tokens can do everything that a traditional ERC20 token can PLUS new modes of value transfer enabled by Superfluid (i.e., money streaming)
{% endhint %}

## **Real-Time Balance**

The real-time balance technique is what lets Super Tokens keep track of an accounts balance across changes caused by both discrete lump transfers and Super Agreements. An account's actual current Super Token balance is the sum of its **static balance** and its **real-time balances**.&#x20;

* Static Balance: balance figure that is affected by basic lump transfers (the usual ERC20 stuff)
* Real-Time Balances: you can think of real-time balances as the individual impact that each Super Agreement has on an accounts balance. That impact can either be positive or negative.

By combining these two parts, we can get an account's actual current balance.

> Current Balance = Real-Time Balances<mark style="color:green;">**\***</mark> + Static Balance

<mark style="color:green;">**\***</mark> Bear in mind that there are multiple Super Agreements ([CFA](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa) and [IDA](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/instant-distribution-agreement-ida)) each with their own real-time balances. So to arrive at the current balance, the real-time balance for each one is added to the static balance.&#x20;

{% hint style="info" %}
Because ERC20 tokens lack the real-time balance ability, they can't be moved through other Super Agreements (like money streams)
{% endhint %}

**Example**&#x20;

* Account A's Static Balance: 1,000 USDCx
* Account A has an active CFA stream going that has streamed out 100 USDCx so far.
  * CFA Real-Time Balance = <mark style="color:red;">-100</mark> USDCx
* Account A has received 200 USDCx through IDA distributions.
  * IDA Real-Time Balance = <mark style="color:green;">+200</mark> USDCx

> Current Balance = 1000 + <mark style="color:red;">-100</mark> + <mark style="color:green;">200 =</mark> **1100 USDCx**

### **Wrapper**

A wrapper Super Token token is an _existing underlying token_ that's been wrapped to gain Super Agreement functionality.&#x20;

**Wrapping and Unwrapping**

When getting wrapper Super Tokens, you first deposit the underlying tokens into its wrapper Super Token contract after which you are minted an equal quantity of wrapper Super Tokens. Basically, you gave up the plain underlying token and got the "Super Token version" of it.&#x20;

To unwrap, the opposite happens; a desired amount of Super Tokens are burned and an equal amount of the underlying token is returned.

**Example**

![](<../../.gitbook/assets/image (37).png>)

### Custom

Custom Super Tokens don't have an underlying token. They exist only as Super Tokens so there is no wrapping or unwrapping required. Custom Super Tokens are deployed directly as Super Tokens with all of the associated Superfluid functionality out of the box. These tokens inherently have all the functionality of a basic ERC20 token plus Superfluid's Super Agreement abilities.

**Example**

$RIC is a governance token deployed by [Ricochet DAO](https://ricochet.exchange/), a community building Superfluid-powered investment tools. Knowing that they would be heavily using Super Agreements (money streaming and instant distributions) on $RIC, they chose to deploy it directly as a Custom Super Token, rather than a plain ERC20 with an accompanying Wrapper Super Token.

![](<../../.gitbook/assets/image (52).png>)
