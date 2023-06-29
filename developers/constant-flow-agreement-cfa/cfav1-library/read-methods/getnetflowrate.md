# getNetFlowRate

#### Function Header

```solidity
 /**
  * @dev get net flow rate for given account for given token
  * @param token Super token address
  * @param account Account to query
  * @return flowRate The net flow rate of the account
  */
 function getNetFlowRate(ISuperToken token, address account)
     internal view returns (int96 flowRate)
```

#### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/0b90a34602dc9cab4a10ac59aefebef1bf5384cd/projects/tradeable-cashflow/contracts/RedirectAll.sol#L166" %}
