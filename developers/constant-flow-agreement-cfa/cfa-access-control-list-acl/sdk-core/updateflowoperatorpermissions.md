# updateFlowOperatorPermissions

Lets the caller grant another account the desired [ACL permissions ](../)for streams of a certain Super Token.

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

<table><thead><tr><th width="228">Parameter</th><th width="231.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>flowOperator</code></td><td><code>string</code></td><td>Address of the account whose ACL permissions the caller is updating</td></tr><tr><td><code>permissions</code></td><td><code>number</code></td><td><a href="https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl#permissions">Number indicating level of permission</a> to be granted to the account.</td></tr><tr><td><code>flowRateAllowance</code></td><td><code>string</code></td><td>Maximum amount of flow rate increase that the flowOperator is permitted - <a href="https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl#flow-rate-allowance">learn more</a><br><br>Akin to <a href="https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-allowance-address-address-">allowance</a> on ERC20</td></tr></tbody></table>

### Example Usage

[https://codesandbox.io/s/updateflowpermissions-example-3k8hor?from-embed=\&file=/src/UpdateFlowPermissions.js:810-891](https://codesandbox.io/s/updateflowpermissions-example-3k8hor?from-embed=\&file=/src/UpdateFlowPermissions.js:810-891)
