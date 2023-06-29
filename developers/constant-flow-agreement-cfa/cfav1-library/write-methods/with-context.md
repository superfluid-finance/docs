# With Context

As you can learn about [here](../../../super-apps/super-app-callbacks/calling-agreements-in-super-apps.md), Super Agreement calls (like stream creations) in Super App callbacks require the updating of a context bytes variable. That context is returned at the end of the callback.

Below, the `newCtx` is the context bytes variable that will be updated with each Super Agreement call.

```solidity
// Example Super App Callback

function onFlowCreated(
    ISuperToken superToken,
    address sender,
    bytes calldata ctx
) internal override returns (bytes memory /*newCtx*/) {
    
     newCtx = ctx; // `newCtx` is context bytes variable for updating
     
     // ... callback logic
    
}
```

So, to do CFA operations inside of Super App callbacks, you'll need to use the -**WithCtx** versions of each function.  These calls all return the updated context (a bytes memory)

```solidity
// We're assuming here that newCtx is what you've named the context bytes 
// object that will be updated throughout the callback and returned

// Without user data

token.createFlowWithCtx(
    address receiver, 
    int96 flowRate,
    bytes memory ctx // Pass in the context bytes variable for updating here
) returns (bytes memory);

// these functions look very similar for updates and deletions

token.updateFlowWithCtx(address receiver, int96 flowRate, bytes memory ctx) returns (bytes memory);
token.deleteFlowWithCtx(address sender, address receiver, bytes memory ctx) returns (bytes memory);

// ACL functions also need to be called with context if called in a callback

function createFlowFromWithCtx(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate,
    bytes memory ctx
) internal returns (bytes memory newCtx)

function updateFlowFromWithCtx(
    ISuperToken token,
    address sender,
    address receiver,
    int96 flowRate,
    bytes memory ctx
) internal returns (bytes memory newCtx)

function deleteFlowWithCtx(
    ISuperToken token,
    address sender,
    address receiver,
    bytes memory ctx
) internal returns (bytes memory newCtx)
    
function setFlowPermissionsWithCtx(
    ISuperToken token,
    address flowOperator,
    bool allowCreate,
    bool allowUpdate,
    bool allowDelete,
    int96 flowRateAllowance,
    bytes memory ctx
) internal returns (bytes memory newCtx)
function setMaxFlowPermissionsWithCtx(
    ISuperToken token,
    address flowOperator,
    bytes memory ctx
) internal returns (bytes memory newCtx)
function revokeFlowPermissionsWithCtx(
    ISuperToken token,
    address flowOperator,
    bytes memory ctx
) internal returns (bytes memory newCtx)
```

**Example** - Here's the callback snippet continued showing the proper syntax

```solidity
// Example Super App Callback
function afterAgreementCreated(
    ISuperToken superToken,
    address agreementClass,
    bytes32, // _agreementId,
    bytes calldata /_agreementData/,
    bytes calldata ,// _cbdata,
    bytes calldata ctx
) external returns (bytes memory newCtx) {
    
     newCtx = ctx; // `newCtx` is context bytes variable for updating
     
     // start a stream to another address
     //note that `token` is the asset you want to stream
     newCtx = token.createFlowWithCtx(
         [someReceiverAddress], 
         [flow rate],
         newCtx    // notice `newCtx` being passed in and updated here
     );
    
}
```
