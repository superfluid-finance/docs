# revokeFlowPermissions

#### Function Header

```solidity
/**
 * @dev Update permissions for flow operator - revoke all permission
 * @param token The token used in flow
 * @param flowOperator The address given flow permissions
 */
function revokeFlowPermissions(
    ISuperToken token,
    address flowOperator
) internal returns (bool)
```

#### Example Usage

<pre><code>// Removing all of Alice's permissions to manage flows from the contract
<strong>
</strong><strong>someSuperToken.revokeFlowPermissions(
</strong>    alice
)
</code></pre>

{% embed url="https://github.com/superfluid-finance/super-examples/blob/0b90a34602dc9cab4a10ac59aefebef1bf5384cd/projects/tradeable-cashflow/contracts/RedirectAll.sol#L146" %}
