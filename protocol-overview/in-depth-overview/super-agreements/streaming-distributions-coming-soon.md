---
description: The General Distribution Agreement (GDA)
---

# 🌊 Streaming Distributions

{% hint style="info" %}
The GDA is live on testnets - relevant addresses can be found on the [Console](https://console.superfluid.finance/eth-goerli/protocol). We are currently working on tooling support (adding to SuperTokenV1Library and SDK Core).
{% endhint %}

The GDA introduces a new primitive which enables one-to-many Superfluid **streaming distributions**, becoming the **most scalable** way to distribute recurring funds to a limitless set of recipients in web3.

The GDA enables anyone to create a **pool** and set a **pool admin** who can assign **units** to **pool members** (must not be another pool). Additionally, any account can be a **distributor** and execute an instant or stream distribution of funds via a pool.

Concepts shared by the GDA and IDA (Instant Distribution Agreement):

* IDA: Index => GDA: Pool
* IDA: Units => GDA: Units
* IDA: Subscriber => GDA: Pool Member
* IDA: Publisher => GDA: Pool Admin / Distributor
  * Note: Anyone can be a distributor in the GDA whereas only the publisher could in the IDA

Key differences in the GDA:

* Streaming distributions: the additional ability to execute a 1-to-many distribution every second
* A pool is a contract vs. in the IDA, index data is state saved on the SuperToken
  * A pool is an ERC20 token
    * Pool members can transfer units (in the IDA, only publisher can modify units)
* Anyone can distribute funds via a pool vs. in the IDA, only the publisher can distribute

Here is a walkthrough of how the GDA works at a high-level:

1. First, any account can create a pool and set the desired pool admin. This pool acts as a 'channel' between distributors and pool members. The channel can be thought of ‘piping’ that is used to distribute funds to pool members either instantly or via streaming, every single second.
2. The pool admin of a pool can arbitrarily grant and revoke units to pool members. **Only the pool admin can create or delete units.** The units a pool member owns represents their share of the pool which reflects the proportion of future distributions that they are entitled to.
3. Pool members can also **connect to a pool** (approve subscription in the IDA) or **disconnect from a pool** (delete subscription in the IDA).
   * If a pool member is **disconnected**: distributed funds reside in the pool and require claiming from the pool in order to gain access to using those funds.
   * If a pool member is **connected**: distributed funds are made available immediately upon distribution and can be used instantly.
4. Any account can execute an instant or stream distribution of funds via a pool which is distributed to pool members:
   * Instant Distribution
     * The amount of distribution a user receives via instant distribution is determined by the **Instant Distribution formula**: `distributionAmount * (poolMemberUnits / poolTotalUnits)`
   * Streaming Distribution
     * The amount of distribution a user receives via stream distribution is determined by the **Flow Distribution formula**: `poolFlowRate * (poolMemberUnits / poolTotalUnits)`
   * The gas cost paid by the distributor to execute an instant distribution or create/update/delete a streaming distribution remains fixed regardless of the number of pool members.

### GDA Examples by Illustration

This diagram illustrates a streaming distribution. A distributor (left) stream distributes funds via a pool with different members (right) with different units. Note: executing a streaming distribution to`n` members occurs in a single transaction.

<figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.22.13 AM.png" alt=""><figcaption></figcaption></figure>

### Changing Unit Counts

This diagram illustrates the case where a distributor updates members' units. This effect changes the flow rate of every other member instantly - all in a single transaction. Note that you can use Superfluid's batch call to update units for many members in a single transaction.

<figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.25.33 AM.png" alt=""><figcaption></figcaption></figure>

### Changing the Flow Rate

This final diagram outlines the case where a distributor updates their streaming distribution flow rate and thus the total flow rate of the pool. This changes the flow rate of every member instantly - all in a single transaction.

<figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-22 at 11.26.18 AM.png" alt=""><figcaption></figcaption></figure>

### Superfluid Pool Features

Given that the Superfluid Pool is also an ERC20 token, this enables additional features:

* transfer of owned units (using `transfer`)
* units transfer on your behalf (using `approve` and `transferFrom`)

The modification of units was not possible in the IDA and representing the units as an ERC20 makes it more composable and unlocks an entirely new design space.

### Handling Odd Numbers with the Adjustment Flow Rate

The GDA handles an edge case when there is a remainder in the amount of tokens to be streamed to the pool because solidity does not allow for floating point arithmetic. This is handled with something called the **adjustment flow rate** which is always streamed to the pool admin, and is best explained via an example:

* Alice creates a pool and assigns 3 units each to Bob, Carol and Dave. Alice's pool has 9 total units.&#x20;
* She then does a flow distribution of 100 DAIx/second. The issue here is that 100 / 9 (11.11...) is not fully divisible.&#x20;
* Therefore, an adjustment flow is required. The adjustment flow rate handles the cases where the desired flow rate is not divisible by the total number of units.&#x20;
* In the case of Alice's pool, the flow rate sent to the pool members is 99/s (closest divisible value without remainder, rounding down) and 1/s is the adjustment flow rate.&#x20;

{% hint style="info" %}
The GDA is currently available on select testnets - see [Contract Addresses](../../../developers/networks.md). We are in the process of solidifying its security and developer experience.
{% endhint %}
