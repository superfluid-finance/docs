# updateFlowOperatorPermissions

Lets the caller grant another account the desired [ACL permissions ](../../cfa-access-control-list-acl/)for streams of a certain Super Token.

```
let flowOp = sf.cfaV1.updateFlowOperatorPermissions({
  superToken: string,
  flowOperator: string,
  permissions: number,
  flowRateAllowance: string
});

await flowOp.exec( <<ethers signer>> );
```

### Parameters

| Parameter      | Type     | Description                                                                                                                                                                                      |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `superToken`   | `string` | Address of Super Token                                                                                                                                                                           |
| `flowOperator` | `string` | Address of the account whose ACL permissions the caller is updating                                                                                                                              |
| `permissions`  | `number` | [Number indicating level of permission](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl#permissions) to be granted to the account. |
| `receiver`     | `string` | Address of receiver                                                                                                                                                                              |
