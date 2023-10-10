# getFlowPermissions

#### Function Header

```solidity
    /**
     * @dev get existing flow permissions
     * @param token The token used in flow
     * @param sender sender of a flow
     * @param flowOperator the address we are checking permissions of for sender & token
     * @return allowCreate is true if the flowOperator can create flows
     * @return allowUpdate is true if the flowOperator can update flows
     * @return allowDelete is true if the flowOperator can delete flows
     * @return flowRateAllowance The flow rate allowance the flowOperator is granted (only goes down)
     */
    function getFlowPermissions(ISuperToken token, address sender, address flowOperator)
        internal view
        returns (bool allowCreate, bool allowUpdate, bool allowDelete, int96 flowRateAllowance)
```

#### Example Usage

{% embed url="https://github.com/Ricochet-Exchange/ricochet-protocol/blob/3aa93cc0a9c12fbbe176461012fc066c47e3f2ec/contracts/REXLimitOrderManager.sol#L72" %}
