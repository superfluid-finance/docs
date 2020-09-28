import React, { useEffect, useState } from "react";
import { fillTable } from "./helper";
import { Row } from "react-bootstrap";
import { FlowType } from "../../../types/Action";
import { useAccountContext } from "../../../contexts/account/AccountContext";
import { listEvents } from "../../../contexts/account/AccountService";

const ListFlow = ({ drizzle, drizzleState, update }) => {
  const [outFlow, setOutFlow] = useState([]);
  const [inFlow, setInFlow] = useState([]);

  const { selectedAccount, isDisabled } = useAccountContext();

  useEffect(() => {
    listEvents(drizzle, selectedAccount)
      .then((data) => {
        setOutFlow(data.out);
        setInFlow(data.in);
      })
      .catch(console.error);
  }, [drizzleState.currentBlock.timestamp]);

  return (
    <div style={{ margin: "10px", padding: "10px" }}>
      <Row>
        {outFlow.length > 0 ? (
          fillTable(FlowType.OUT, outFlow, drizzle, update, isDisabled)
        ) : (
          <div></div>
        )}
        {inFlow.length > 0 ? (
          fillTable(FlowType.IN, inFlow, drizzle, update, isDisabled)
        ) : (
          <div></div>
        )}
      </Row>
    </div>
  );
};

export default ListFlow;
