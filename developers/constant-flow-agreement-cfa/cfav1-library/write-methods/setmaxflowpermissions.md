# setMaxFlowPermissions

#### Function Header

```solidity
 /**
  * @dev Update permissions for flow operator - give operator max permissions
  * @param token The token used in flow
  * @param flowOperator The address given flow permissions
  */
 function setMaxFlowPermissions(
     ISuperToken token,
     address flowOperator
 ) internal returns (bool)
```

#### Example Usage

<pre><code>// Giving Alice total permission to manage flows of someSuperToken from the contract
<strong>
</strong><strong>someSuperToken.setFlowPermissions(
</strong>    alice
)
</code></pre>

{% embed url="https://github.com/superfluid-finance/super-examples/blob/0b90a34602dc9cab4a10ac59aefebef1bf5384cd/projects/tradeable-cashflow/contracts/RedirectAll.sol#L146" %}
