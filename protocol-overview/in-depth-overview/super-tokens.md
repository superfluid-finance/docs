---
description: Tokens that possess Superfluid functionality
---

# Super Tokens

## Definition

The most common way of experiencing on-chain balance transfer is through the ERC20 token. These token contracts function like bank balances with the movement of value accomplished through discrete lump transfers.

The Super Token is a new extension of the ERC20 token standard that plugs into the Superfluid Protocol to include Super Agreement functionality. These Super Agreements allow Super Tokens to engage in powerful and innovative ways of value transfer engineered in the Superfluid Protocol. Super Tokens come in two forms: **wrapper** and **custom.**

{% hint style="info" %}
**NOTE**: Super Tokens can do everything that a traditional ERC20 token can PLUS new modes of value transfer enabled by Superfluid (i.e., money streaming)
{% endhint %}

### **Real-Time Balance**

Super Tokens account for their balance by adding real-time balances to a plain static balance. The static balance accounts for balance changes from basic lump transfers while the real-time balances account for the balance changes from each Super Agreement. By combining these two parts, we can get an account's actual current balance.

> Current Balance = Real-Time Balances<mark style="color:green;">**\***</mark> + Static Balance

<mark style="color:green;">**\***</mark> Bear in mind that there are multiple Super Agreements (Constant Flow and Instant Distribution) each with their own real-time balances. So to arrive at the current balance, the real-time balance for each one is added to the static balance.

### **Wrapper**

A wrapper Super Token token represents an _existing underlying token_ that has been wrapped to enable Super Agreement functionality.&#x20;

**Wrapping and Unwrapping**

When acquiring wrapper Super Tokens, one must deposit the underlying token into the wrapper Super Token contract after which they are minted an equivalent quantity of wrapped Super Tokens. The underlying token has effectively been wrapped into a Super Token version of itself.

To unwrap, the opposite occurs and Super Tokens are burned and the equivalent quantity of the underlying token is returned.

**Example**

![](<../../.gitbook/assets/image (37).png>)

### Custom

Custom Super Tokens do not have an underlying token. They exist only as Super Tokens so there is no wrapping or unwrapping required. Custom Super Tokens are deployed directly as Super Tokens with all of the associated Superfluid functionality out of the box. These tokens inherently have all the functionality of a basic ERC20 token as well as Superfluid's Super Agreement functionality.

**Example**

$RIC is a governance token deployed by [Ricochet DAO](https://ricochet.exchange/), a community building Superfluid-powered investment tools. Knowing that they would be heavily using Super Agreements (money streaming and instant distributions) on $RIC, they chose to deploy it directly as a Custom Super Token, rather than a plain ERC20 with an accompanying Wrapper Super Token.

![](<../../.gitbook/assets/image (52).png>)
