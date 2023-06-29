# Write Methods

## Method Catalog

```solidity
/** CFA CRUD ************************************* */


function createFlow(ISuperToken token, address receiver, int96 flowRate)
    internal returns (bool);

function createFlow(ISuperToken token, address receiver, int96 flowRate, bytes memory userData)
    internal returns (bool);

function updateFlow(ISuperToken token, address receiver, int96 flowRate)
    internal returns (bool);

function updateFlow(ISuperToken token, address receiver, int96 flowRate, bytes memory userData)
    internal returns (bool);

function deleteFlow(ISuperToken token, address sender, address receiver)
    internal returns (bool);

function deleteFlow(ISuperToken token, address sender, address receiver, bytes memory userData)
    internal returns (bool);


/** CFA ACL ************************************* */


function setFlowPermissions(
    ISuperToken token,
    address flowOperator,
    bool allowCreate,
    bool allowUpdate,
    bool allowDelete,
    int96 flowRateAllowance
) internal returns (bool);

function setMaxFlowPermissions(
    ISuperToken token,
    address flowOperator
) internal returns (bool);

function revokeFlowPermissions(
    ISuperToken token,
    address flowOperator
) internal returns (bool);

function increaseFlowRateAllowance(ISuperToken token, address flowOperator, int96 addedFlowRateAllowance)
    internal returns (bool);

function increaseFlowRateAllowance(
    ISuperToken token,
    address flowOperator,
    int96 addedFlowRateAllowance,
    bytes memory userData
) internal returns (bool);

function decreaseFlowRateAllowance(ISuperToken token, address flowOperator, int96 subtractedFlowRateAllowance)
    internal returns (bool);

function decreaseFlowRateAllowance(
    ISuperToken token,
    address flowOperator,
    int96 subtractedFlowRateAllowance,
    bytes memory userData
) internal returns (bool);

function setFlowPermissionsWithCtx(
    ISuperToken token,
    address flowOperator,
    bool allowCreate,
    bool allowUpdate,
    bool allowDelete,
    int96 flowRateAllowance,
    bytes memory ctx
) internal returns (bytes memory newCtx);

function setMaxFlowPermissionsWithCtx(
    ISuperToken token,
    address flowOperator,
    bytes memory ctx
) internal returns (bytes memory newCtx);

function revokeFlowPermissionsWithCtx(
    ISuperToken token,
    address flowOperator,
    bytes memory ctx
) internal returns (bytes memory newCtx);

function createFlowFrom(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate
) internal returns (bool);

function createFlowFrom(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate,
    bytes memory userData
) internal returns (bool);

function updateFlowFrom(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate
) internal returns (bool);

function updateFlowFrom(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate,
    bytes memory userData
) internal returns (bool);

function deleteFlowFrom(
    ISuperToken token,
    address sender,
    address receiver
) internal returns (bool);

function deleteFlowFrom(
    ISuperToken token,
    address sender,
    address receiver,
    bytes memory userData
) internal returns (bool);


/** CFA With CTX FUNCTIONS ************************************* */


function createFlowWithCtx(
    ISuperToken token,
    address receiver,
    int96 flowRate,
    bytes memory ctx
) internal returns (bytes memory newCtx);

function createFlowFromWithCtx(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate,
    bytes memory ctx
) internal returns (bytes memory newCtx);

function updateFlowWithCtx(
    ISuperToken token,
    address receiver,
    int96 flowRate,
    bytes memory ctx
) internal returns (bytes memory newCtx);

function updateFlowFromWithCtx(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate,
    bytes memory ctx
) internal returns (bytes memory newCtx);

function deleteFlowWithCtx(
    ISuperToken token,
    address sender,
    address receiver,
    bytes memory ctx
) internal returns (bytes memory newCtx);

function deleteFlowFromWithCtx(
    ISuperToken token,
    address sender,
    address receiver,
    bytes memory ctx
) internal returns (bytes memory newCtx);
```
