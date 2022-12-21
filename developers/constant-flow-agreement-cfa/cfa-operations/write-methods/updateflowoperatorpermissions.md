# updateFlowOperatorPermissions

Lets the caller grant another account the desired [ACL permissions ](../../cfa-access-control-list-acl/)for streams of a certain Super Token.

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

let flowOp = daix.updateFlowOperatorPermissions({
  flowOperator: string,
  permissions: number,
  flowRateAllowance: string
});

await flowOp.exec( <<ethers signer>> );
```

### Parameters

| Parameter           | Type     | Description                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flowOperator`      | `string` | Address of the account whose ACL permissions the caller is updating                                                                                                                                                                                                                                                                                                                       |
| `permissions`       | `number` | [Number indicating level of permission](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl#permissions) to be granted to the account.                                                                                                                                                                                          |
| `flowRateAllowance` | `string` | <p>Maximum amount of flow rate increase that the flowOperator is permitted - <a href="https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl#flow-rate-allowance">learn more</a><br><br>Akin to <a href="https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-allowance-address-address-">allowance</a> on ERC20</p> |

### Example Usage

[https://codesandbox.io/s/updateflowpermissions-example-3k8hor?from-embed=\&file=/src/UpdateFlowPermissions.js:810-891](https://codesandbox.io/s/updateflowpermissions-example-3k8hor?from-embed=\&file=/src/UpdateFlowPermissions.js:810-891)
