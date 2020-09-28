import React from "react";
import { Button } from "react-bootstrap";
import { FlowType } from "../../../types/Action";
import { short } from "../../../uitls/AddressUtil";
import { formatRate } from "../../../uitls/RateConverterUtility";
import { remove } from "../../../contexts/account/AccountService";

export const fillTable = (
  type,
  data,
  drizzle,
  update: (receiver: string) => void,
  isDisabled
) => {
  return data ? (
    <div style={{ padding: "10px" }}>
      <h3>
        <b>Running {type} flows</b>
      </h3>
      {data.map((row, key) => (
        <div key={key} style={{ marginTop: "20px" }}>
          <p>
            <b>Sender</b>:
            <a
              href={`https://kovan.etherscan.io/address/${row.data.returnValues["sender"]}`}
            >
              {short(row.data.returnValues["sender"], drizzle.web3)}
            </a>
          </p>
          <p>
            <b>Receiver</b>:
            <a
              href={`https://kovan.etherscan.io/address/${row.data.returnValues["receiver"]}`}
            >
              {" "}
              {short(row.data.returnValues["receiver"], drizzle.web3)}
            </a>
          </p>
          <p>
            <b>Rate</b>:
            {new Number(
              drizzle.web3.utils.fromWei(
                formatRate(row.data.returnValues["flowRate"], "day"),
                "ether"
              )
            ).toFixed(4)}{" "}
            / day
          </p>
          <span>
            <Button
              disabled={type === FlowType.IN || isDisabled}
              onClick={() => update(row.data.returnValues["receiver"])}
              variant="primary"
            >
              Update
            </Button>{" "}
            <Button
              disabled={isDisabled}
              onClick={() =>
                remove(
                  row.data.returnValues["sender"],
                  drizzle,
                  row.data.returnValues["receiver"],
                  FlowType.OUT === type
                    ? row.data.returnValues["sender"]
                    : row.data.returnValues["receiver"]
                ).catch(console.error)
              }
              variant="primary"
            >
              Remove
            </Button>
          </span>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
};
