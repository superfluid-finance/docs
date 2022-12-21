---
description: >-
  This is an example implementation of a contract using the Instant Distribution
  Agreement library.
---

# IDA Solidity Example

```solidity
import {
    ISuperfluid,
    ISuperToken
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {
    SuperTokenV1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

/// @title Simple Recurring Airdrop contract example.
/// @notice This is NOT suitable for production, this is for demonstration ONLY.
contract RecurringAirdropper {

    using SuperTokenV1Library for ISuperToken;
    
    uint32 internal constant _INDEX_ID = 0;
    address internal immutable _ADMIN;
    
    ISuperToken public token;
    uint256 public lastAirdrop;
    uint256 public constant AIRDROP_INTERVAL = 30 days;
    uint256 public constant AIRDROP_AMOUNT = 1e23; // 100_000 * 1e18

    constructor(
        address admin,
        ISuperToken _token
    ) {
        _ADMIN = admin;
        token = _token;
        token.createIndex(_INDEX_ID);
    }

    /// @notice Airdrops a constant amount if the last
    /// airdrop was at least 30 days ago
    function airdrop() external {
        require(_canAirdrop(), "can not air drop yet");
        token.distribute(_INDEX_ID, AIRDROP_AMOUNT);
    }
    
    function updateUnits(address subscriber, uint128 units) external {
        require(msg.sender == _ADMIN, "unathorized");
        token.updateSubscriptionUnits(
            _INDEX_ID,
            subscriber,
            units
        );
    }

    function _canAirdrop() internal view returns (bool) {
        return lastAirdrop + airdropInterval <= block.timestamp;
    }
}
```
