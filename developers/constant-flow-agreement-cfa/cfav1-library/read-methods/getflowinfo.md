# getFlowInfo

#### Function Header

```solidity
/**
 * @dev get flow info between two accounts for given token
 * @param token The token used in flow
 * @param sender The sender of the flow
 * @param receiver The receiver of the flow
 * @return lastUpdated Timestamp of flow creation or last flowrate change
 * @return flowRate The flow rate
 * @return deposit The amount of deposit the flow
 * @return owedDeposit The amount of owed deposit of the flow
 */
function getFlowInfo(ISuperToken token, address sender, address receiver) internal view
    returns(uint256 lastUpdated, int96 flowRate, uint256 deposit, uint256 owedDeposit)
```

#### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/0b90a34602dc9cab4a10ac59aefebef1bf5384cd/projects/tradeable-cashflow/contracts/RedirectAll.sol#L78" %}
