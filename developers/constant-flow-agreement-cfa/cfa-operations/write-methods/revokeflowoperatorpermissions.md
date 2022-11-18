# revokeFlowOperatorPermissions

Revokes all [ACL permissions](../../cfa-access-control-list-acl/) that an account has over the caller's account for streams of a certain Super Token.

```
let flowOp = sf.cfaV1.revokeFlowOperatorPermissions({
  superToken: string,
  flowOperator: string
});

await flowOp.exec( <<ethers signer>> );
```

### Parameters

| Parameter      | Type     | Description                                                         |
| -------------- | -------- | ------------------------------------------------------------------- |
| `superToken`   | `string` | Address of Super Token                                              |
| `flowOperator` | `string` | Address of the account whose ACL permissions the caller is revoking |

### Example Usage

[https://codesandbox.io/s/revoke-flow-permissions-example-ednt8t?from-embed=\&file=/src/RevokeFlowPermissions.js:767-851](https://codesandbox.io/s/revoke-flow-permissions-example-ednt8t?from-embed=\&file=/src/RevokeFlowPermissions.js:767-851)
