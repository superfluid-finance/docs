# createFlowByOperator

Starts a stream from a `sender` to a `receiver` using [ACL permissions](../../cfa-access-control-list-acl/).

```
let flowOp = sf.cfaV1.createFlowByOperator({
  superToken: string,
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

await flowOp.exec( <<ethers signer>> );
```

### Parameters

| Parameter    | Type     | Description                                                                                        |
| ------------ | -------- | -------------------------------------------------------------------------------------------------- |
| `superToken` | `string` | Address of Super Token being streamed                                                              |
| `sender`     | `string` | Address of sender                                                                                  |
| `receiver`   | `string` | Address of receiver                                                                                |
| `flowRate`   | `string` | Desired wei/second flow rate to be created from `sender` to `receiver`                             |
| `userData`   | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) |

### Example Usage

[https://codesandbox.io/s/create-flow-as-operator-nv607c?from-embed=\&file=/src/CreateFlowAsOperator.js:787-851](https://codesandbox.io/s/create-flow-as-operator-nv607c?from-embed=\&file=/src/CreateFlowAsOperator.js:787-851)
