---
description: Using Superfluid on Polygon
---

# Polygon Network \(Matic\)

## Networks

If you want to learn more about Polygon network, such as websocket connections, the full documentation is here:  [https://docs.matic.network/docs/develop/network-details/network](https://docs.matic.network/docs/develop/network-details/network)

### Mumbai Test network 

To test on the Mumbai testnet with superfluid, you'll need a RPC URL to connect your metamask or application to a Polygon node.

<table>
  <thead>
    <tr>
      <th style="text-align:left">NetworkName</th>
      <th style="text-align:left"><b>Mumbai</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">ParentChain</td>
      <td style="text-align:left">Go&#xEB;rli</td>
    </tr>
    <tr>
      <td style="text-align:left">chainId</td>
      <td style="text-align:left">80001</td>
    </tr>
    <tr>
      <td style="text-align:left">Gas token</td>
      <td style="text-align:left">Matic token</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC</td>
      <td style="text-align:left">
        <p>
          <b>(Option 1) Use Superfluid Public RPC Endpoint</b>
          <p>
            <br />&#x26A0;<em> Warning, only metamasks extensions on Firefox and Chrome are supported</em>
          </p>
          <code>https://7umjaj2e9d.execute-api.eu-west-2.amazonaws.com/development/mumbai</code>
        </p>
        <br/>
        <p>
          <b>(Option 2) Get a free RPC URL here:  </b>
          <code>https://rpc.maticvigil.com/</code>
        </p>
        <br/>
        <p>
          <b>(Option 3)</b>
          <p>
            <br />&#x26A0;<em> Warning, these public RPC endpoints are not recommended to use with Superfluid:</em>
          </p>
          <code>https://rpc-mumbai.maticvigil.com/</code> or
          <br /><code>https://rpc-mumbai.matic.today</code>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Block Explorer</td>
      <td style="text-align:left"><a href="https://explorer-mumbai.maticvigil.com/">https://explorer-mumbai.maticvigil.com/</a>
      </td>
    </tr>
  </tbody>
</table>

The public RPC is not recommended because the rate limit is not high enough to access the Superfluid Dashboard. 

### Matic-Mainnet

To use Matic-Mainnet with Superfluid, you'll need a RPC URL to connect your metamask or application to a Polygon node.

<table>
  <thead>
    <tr>
      <th style="text-align:left">NetworkName</th>
      <th style="text-align:left"><b>Mumbai</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">ParentChain</td>
      <td style="text-align:left">Ethereum Mainnet</td>
    </tr>
    <tr>
      <td style="text-align:left">chainId</td>
      <td style="text-align:left">137</td>
    </tr>
    <tr>
      <td style="text-align:left">Gas token</td>
      <td style="text-align:left">Matic token</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC</td>
      <td style="text-align:left">
        <p>
          <b>(Option 1) Use Superfluid Public RPC Endpoint</b>
          <p>
            <br />&#x26A0;<em> Warning, only metamasks extensions on Firefox and Chrome are supported</em>
          </p>
          <code>https://7umjaj2e9d.execute-api.eu-west-2.amazonaws.com/development/matic</code>
        </p>
        <br/>
        <p>
          <b>(Option 2)Get a free RPC URL here:  </b>
          <p>
            <br />&#x26A0;<em> Warning, there may be rate limit issue, see "Troubleshooting"</em>
          </p>
          <code>https://rpc.maticvigil.com/</code>
        </p>
        <br/>
        <p>
          <b>(Option 3)</b>
          <p>
            <br />&#x26A0;<em> Warning, these public RPC endpoints are not recommended to use with Superfluid:</em>
          </p>
          <code>https://rpc-mainnet.maticvigil.com/</code> or <br />
          <code>https://rpc-mainnet.matic.today</code>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Block Explorer</td>
      <td style="text-align:left"><a href="https://explorer-mainnet.maticvigil.com/">https://explorer-mainnet.maticvigil.com/</a>
      </td>
    </tr>
  </tbody>
</table>

## Troubleshooting

#### - JSON-RPC error eth\_getLogs "Blockheight too far in the past"

What's happening is that the `@superfluid-finance/js-sdk` is calling too many `eth_getLogs` and hitting the maximum rate limit for your RPC connection.  

1. Obtain a better RPC URL from [https://rpc.maticvigil.com/](https://rpc.maticvigil.com/)
2. Don't use the functions `user.details` or `sf.cfa.listFlows`\(there may be others as well\)

