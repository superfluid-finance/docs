---
description: Giving other accounts control over stream operations
---

# ACL Features - SDK

### Granting Permissions to Flow Operators

Using the new ACL features, you may grant other accounts the ability to create, update, and/or delete streams on your behalf. You can read more about these features, and how to implement them in solidity in this page:

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}

You can also make use of the ACL features using the SDK Core. This page will provide sandbox examples for managing flow permissions & performing CRUD operations for streams on the front end.

{% hint style="info" %}
NOTE: we recommend using the [Superfluid Console](https://console.superfluid.finance) and the [Superfluid Dashboard](https://app.superfluid.finance) as you go through these interactive tutorials. They'll help you view your streams in action.
{% endhint %}

### Updating & Revoking Flow Permissions

If you'd like to grant full control over streams on a specific token to an operator, you can use the `authorizeFlowOperatorWithFullControl` function and pass in the `flowOperator` and `superToken` you're granting the authorization on. However, in this example we will show you how to grant specific permission levels using the `updateFlowOperatorPermissions` function.

To grant a flow rate allowance to an operator, you'll need to pass in the following to the `updateFlowOperatorPermissions` function:

`operator` - the address of the operator you're giving the allowance to

`permissions` - the permission type you're granting the operator. Note, you will pass in a number from 1-7 to represent the permission type. You can find more information on this [here](./#permissions). This table will help you determine the permission type:

| Permission Type           | Parameter Value |
| ------------------------- | --------------- |
| Create                    | 1               |
| Update                    | 2               |
| Create or Update          | 3               |
| Delete                    | 4               |
| Create or Delete          | 5               |
| Delete or Update          | 6               |
| Create, Update, or Delete | 7               |

`flowRateAllowance` - the total allowance you're providing the operator.

`superToken` - the token on which the allowance is being provided

{% embed url="https://codesandbox.io/embed/updateflowpermissions-example-3k8hor?fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpdateFlowPermissions.js&theme=dark&view=split" %}
Updating flow permissions
{% endembed %}

To revoke permissions, you can use the `revokeFlowOperatorWithFullControl` function. To revoke permissions from the flow operator, you'll need to pass in the:

`flowOperator` - the operator with the flowAllowance

`superToken` - the token on which the permissions were granted

{% embed url="https://codesandbox.io/s/batch-calls-tdp4g?file=/src/BatchCall.js&from-embed=&view=split" %}

From here, creating, updating, and deleting streams will work in a quite straightforward way. You can find examples of each below.

> NOTE: updating a flow with an increased flow rate or creating flows will decrement the operator's flow rate allowance, but updating a flow with a decreased flow rate or deleting a flow will not. You can find more information on how flow rate allowances work [here](./#flow-rate-allowance).

{% embed url="https://codesandbox.io/embed/create-flow-as-operator-nv607c?fontsize=14&hidenavigation=1&module=%2Fsrc%2FCreateFlowAsOperator.js&theme=dark&view=split" %}
Creating a flow as an operator
{% endembed %}

{% embed url="https://codesandbox.io/embed/update-flow-as-operator-xceyyz?fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpdateFlowAsOperator.js&theme=dark&view=split" %}
Updating a flow as an operator
{% endembed %}

{% embed url="https://codesandbox.io/embed/delete-flow-as-operator-rfk6pd?fontsize=14&hidenavigation=1&module=%2Fsrc%2FDeleteFlowAsOperator.js&theme=dark&view=split" %}
Deleting a flow as an operator
{% endembed %}
