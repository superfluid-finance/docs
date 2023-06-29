# deleteFlow

#### Function Header

```solidity
/**
 * @dev Delete flow without userData
 * @param token The token used in flow
 * @param sender The sender of the flow
 * @param receiver The receiver of the flow
 */
function deleteFlow(ISuperToken token, address sender, address receiver)
    internal returns (bool)
```

#### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/0b90a34602dc9cab4a10ac59aefebef1bf5384cd/projects/tradeable-cashflow/contracts/RedirectAll.sol#L146" %}
