---
description: >-
  This is an example implementation of a contract using the Instant Distribution
  Agreement library.
---

# IDAv1 Library Example

```solidity
import {
    ISuperfluid,
    ISuperfluidToken
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {
    IDAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

/// @title Simple Recurring Airdrop contract example.
/// @notice This is NOT suitable for production, this is for demonstration ONLY.
contract RecurringAirdropper {

    using IDAv1Library for IDAv1Library.InitData;
    IDAv1Library.InitData internal _idav1Lib;
    
    uint32 internal constant _INDEX_ID = 0;
    address internal immutable _ADMIN;
    
    ISuperfluidToken public token;
    uint256 public lastAirdrop;
    uint256 public constant AIRDROP_INTERVAL = 30 days;
    uint256 public constant AIRDROP_AMOUNT = 1e23; // 100_000 * 1e18

    constructor(
        address admin,
        ISuperfluid _host,
        IInstantDistributionAgreement _ida,
        ISuperfluidToken _token
    ) {
        _ADMIN = admin;
        token = _token;
        _idav1Lib = IDAv1Library.InitData(_host, _ida);
        _idav1Lib.createIndex(_token, _INDEX_ID);
    }

    /// @notice Airdrops a constant amount if the last
    /// airdrop was at least 30 days ago
    function airdrop() external {
        require(_canAirdrop(), "can not air drop yet");
        _idav1Lib.distribute(token, _INDEX_ID, AIRDROP_AMOUNT);
    }
    
    function updateUnits(address subscriber, uint128 units) external {
        require(msg.sender == _ADMIN, "unathorized");
        _idav1Lib.updateSubscriptionUnits(
            token,
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
