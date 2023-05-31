# updateFlow

Lets a sender update an existing stream to a receiver to a new flow rate

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

let flowOp = daix.updateFlow({
  sender: string,
  receiver: string,
  flowRate: string,
  userData?: string
});

await flowOp.exec( <<ethers signer>> ); // should have same address as `sender`
```

### Parameters

<table><thead><tr><th width="182">Parameter</th><th width="231.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sender</code></td><td><code>string</code></td><td>Address of sender</td></tr><tr><td><code>receiver</code></td><td><code>string</code></td><td>Address of receiver</td></tr><tr><td><code>flowRate</code></td><td><code>string</code></td><td>New desired wei/second flow rate at which the <code>sender</code> wants to be streaming to the <code>receiver</code></td></tr><tr><td><code>userData</code></td><td><code>string</code></td><td><em>Optional</em> <a href="https://docs.superfluid.finance/superfluid/developers/super-apps/user-data">user data</a></td></tr></tbody></table>

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/borrow-against-salary/test/EmploymentLoan.test.js#L174" %}

### Additional Considerations

* If `updateFlow` is called with a `flowRate` that is the same as the current flow rate, it will _not_ revert.
