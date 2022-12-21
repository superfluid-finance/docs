# revokeFlowOperatorPermissions

Revokes all [ACL permissions](../../cfa-access-control-list-acl/) that an account has over the caller's account for streams of a certain Super Token.

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

let flowOp = daix.revokeFlowOperatorPermissions({
  flowOperator: string
});

await flowOp.exec( <<ethers signer>> );
```

### Parameters

| Parameter      | Type     | Description                                                         |
| -------------- | -------- | ------------------------------------------------------------------- |
| `flowOperator` | `string` | Address of the account whose ACL permissions the caller is revoking |

### Example Usage

[https://codesandbox.io/s/revoke-flow-permissions-example-ednt8t?from-embed=\&file=/src/RevokeFlowPermissions.js:767-851](https://codesandbox.io/s/revoke-flow-permissions-example-ednt8t?from-embed=\&file=/src/RevokeFlowPermissions.js:767-851)
