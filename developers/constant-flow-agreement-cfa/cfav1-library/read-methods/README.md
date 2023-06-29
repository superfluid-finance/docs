# Read Methods

## Method Catalog

```solidity
/** CFA VIEW FUNCTIONS ************************************* */


function getFlowRate(ISuperToken token, address sender, address receiver)
    internal view returns(int96 flowRate);

function getFlowInfo(ISuperToken token, address sender, address receiver)
    internal view
    returns(uint256 lastUpdated, int96 flowRate, uint256 deposit, uint256 owedDeposit);

function getNetFlowRate(ISuperToken token, address account)
    internal view returns (int96 flowRate);

function getNetFlowInfo(ISuperToken token, address account)
    internal view returns (uint256 lastUpdated, int96 flowRate, uint256 deposit, uint256 owedDeposit);

function getBufferAmountByFlowRate(ISuperToken token, int96 flowRate) internal view
    returns (uint256 bufferAmount);

function getFlowPermissions(ISuperToken token, address sender, address flowOperator)
    internal view
    returns (bool allowCreate, bool allowUpdate, bool allowDelete, int96 flowRateAllowance);
```
