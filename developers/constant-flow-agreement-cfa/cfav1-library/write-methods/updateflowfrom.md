# updateFlowFrom

Update a flow on behalf of a certain sender account using [ACL permissions](../../cfa-access-control-list-acl/)

#### Function Header

```solidity
/**
 * @dev Updates flow as an operator without userData
 * @param token The token to flow
 * @param sender The sender of the flow
 * @param receiver The receiver of the flow
 * @param flowRate The desired flowRate
 */
function updateFlowFrom(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate
) internal returns (bool)
```

#### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/0b90a34602dc9cab4a10ac59aefebef1bf5384cd/projects/money-streaming-intro/money-streaming-intro-hardhat/contracts/MoneyRouter.sol#L87" %}
