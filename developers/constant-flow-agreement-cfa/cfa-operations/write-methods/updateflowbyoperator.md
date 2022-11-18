# updateFlowByOperator

Updates an existing stream from a `sender` to a `receiver` using [ACL permissions](../../cfa-access-control-list-acl/).

```
let flowOp = sf.cfaV1.updateFlowByOperator({
  superToken: string,
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

await flowOp.exec( <<ethers signer>> );
```

### Parameters

| Parameter    | Type     | Description                                                                                                                                        |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `superToken` | `string` | Address of Super Token being streamed                                                                                                              |
| `sender`     | `string` | Address of sender                                                                                                                                  |
| `receiver`   | `string` | Address of receiver                                                                                                                                |
| `flowRate`   | `string` | New desired wei/second flow rate that `sender` wants to start streaming at to the `receiver`                                                       |
| `userData`   | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) that can be provided with the `createFlow` call |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/311e5a95d3505dc8c5d8afd420e9edc8b5a57426/projects/borrow-against-salary/test/EmploymentLoan.test.js#L178" %}

### Additional Considerations

* If `updateFlowByOperator` is called with a `flowRate` that is the same as the current flow rate, it will _not_ revert.
