# createFlow

#### Function Header

```solidity
/**
 * @dev Create flow without userData
 * @param token The token used in flow
 * @param receiver The receiver of the flow
 * @param flowRate The desired flowRate
 */
function createFlow(ISuperToken token, address receiver, int96 flowRate)
    internal returns (bool)
```

#### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/0b90a34602dc9cab4a10ac59aefebef1bf5384cd/projects/tradeable-cashflow/contracts/RedirectAll.sol#L148" %}
