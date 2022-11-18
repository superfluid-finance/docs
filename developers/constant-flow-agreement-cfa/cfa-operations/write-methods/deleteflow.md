# deleteFlow

Lets a sender delete an existing stream to a receiver

```
let flowOp = sf.cfaV1.deleteFlow({
  superToken: string,
  sender: string,
  receiver: string,
  userData?: string
});

await flowOp.exec( <<ethers signer of sender>> );
```

### Parameters

| Parameter    | Type     | Description                                                                                                                                        |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `superToken` | `string` | Address of Super Token being streamed                                                                                                              |
| `sender`     | `string` | Address of sender                                                                                                                                  |
| `receiver`   | `string` | Address of receiver                                                                                                                                |
| `userData`   | `string` | _Optional_ [user data](https://docs.superfluid.finance/superfluid/developers/super-apps/user-data) that can be provided with the `createFlow` call |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/311e5a95d3505dc8c5d8afd420e9edc8b5a57426/projects/borrow-against-salary/test/EmploymentLoan.test.js#L419" %}

### Additional Considerations

* If there is already no stream from sender to receiver, then `deleteFlow` will revert.
