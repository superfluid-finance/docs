---
description: Using Superfluid on Polygon network
---

# Polygon \(Matic\)

## Networks

If you want to learn more about Polygon network, such as websocket connections, the full documentation is here: [https://docs.matic.network/docs/develop/network-details/network](https://docs.matic.network/docs/develop/network-details/network)

The naming can be a little confusing. "**Matic**" is used to describe the _main network_ for Polygon. The _test network_ for Polygon is called "**Mumbai**".

### Matic-Mainnet

To use Matic-Mainnet with Superfluid, you'll need a **RPC URL** to connect your metamask or application to a Polygon node.

<table>
  <thead>
    <tr>
      <th style="text-align:left">NetworkName</th>
      <th style="text-align:left"><b>Matic (Mainnet)</b>
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
        <p> <b>(Option 1) Polygon RPC Project</b>
          <br />&#x26A0; <em>polygon-rpc.com aims to provide a fast and reliable RPC gateway to the Polygon network.</em> 
        </p>
        <p><code>https://polygon-rpc.com/</code>
        </p>
        <p> <b>(Option 2) Superfluid Public RPC Endpoint</b>
          <br />&#x26A0; <em>Warning, only metamasks extensions on Firefox and Chrome are supported</em> 
        </p>
        <p><code>https://rpc-endpoints.superfluid.dev/matic</code>
        </p>
        <p>&lt;code&gt;&lt;/code&gt;</p>
        <p> <b>(Option 3) Get your own free RPC</b>
          <br />&#x26A0; <em>Warning, there may be rate limit issue, see &quot;Troubleshooting&quot;</em>  <code>https://rpc.maticvigil.com/</code>
        </p>
        <p>&lt;code&gt;&lt;/code&gt;</p>
        <p> <b>(Option 4) Public RPC</b><code> </code>
          <br />&#x26A0; <em>Warning, these public RPC endpoints are not recommended to use with Superfluid:</em>
          <br
          /> <code>https://rpc-mainnet.maticvigil.com/</code> or
          <br /> <code>https://rpc-mainnet.matic.quiknode.pro</code> or
          <br /> <code>https://matic-mainnet.chainstacklabs.com</code> or
          <br /> <code>https://matic-mainnet-full-rpc.bwarelabs.com/</code> or
          <br /> <code>https://matic-mainnet-archive-rpc.bwarelabs.com</code>
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

## Mumbai Test Network

To use the Mumbai testnet with superfluid, you'll need a **RPC URL** to connect your metamask or application to a Mumbai node.

<table>
  <thead>
    <tr>
      <th style="text-align:left">NetworkName</th>
      <th style="text-align:left"><b>Matic (Mumbai)</b>
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
        <p> <b>(Option 1) Superfluid Public RPC Endpoint</b>
        </p>
        <p>&#x26A0; <em>Warning, only metamasks extensions on Firefox and Chrome are supported</em> 
        </p>
        <p><code>https://rpc-endpoints.superfluid.dev/mumbai</code>
        </p>
        <p>&lt;code&gt;&lt;/code&gt;</p>
        <p> <b>(Option 2) Get your own free RPC </b>
        </p>
        <p><code>https://rpc.maticvigil.com/</code>
          <br />
        </p>
        <p> <b>(Option 3) Public RPC</b>
          <br />&#x26A0; <em>Warning, these public RPC endpoints are not recommended to use with Superfluid:</em>
          <br
          /> <code>https://rpc-mumbai.maticvigil.com/</code> or
          <br /> <code>https://matic-mumbai.chainstacklabs.com</code> or
          <br /> <code>https://matic-testnet-archive-rpc.bwarelabs.com</code>
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

## Troubleshooting

#### - JSON-RPC error eth\_getLogs "Blockheight too far in the past"

What's happening is that the `@superfluid-finance/js-sdk` is calling too many `eth_getLogs` and hitting the maximum rate limit for your RPC connection.

1. Obtain a better RPC URL from [https://rpc.maticvigil.com/](https://rpc.maticvigil.com/)
2. Don't use the functions `user.details` or `sf.cfa.listFlows`\(there may be others as well\)

