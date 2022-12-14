---
description: >-
  An approval layer for creating, updating, or deleting streams on another
  user’s behalf.
---

# Access Control List (ACL)

The Access Control List (ACL) allows any account (plain EOA or contract) to configure permissions for another account to create/update/delete streams on its behalf.&#x20;

It's basically the money streaming equivalent of the ERC20 approval mechanism!

<figure><img src="../../../.gitbook/assets/image (56).png" alt=""><figcaption><p><code></code><a href="https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-allowance-address-address-"><code>allowance</code></a>, <a href="https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-approve-address-uint256-"><code>approval</code></a>, and <a href="https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-transferFrom-address-address-uint256-"><code>transferFrom</code></a> are to ERC20 transfers as <code>getFlowOperatorData</code>, <code>updateFlowOperatorPermissions</code>, and <code>(create/update/delete)FlowByOperator</code> are to Superfluid streams.</p></figcaption></figure>

Before checking out the functions ACL provides you, you'll want to understand the `flowRateAllowance` and `permissions` parameters.

## `flowRateAllowance` Parameter

You can think of `flowRateAllowance` as a tank. When you set `flowRateAllowance` in your [`updateFlowOperatorPermissions`](./#updateflowoperatorpermissions) call imagine you've filled up that tank to a level of your choosing for the `flowOperator` account.

That`flowOperator` account can spend its `flowRateAllowance` tank as it likes. Every time it **increases** a flow rate on your behalf, its `flowRateAllowance` tank is depleted by the amount of the increase.&#x20;

On the other side, actions that **decrease** __ your flow rate (updating a stream to a lower flow rate or deleting one) **don't affect** `flowRateAllowance`.&#x20;

If a `flowOperator`'s `flowRateAllowance` is too small for it to create/increase a flow, then its action is reverted. This entire dynamic is just like the ERC20 allowance mechanism! Here's an example to drive it home 👇

**Example:**

For example, let’s assume that we allow an operator access to creating and updating streams with a flowRate allowance of 1000 tokens per month (which would be represented as a flow rate of `385802469135802` tokens per second). If our operator creates a stream on our behalf with a `flowRate` of 500 tokens per month, then the operator’s remaining `flowRateAllowance` becomes 500 tokens per month (`1000/month - 500/month`). Then, if our operator updates another one of our streams that is already outstanding by increasing our `flowRate` by 250 tokens per month, then our operator’s `flowRateAllowance` will decrease by another 250 tokens per month, leaving the remaining flowRateAllowance at 250 tokens per month (`500/month - 250/month`).

## `permissions` Parameter

The `permissions` value is a `uint256` from 1 to 7 representing a specific level of access that an operator gets over your streams. You pass in `permissions` when calling [`updateFlowOperatorPermissions`](./#updateflowoperatorpermissions).

| Permission Type           | Parameter Value |
| ------------------------- | --------------- |
| Create                    | 1               |
| Update                    | 2               |
| Create or Update          | 3               |
| Delete                    | 4               |
| Create or Delete          | 5               |
| Delete or Update          | 6               |
| Create, Update, or Delete | 7               |

## Granting Permissions

### `updateFlowOperatorPermissions`

Set permissions.&#x20;

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

### `authorizeFlowOperatorWithFullControl`

Conveniently grant **full** operator permissions to an account. That account is now an operator with full control will not have their [`flowRateAllowance`](./#flowrateallowance-parameter) deducted when it hike the flow rates of the account it has control over.

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

### `revokeFlowOperatorWithFullControl`&#x20;

Conveniently **revoke all** operator permissions from an account.

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

## Create, Update, Delete Streams with Operator Controls

When it comes to actually creating, updating, or deleting a stream by an operator, you can use functions with the `ByOperator` suffix to perform these operations.

### `createFlowByOperator`

Creates a stream between two accounts using operator controls.&#x20;

* Reduces `flowRateAllowance` given to operator over `sender`
* Reverts if `permissions` and `flowRateAllowance` are insufficient over `sender`

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

### `updateFlowByOperator`

Updates an existing stream's rate using operator controls. Reduces `flowRateAllowance` given to operator if it is for an increase.

* If it's an increase (update to a higher rate), reduces `flowRateAllowance` given to operator over `sender` by `flowRate - (old flow rate)`
* Reverts if `permissions` and `flowRateAllowance` are insufficient over `sender`

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

### `deleteFlowByOperator`

Deletes a stream between two accounts using operator controls.

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
