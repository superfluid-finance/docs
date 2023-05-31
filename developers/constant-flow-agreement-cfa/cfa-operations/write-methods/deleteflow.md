# deleteFlow

Lets a sender delete an existing stream to a receiver

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

let flowOp = daix.deleteFlow({
  sender: string,
  receiver: string,
  userData?: string
});

await flowOp.exec( <<ethers signer>> ); // should have same address as sender
```

### Parameters

<table><thead><tr><th width="182">Parameter</th><th width="231.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sender</code></td><td><code>string</code></td><td>Address of sender</td></tr><tr><td><code>receiver</code></td><td><code>string</code></td><td>Address of receiver</td></tr><tr><td><code>userData</code></td><td><code>string</code></td><td><em>Optional</em> <a href="https://docs.superfluid.finance/superfluid/developers/super-apps/user-data">user data</a></td></tr></tbody></table>

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/borrow-against-salary/test/EmploymentLoan.test.js#L399" %}

### Additional Considerations

* If there is already no stream from sender to receiver, then `deleteFlow` will revert.
