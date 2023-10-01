---
description: decreaseFlowRateAllowanceWithPermissions
---

# decreaseFlowRateAllowanceWithPermissions

#### Function Header

```solidity
/**
 * @dev Decreases the flow rate allowance for flow operator and removes the permissions
 * @notice allowing userData to be a parameter here triggered stack too deep error
 * @param token The token used in flow
 * @param flowOperator The address whose flow rate allowance is subtracted
 * @param permissionsToRemove The permissions to remove for the flow operator
 * @param subtractedFlowRateAllowance amount to subtract allowance by
 */
function decreaseFlowRateAllowanceWithPermissions(
    ISuperfluidToken token,
    address flowOperator,
    uint8 permissionsToRemove,
    int96 subtractedFlowRateAllowance
) internal returns (bool)
```

#### permissionsToAdd

Using `decreaseFlowRateAllowanceWithPermissions` requires understanding the `permissionsToAdd` parameter.&#x20;

ACL Permission are designated with the [ACL permissions bitmask](../../more.../cfa-access-control-list-acl.md#permissions-parameter). Basically, the permissions level you provide in `permissionsToAdd` is appended to the existing permissions as though you are saying this account now has its **existing permissions **<mark style="color:red;">**EXCEPT**</mark>** the new permissions defined by `permissionsToAdd`**. See the example below.

#### Example Usage

<pre><code>// Alice currently has permissions of 7 (Create or Update or Delete)
// We want to remove her ability to Delete and
// decrease her flow rate allowance by 100 wei/sec
<strong>
</strong><strong>someSuperToken.increaseFlowRateAllowanceWithPermissions(
</strong>    alice,
    4,        // Delete is represented by 4 on the ACL bitmask
    100
)

// Now Alice has 100 more wei/sec less by which she can increase the senders stream
// and now has only permissions to Create or Update streams for the sender.
// That effectively gives Alice permissions of 3 (Create or Update).
</code></pre>
