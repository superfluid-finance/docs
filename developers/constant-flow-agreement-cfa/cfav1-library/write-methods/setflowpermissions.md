# setFlowPermissions

#### Function Header

<pre class="language-solidity"><code class="lang-solidity"><strong>/**
</strong> * @dev Update permissions for flow operator
 * @param token The token used in flow
 * @param flowOperator The address given flow permissions
 * @param allowCreate creation permissions
 * @param allowCreate update permissions
 * @param allowCreate deletion permissions
 * @param flowRateAllowance The allowance provided to flowOperator
 */
function setFlowPermissions(
    ISuperToken token,
    address flowOperator,
    bool allowCreate,
    bool allowUpdate,
    bool allowDelete,
    int96 flowRateAllowance
) internal returns (bool) {
</code></pre>

{% hint style="info" %}
The `flowRateAllowance` works just like [allowance](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-allowance-address-address-) for regular ERC20 tokens. See it explained [**here**](../../more.../cfa-access-control-list-acl.md#flowrateallowance-parameter).
{% endhint %}

#### Example Usage

```solidity
// Giving Alice permission to only create flows (no update or delete permissions
// of someSuperToken from the contract up to an allowance of 100,000 wei/sec.

someSuperToken.setFlowPermissions(
    alice,
    true,
    false,
    false,
    100000
)
```
