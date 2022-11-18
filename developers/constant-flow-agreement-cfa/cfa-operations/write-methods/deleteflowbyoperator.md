# deleteFlowByOperator

Deletes an existing stream from a `sender` to a `receiver` using [ACL permissions](../../cfa-access-control-list-acl/).

```
let flowOp = sf.cfaV1.deleteFlowByOperator({
  superToken: string,
  sender: string,
  receiver: string,
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
| `userData`   | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) |

### Example Usage

[https://codesandbox.io/s/delete-flow-as-operator-rfk6pd?from-embed=\&file=/src/DeleteFlowAsOperator.js](https://codesandbox.io/s/delete-flow-as-operator-rfk6pd?from-embed=\&file=/src/DeleteFlowAsOperator.js)

### Additional Considerations

* If there is already no stream from sender to receiver, then `deleteFlowByOperator` will revert.
