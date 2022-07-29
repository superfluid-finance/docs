---
description: Lets you stream tokens
---

# 🚰 Constant Flow Agreement (CFA)

## Definition

The Constant Flow Agreement lets you stream money! What do we mean by streaming? Streaming is a constant by-the-second movement of tokens from a sending account to a receiving account. In a CFA, the sender agrees to have its account balance reduce at a certain per-second rate—called the flow rate—and the receiving party's account balance increase at that flow rate. A stream is perpetual and will continue until the sender decides to cancel it or the sender's Super Token balance hits zero. It can also be created, updated, or deleted whenever the sender wants.

## **Terminology**

* **Flow Rate**: The per-second rate that a sender decreases its netflow and increases a receivers netflow when creating or updating a CFA.&#x20;
* **Netflow Rate**: The per-second rate that an account's Super Token's balance is changing. It is the sum of the account's inbound and outbound CFA flow rates.
* **Sender**: The account that starts the CFA by specifying a receiver and a flow rate after which its netflow rate decreases.
* **Receiver**: The account on the receiving end of a CFA which has its netflow rate increased.
* ****[**CRUD**](https://en.wikipedia.org/wiki/Create,\_read,\_update\_and\_delete) **timestamp**: The timestamp of when an account creates, updates, or deletes a CFA.
* **CFA Real-Time Balance**: The amount the account's Super Token balance has changed since the latest CRUD timestamp due to the CFA. Can be positive or negative.
* **Static Balance**: The Super Token balance of the account at the latest CRUD timestamp.&#x20;
* **Current Balance**: The actual Super Token balance of an account. It is the sum of the Static Balance and the CFA Real-Time Balance.

{% hint style="info" %}
**NOTE**: While the flow rate is always per-second, it may at times be mentioned on different cadences. For instance, a flow rate of "100 USDCx/mo." does not mean 100 USDCx is going to move accounts on a monthly cadence. This is simply a reframing of the rate: a 100 USDCx/month flow rate is really a \~0.0039 USDCx/second flow rate.
{% endhint %}

## Computation

We can get the netflow for an account by netting all of its inbound and outbound flow rates.

![](<../../../.gitbook/assets/image (63).png>)

When an account creates, updates, or deletes a stream, several things are settled in the Superfluid CFA smart contract:

1. New Netflow rate
2. New CRUD timestamp: UTC timestamp at time of the flow change
3. New Static Balance: takes on the value of the Current Balance at the CRUD timestamp
4. Real-Time Balance is set to zero

From here the CFA Real-Time Balance begins automatically changing by-the-second at the account's netflow rate (if the rate is non-zero). How? Because it is calculated as seconds elapsed since the last CRUD timestamp multiplied by the netflow rate. Since the only changing variable here is time (in seconds), this allows the Real-Time Balance value to increase/decrease with no need for gas.&#x20;

![As discussed in the Super Token section, the CFA Real-Time balance can be positive or negative.](<../../../.gitbook/assets/image (50).png>)

Recall that the Current Balance is equal to the Real-Time Balance (changing by the second) plus the Static Balance (constant until a flow change). As a result, when an account with a non-zero netflow rate goes to view its balance, it will see that it changes every second!

{% hint style="info" %}
**NOTE**: Because the only changing variable involved is time, creating a CFA is a one-time action. Viewing your balance is simply a matter of reading the value from the formula below and **NOT a matter of the sender or Superfluid running transactions every second to update balances**.
{% endhint %}

## **Formula**

> Static Balance = Initial Balance at latest CRUD timestamp
>
> Real-Time Balance = Netflow Rate \* Seconds elapsed since latest CRUD timestamp
>
> Current Balance = Static Balance + Real-Time Balance

## Example - Monitoring Account A's Current Balance

Let's observe an account that interacts with the CFA and how it affects the different parts of the Current Balance calculation.

#### **1. With no initial CFA activity and an initial balance of 1000 USDCx, Account A starts an outbound stream to Account B with flow rate of 0.01 USDCx/second and 1000 seconds elapse**

![](<../../../.gitbook/assets/image (50) (1).png>)

Latest CRUD [timestamp](https://www.unixtimestamp.com/) = 1653400000 (Tue May 24 2022 19:20:24 GMT+0000)

Current timestamp = 165340**1**000

Static Balance = 1000 USDCx

Real-Time Balance = -0.01 USDCx/second \* 1000 seconds = -10 USDCx

Current Balance = 1000 USDCx + -10 USDCx = <mark style="color:green;">**990 USDCx**</mark>

#### **2. On the 1000th second, Account A increases the flow rate to Account B to 0.02 USDCx/second. The CFA contract records new status.**

![](<../../../.gitbook/assets/image (60).png>)

Current timestamp = 165340**1**000

Static Balance = <mark style="color:green;">**990**</mark> <mark style="color:green;"></mark><mark style="color:green;"></mark> <mark style="color:green;"></mark><mark style="color:green;">**USDCx**</mark>** ** ( recorded to CFA contract, takes the Current Balance value from 1. )

Real-Time Balance = -0.02 USDCx/second \* **0** seconds = 0 USDCx ( time elapsed has reset )

Current Balance = 990 USDCx + 0 USDCx = **990 USDCx**

#### **3. **_****_** Another 2000 seconds elapse**

![](<../../../.gitbook/assets/image (59) (2).png>)

Latest CRUD timestamp = 165340**1**000

Current timestamp = 165340**3**000

Static Balance = 990 USDCx

Real-Time Balance = -0.02 USDCx/second \* **2000** seconds = -40 USDCx

Current Balance = 990 USDCx + -40 USDCx = <mark style="color:green;">**950 USDCx**</mark>

#### **4. On the 2000th second, Account A begins receiving an inbound stream with flow rate of 0.04 USDCx/sec from Account C. The CFA contract records the new status.**

![](<../../../.gitbook/assets/image (57).png>)

Latest CRUD timestamp = 165340**3**000 ( recorded to CFA contract )

Current timestamp = 165340**3**000

Static Balance = <mark style="color:green;">**950 USDCx**</mark> ( recorded to CFA contract, takes the Current Balance value from 3. )

Real-Time Balance = **+0.02** USDCx/second \* **0** seconds = 0 USDCx

Current Balance = 950 USDCx - 0 USDCx = **950 USDCx**

#### **5. **_****_** Another 1000 seconds elapse**

![](<../../../.gitbook/assets/image (39).png>)

Latest CRUD timestamp = 165340**3**000

Current timestamp = 165340**4**000

Static Balance = 950 USDCx

Real-Time Balance = **+0.02** USDCx/second \* **1000** seconds = 20 USDCx

Current Balance = 950 USDCx + 20 USDCx = <mark style="color:green;">**970 USDCx**</mark>

#### **6. **_****_** Account A deletes the outbound stream of 0.02 USDCx/sec to Account B. The CFA contract records the new status.**

![](<../../../.gitbook/assets/image (38).png>)

Latest CRUD timestamp = 165340**4**000 ( recorded to CFA contract )

Current timestamp = 165340**4**000

Static Balance = <mark style="color:green;">**970 USDCx**</mark> ( recorded to CFA contract, takes the Current Balance value from 5. )

Real-Time Balance = **+0.04** USDCx/second \* **0** seconds = 0 USDCx

Current Balance = 970 USDCx + 0 USDCx = **970 USDCx**

## Other Considerations

#### What if I transfer, wrap, or unwrap Super Tokens while I have an active stream?

These actions are "discrete lump-sum" actions and just use the Super Token's basic ERC20 `transfer` function. They don't interface with Super Agreements at all which means they don't affect the Real-Time Balance of your account. Basically, they just affect the Static Balance.

**What if I interact with the Instant Distribution Agreement (IDA) while I have an active stream?**

The IDA is a separate Super Agreement. All the actions done there are captured within it's own IDA Real-Time Balance which is added to an account's overall balance separately.&#x20;

## Solvency and Sentinels

What happens when an account's balance hits zero? When an account with a negative net flow rate reaches a zero balance, it is deemed **critical**. Given the nature of public blockchain technology, a CFA cannot cancel itself once zero balance is reached. Superfluid deals with this through **buffer deposits** and **Sentinels**.

### Buffer

When a stream is opened, an account must deposit a certain amount of Super Token for their stream as a cushion in case they hit critical. If an account cancels outbound streams before going critical, it will be refunded its buffer.&#x20;

When an account goes critical, Super Tokens can no longer be streamed from the account's balance (because there are none), so Super Tokens from the buffer are used to continue the account's outbound stream(s) until external accounts (Sentinels) step in and cancel them.

The remainder of the buffer is rewarded to the Sentinel that closes the stream (**note:** this is what happens in most cases, you can read about other liquidation rules [here](../../../sentinels/liquidations-and-toga.md)). This "liquidation" mechanism incentivizes accounts to close their streams before running out of tokens. It is an account owner's own responsibility to close their streams before reaching critical in order to avoid loss of the buffer.

The size of the buffer deposit is based on time and flow rate. So for instance, on Polygon, a **4-hour buffer deposit** is taken on streams. So if you are streaming at a rate of 10 USDCx/hour, then a 40 USDCx deposit will be taken.

### Sentinels

Superfluid enables the liquidation of critical account streams by any external account. Anyone can run Sentinel software which monitors all Constant Flow Agreements across the network, identifies critical accounts, and closes their streams, thereby earning buffer deposits.&#x20;

_This was a high level overview of Superfluid Solvency. Check out the_ [_Liquidations page_](../../../sentinels/liquidations-and-toga.md) _for a more in-depth explanation and the_ [_Sentinel page_](https://docs.superfluid.finance/superfluid/sentinels/running-a-sentinel) _for details on how to run Sentinels._
