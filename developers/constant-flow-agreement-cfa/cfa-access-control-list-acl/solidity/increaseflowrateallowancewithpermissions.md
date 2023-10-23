---
description: increaseFlowRateAllowanceWithPermissions
---

# increaseFlowRateAllowanceWithPermissions

#### Function Header

```solidity
/**
     * @dev msgSender from `ctx` increases flow rate allowance for the `flowOperator` by `addedFlowRateAllowance`
     * @dev if `addedFlowRateAllowance` is negative, we revert with CFA_ACL_NO_NEGATIVE_ALLOWANCE
     * @param token Super token address
     * @param flowOperator The permission grantee address
     * @param permissionsToAdd A bitmask representation of the granted permissions to add as a delta
     * @param addedFlowRateAllowance The flow rate allowance delta
     * @param ctx Context bytes (see ISuperfluid.sol for Context struct)
     * @return newCtx The new context bytes
*/
function increaseFlowRateAllowanceWithPermissions(
    ISuperfluidToken token,
    address flowOperator,
    uint8 permissionsToAdd,
    int96 addedFlowRateAllowance
) internal returns (bool)
```

#### permissionsToAdd

Using `increaseFlowRateAllowanceWithPermissions` requires understanding the `permissionsToAdd` parameter.&#x20;

ACL Permission are designated with the [ACL permissions bitmask](../#permissions-parameter). Basically, the permissions level you provide in `permissionsToAdd` is appended to the existing permissions as though you are saying this account now has its **existing permissions **<mark style="color:green;">**OR**</mark>** the new permissions defined by `permissionsToAdd`**. See the example below.

#### Example Usage

<pre><code>// Alice currently has permissions of 3 (Create or Update)
// We want to give her the ability to Delete as well and
// increasing her flow rate allowance by 100 wei/sec
<strong>
</strong><strong>someSuperToken.increaseFlowRateAllowanceWithPermissions(
</strong>    alice,
    4,        // Delete is represented by 4 on the ACL bitmask
    100
)

// Now Alice has 100 more wei/sec by which she can increase the senders stream
// and now has permissions to Create or Update OR Delete streams for the senders.
// That effectively gives Alice permissions of 7 (Create, Update, or Delete).
</code></pre>
