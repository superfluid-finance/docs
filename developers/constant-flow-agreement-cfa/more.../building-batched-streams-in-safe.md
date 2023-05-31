---
description: Send multiple streams in the same transaction with Safe transaction batching
---

# Building Batched Streams in Safe

If you have a [Safe](https://app.safe.global/welcome) and are looking to send multiple streams in one transaction rather than having to manually execute each one, this guide will show you how it's done.&#x20;

## 1. Go the Safe Transaction Builder

<figure><img src="../../../.gitbook/assets/image (5).png" alt="" width="563"><figcaption></figcaption></figure>

## 2. Get CFAv1Forwarder Address

Find the CFAv1Forwarder address for the desired network below:

<table><thead><tr><th width="255">Network</th><th>Address</th></tr></thead><tbody><tr><td>Ethereum Mainnet<br>Polygon<br>Gnosis Chain<br>Optimism<br>Arbitrum<br>Avalanche<br>BNB Chain<br>Goerli<br>Arbitrum Goerli<br>Optimism Goerli<br>Mumbai</td><td>0xcfA132E353cB4E398080B9700609bb008eceB125</td></tr><tr><td>Avalanche Fuji</td><td>0x2CDd45c5182602a36d391F7F16DD9f8386C3bD8D</td></tr></tbody></table>

Paste that address in the _Enter Address or ENS Name_ box on the Transaction Builder interface.

## 3. Copy CFAv1Forwarder ABI

Copy the ABI below and paste in the _Enter ABI_ box in the Transaction Builder interface.&#x20;

<details>

<summary> Expand for CFAv1Forwarder ABI</summary>

Hover over the code box below and click the copy icon on the top right.

```json
[
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluid",
          "name": "host",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "CFA_FWD_INVALID_FLOW_RATE",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        },
        {
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "createFlow",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "deleteFlow",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getAccountFlowInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "lastUpdated",
          "type": "uint256"
        },
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        },
        {
          "internalType": "uint256",
          "name": "deposit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "owedDeposit",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getAccountFlowrate",
      "outputs": [
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        }
      ],
      "name": "getBufferAmountByFlowrate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "bufferAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "getFlowInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "lastUpdated",
          "type": "uint256"
        },
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        },
        {
          "internalType": "uint256",
          "name": "deposit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "owedDeposit",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "flowOperator",
          "type": "address"
        }
      ],
      "name": "getFlowOperatorPermissions",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "permissions",
          "type": "uint8"
        },
        {
          "internalType": "int96",
          "name": "flowrateAllowance",
          "type": "int96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "getFlowrate",
      "outputs": [
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "flowOperator",
          "type": "address"
        }
      ],
      "name": "grantPermissions",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "flowOperator",
          "type": "address"
        }
      ],
      "name": "revokePermissions",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        }
      ],
      "name": "setFlowrate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        }
      ],
      "name": "setFlowrateFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "int96",
          "name": "flowrate",
          "type": "int96"
        },
        {
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "updateFlow",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "flowOperator",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "permissions",
          "type": "uint8"
        },
        {
          "internalType": "int96",
          "name": "flowrateAllowance",
          "type": "int96"
        }
      ],
      "name": "updateFlowOperatorPermissions",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]
```

</details>

## 4. Line Up Streaming Transactions

Now you'll be able to set up each stream transaction for the batch one at a time.&#x20;

If you're looking to create streams, select the `createFlow` method.

<figure><img src="../../../.gitbook/assets/image (4).png" alt="" width="520"><figcaption></figcaption></figure>

**Function Parameters**

`token (address)` - Super Token you're streaming

`sender (address)` - Your Safe address

`receiver (address)` - The receiver address

`flowrate (int96)` - Flow rate in seconds

{% hint style="info" %}
Flow Rate is always in wei/second. Super Tokens always have 18 decimals of precision. \
\
For example: You want to stream **1000 DAIx/month** to Alice

`flowrate` = 1,000 \* (10^18) / ( seconds in month )

`flowrate` = 1,000 \* (10^18) / ( (60 \* 60 \* 24 \* 365) / 12  )

`flowrate` = 1,000 \* (10^18) / 2628000

`flowrate` = 380517503805175
{% endhint %}

`userData (bytes)` - put in `0x`

\- - -

Hit `Add Transaction` and repeat for each stream you'd like to send :repeat:

## 5. Create and Send the Batch

Once you added all operations to the batch click "Create Batch" and then "Send Batch". After execution, your streams should be running!

You can check out the [Superfluid Safe App](https://app.safe.global/share/safe-app?appUrl=https%3A%2F%2Fapp.superfluid.finance%2F\&chain=matic) to see the streams in action and conduct necessary modifications.
