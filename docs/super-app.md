---
description: The core components of a Super App
---

# Super App

🚧 Section Under Construction. Updates coming soon 🚧 

## Setup

## Registration

## Agreements

## Callbacks

#### Using Context in  Callbacks

Example:

```javascript
  function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId
        bytes calldata, // _agreementData
        bytes calldata, // _cbdata
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory)
    {
        uint256 userData = abi.decode(host.decodeCtx(_ctx).userData, (uint256));
        // Now you have userData to do with as you please!
        return updateAsset(_ctx, userData);
    }
```
