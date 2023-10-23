---
description: increaseFlowRateAllowanceWithPermissions
---

# increaseFlowRateAllowanceWithPermissions

Revokes all [ACL permissions](../) that an account has over the caller's account for streams of a certain Super Token.

```javascript
//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

let flowOp = daix.increaseFlowRateAllowanceWithPermissions({
    flowOperator: string;
    flowRateAllowanceDelta: string
    permissionsDelta: number
});

await flowOp.exec( <<ethers signer>> );
```

### Parameters

<table><thead><tr><th width="218">Parameter</th><th width="231.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>flowOperator</code></td><td><code>string</code></td><td>Address of the account whose ACL permissions the caller is revoking</td></tr><tr><td><code>flowRateAllowanceDelta</code></td><td><code>string</code></td><td>Wei/sec increase in <a href="../#flowrateallowance-parameter">flow rate allowance</a></td></tr><tr><td><code>permissionsDelta</code></td><td><code>number</code></td><td>New permissions you are providing the flowOperator. Explained <a href="../solidity/increaseflowrateallowancewithpermissions.md#permissionstoadd"><strong>here</strong></a>.</td></tr></tbody></table>

### Example Usage

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/5bd8e858e1a72ce9aa011e7a69bd612071fe25f3/packages/sdk-core/test/3_batch_call.test.ts#L376" %}
