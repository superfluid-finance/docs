---
description: >-
  An approval layer for creating, updating, or deleting streams on another
  user’s behalf.
---

# 🗝 CFA Access Control List (ACL)

The CFA **Access Control List (ACL)** feature allows any account (EOA or contract) to grant/revoke flow operation permissions to another address. You do this by first granting a set of permissions (create, update, delete) as well as a flow rate allowance. The flow rate allowance allotted to a flow operator is deducted every time they either create a flow (deducted by the flow rate amount) or update a flow which is greater than the current flow rate (deducted by the delta between the new flow rate and old flow rate).\*

> Note: If you set a flow rate allowance equal to the maximum flow rate then this value is never deducted. In solidity, the maximum flow rate could be represented by `type(int96).max`

This process is somewhat analogous to the ERC20 pattern for approvals & allowances, with some nuanced differences.

The ACL feature may be used with the constant flow agreement with the following steps:

**Step 1:** Granting create, update, and/or delete permissions to other accounts

**Step 2:** Granting a flow rate allowance to other accounts

**Step 3:** Performing create, update, and/or delete operations a flow as the operator

### Granting Create, Update, and Delete Permissions

This may be done using one of the following functions.

`updateFlowOperatorPermissions` allows you to set granular permissions for operators over streams.

```jsx
/**
   * @dev msgSender from `ctx` updates permissions for the `flowOperator` with `flowRateAllowance`
   * @param token Super token address
   * @param flowOperator The permission grantee address
   * @param permissions A bitmask representation of the granted permissions
   * @param flowRateAllowance The flow rate allowance the `flowOperator` is granted (only goes down)
   * @param ctx Context bytes (see ISuperfluid.sol for Context struct)
*/
function updateFlowOperatorPermissions(
        ISuperfluidToken token,
        address flowOperator,
        uint8 permissions,
        int96 flowRateAllowance,
        bytes calldata ctx
    ) 
        external virtual
        returns(bytes memory newCtx);
```

`authorizeFlowOperatorWithFullControl` allows you to grant full access over streams to an operator. Also note that, if an operator is granted full access via this function, their flow allowance will not be deducted after increasing flowRates of the sender or creating flows on behalf of the sender

```jsx
 /**
     * @dev msgSender from `ctx` grants `flowOperator` create/update/delete permissions with flowRateAllowance as type(int96).max
     * @param token Super token address
     * @param flowOperator The permission grantee address
     * @param ctx Context bytes (see ISuperfluid.sol for Context struct)
     */
    function authorizeFlowOperatorWithFullControl(
        ISuperfluidToken token,
        address flowOperator,
        bytes calldata ctx
    )
        external virtual
        returns(bytes memory newCtx); 
```

`revokeFlowOperatorWithFullControl` allows you to remove all access to stream operation from your operator

```jsx
    /**
     * @notice msgSender from `ctx` revokes `flowOperator` create/update/delete permissions
     * @dev `permissions` and `flowRateAllowance` will both be set to 0
     * @param token Super token address
     * @param flowOperator The permission grantee address
     * @param ctx Context bytes (see ISuperfluid.sol for Context struct)
     */
    function revokeFlowOperatorWithFullControl(
        ISuperfluidToken token,
        address flowOperator,
        bytes calldata ctx
    )
        external virtual
        returns(bytes memory newCtx);
```

In each of these functions, the `token`, and `flowOperator` parameters are straightforward, but the `permissions` and `flowRateAllowance` parameters require more explanation.

#### Permissions

The `permissions` value is a bit mask which represents a specific level of access over streams. This may be a single permission (i.e. create, update, or delete) or some combination of permissions (i.e. create and update, update and delete, create and delete, or create, update and delete). When passing in a value, you will use a decimal value which represents a level of access. . The below table shows the binary representation of the permission value, and its associated decimal value. When calling the `updateFlowOperatorPermissions` function, you will pass in the decimal value associated with each permission level:

> NOTE: passing in any number other than one of the numbers below will cause the transaction to revert

| Permission Type           | Parameter Value |
| ------------------------- | --------------- |
| Create                    | 1               |
| Update                    | 2               |
| Create or Update          | 3               |
| Delete                    | 4               |
| Create or Delete          | 5               |
| Delete or Update          | 6               |
| Create, Update, or Delete | 7               |

#### Flow Rate Allowance

The `flowRateAllowance` parameter allows you to define the total increase in flow rates your operator is allowed to make. Your operator’s `flowRateAllowance` is not impacted by deleting streams or updating streams with a new flow rate which is less than the previous flow rate (i.e. by reducing stream flow rates).

Each time our operator creates a stream on our behalf, the operator’s `flowRateAllowance` will decrease by the amount equal to the `flowRate` of the newly created stream. In the case of flow updates, the operator’s `flowRateAllowance` will be decreased by an amount equal to the delta between the new higher flow rate and previous flow rate.

For example, let’s assume that we allow an operator access to creating and updating streams with a flowRate allowance of 1000 tokens per month (which would be represented as a flow rate of `385802469135802` tokens per second). If our operator creates a stream on our behalf with a `flowRate` of 500 tokens per month, then the operator’s remaining `flowRateAllowance` becomes 500 tokens per month (`1000/month - 500/month`). Then, if our operator updates another one of our streams that is already outstanding by increasing our `flowRate` by 250 tokens per month, then our operator’s `flowRateAllowance` will decrease by another 250 tokens per month, leaving the remaining flowRateAllowance at 250 tokens per month (`500/month - 250/month`).

Once again, it’s important to highlight is that reductions in `flowRates` do not impact a flowOperator’s allowance at all. If, in the previous example, our operator were to delete flow #1 and update flow #2 by reducing the `flowRate` by 100 tokens per month, these actions would each not impact the `flowRateAllowance`. The operator would still have a flow rate allowance of 250 tokens per month remaining. But, if they were to increase it by 50 tokens per month after decreasing, their new flow rate allowance would now be 200 tokens per month.

When it comes to actually creating, updating, or deleting a flow by an operator, you can use functions with the `ByOperator` suffix to perform these operations:

```jsx
/**
    * @notice Create a flow between sender and receiver
    * @dev A flow created by an approved flow operator (see above for details on callbacks)
    * @param token Super token address
    * @param sender Flow sender address (has granted permissions)
    * @param receiver Flow receiver address
    * @param flowRate New flow rate in amount per second
    * @param ctx Context bytes (see ISuperfluid.sol for Context struct)
    */
    function createFlowByOperator(
        ISuperfluidToken token,
        address sender,
        address receiver,
        int96 flowRate,
        bytes calldata ctx
    )
        external virtual
        returns(bytes memory newCtx);
```

```jsx
/**
    * @notice Update a flow between sender and receiver
    * @dev A flow updated by an approved flow operator (see above for details on callbacks)
    * @param token Super token address
    * @param sender Flow sender address (has granted permissions)
    * @param receiver Flow receiver address
    * @param flowRate New flow rate in amount per second
    * @param ctx Context bytes (see ISuperfluid.sol for Context struct)
    */
    function updateFlowByOperator(
        ISuperfluidToken token,
        address sender,
        address receiver,
        int96 flowRate,
        bytes calldata ctx
    )
        external virtual
        returns(bytes memory newCtx);
```

```jsx
/**
     * @notice Delete the flow between sender and receiver
     * @dev A flow deleted by an approved flow operator (see above for details on callbacks)
     * @param token Super token address
     * @param ctx Context bytes (see ISuperfluid.sol for Context struct)
     * @param receiver Flow receiver address
     */
    function deleteFlowByOperator(
        ISuperfluidToken token,
        address sender,
        address receiver,
        bytes calldata ctx
    )
        external virtual
        returns(bytes memory newCtx);
```
