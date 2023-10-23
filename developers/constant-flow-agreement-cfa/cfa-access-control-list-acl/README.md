---
description: >-
  An approval layer for creating, updating, or deleting streams on another
  user’s behalf.
---

# Access Control List (ACL)

The Access Control List (ACL) allows any account (plain EOA or contract) to configure permissions for another account to create/update/delete streams on its behalf.&#x20;

It's basically the money streaming equivalent of the ERC20 approval mechanism!

<figure><img src="../../../.gitbook/assets/image (9) (2).png" alt=""><figcaption><p><a href="https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-allowance-address-address-"><code>allowance</code></a>, <a href="https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-approve-address-uint256-"><code>approval</code></a>, and <a href="https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-transferFrom-address-address-uint256-"><code>transferFrom</code></a> are to ERC20 transfers as <code>getFlowOperatorData</code>, <code>updateFlowOperatorPermissions</code>, and <code>(create/update/delete)FlowByOperator</code> are to Superfluid streams.</p></figcaption></figure>

If you're checking out the functions ACL provides you, you'll want to understand the `flowRateAllowance` and `permissions` parameters.

## `flowRateAllowance` Parameter

You can think of `flowRateAllowance` as a tank. When you set `flowRateAllowance` in your [`updateFlowOperatorPermissions`](sdk-core/updateflowoperatorpermissions.md) call imagine you've filled up that tank to a level of your choosing for the `flowOperator` account.

That`flowOperator` account can spend its `flowRateAllowance` tank as it likes. Every time it **increases** a flow rate on your behalf, its `flowRateAllowance` tank is depleted by the amount of the increase.&#x20;

On the other side, actions that **decrease** your flow rate (updating a stream to a lower flow rate or deleting one) **don't affect** `flowRateAllowance`.&#x20;

If a `flowOperator`'s `flowRateAllowance` is too small for it to create/increase a flow, then its action is reverted. This entire dynamic is just like the ERC20 allowance mechanism! Here's an example to drive it home 👇

**Example:**

Let’s assume that we enable an operator to create and update streams with a flowRate allowance of 1000 tokens per month (which would be represented as a flow rate of `385802469135802` tokens per second). If our operator creates a stream on our behalf with a `flowRate` of 500 tokens per month, then the operator’s remaining `flowRateAllowance` becomes 500 tokens per month (`1000/month - 500/month`). Then, if our operator updates another one of our streams that is already outstanding by increasing our `flowRate` by 250 tokens per month, then our operator’s `flowRateAllowance` will decrease by another 250 tokens per month, leaving the remaining flowRateAllowance at 250 tokens per month (`500/month - 250/month`).

## `permissions` Parameter

The `permissions` value is a `uint256` from 1 to 7 representing a specific level of access that an operator gets over your streams. You pass in `permissions` when calling [`updateFlowOperatorPermissions`](sdk-core/updateflowoperatorpermissions.md).

| Permission Type           | Parameter Value |
| ------------------------- | --------------- |
| Create                    | 1               |
| Update                    | 2               |
| Create or Update          | 3               |
| Delete                    | 4               |
| Create or Delete          | 5               |
| Delete or Update          | 6               |
| Create, Update, or Delete | 7               |
