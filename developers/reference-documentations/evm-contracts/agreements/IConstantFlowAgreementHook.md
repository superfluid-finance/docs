# IConstantFlowAgreementHook

**IConstantFlowAgreementHook interface**

The contract that implements this interface MUST only allow the CFA contract to call it

An interface for the functions needed by a CFA hook contract

## struct CFAHookParams

```solidity
struct CFAHookParams {
  address sender;
  address receiver;
  address flowOperator;
  int96 flowRate;
}
```

## Fn onCreate

```solidity
function onCreate(
    contract ISuperfluidToken token,
    struct IConstantFlowAgreementHook.CFAHookParams newFlowData
) 
    external 
    returns (bool)
```
_This should be implemented with an onlyCFA modifier, so that only the CFA can call the function_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | the streamed super token |
| `newFlowData` | struct IConstantFlowAgreementHook.CFAHookParams | the new flow data taken by the hook |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `[0]` | bool | bool |

A hook which executes on stream creation if the hook contract is set in the CFA

## Fn onUpdate

```solidity
function onUpdate(
    contract ISuperfluidToken token,
    struct IConstantFlowAgreementHook.CFAHookParams newFlowData,
    int96 oldFlowRate
) 
    external 
    returns (bool)
```
_This should be implemented with an onlyCFA modifier, so that only the CFA can call the function_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | the streamed super token |
| `newFlowData` | struct IConstantFlowAgreementHook.CFAHookParams | the new flow data taken by the hook |
| `oldFlowRate` | int96 | previous flowrate |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `[0]` | bool | bool |

A hook which executes on stream update if the hook contract is set in the CFA

## Fn onDelete

```solidity
function onDelete(
    contract ISuperfluidToken token,
    struct IConstantFlowAgreementHook.CFAHookParams newFlowData,
    int96 oldFlowRate
) 
    external 
    returns (bool)
```
_This should be implemented with an onlyCFA modifier, so that only the CFA can call the function_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | the streamed super token |
| `newFlowData` | struct IConstantFlowAgreementHook.CFAHookParams | the new flow data taken by the hook |
| `oldFlowRate` | int96 | previous flowrate |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `[0]` | bool | bool |

A hook which executes on stream deletion if the hook contract is set in the CFA

