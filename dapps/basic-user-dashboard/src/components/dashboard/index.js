import React, { useEffect, useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import { Actions } from "../../types/Action";
import { isValidAddress, short } from "../../uitls/AddressUtil";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import AccountBalance from "../accountBalance/accountBalance";
import { wad4human } from "@decentral.ee/web3-test-helpers";
import ListFlow from "../flowAgreement/list";
import { ActionModal } from "../ActionModal";
import Upgrade from "../upgrade";
import Approve from "../approve";
import UpdateFlow from "../flowAgreement/update";
import Mint from "../mint";
import { useAccountContext } from "../../contexts/account/AccountContext";
import { formatRate } from "../../uitls/RateConverterUtility";
import { useLocation } from "react-router-dom";

const { ContractData } = newContextComponents;

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {
  const [action, setAction] = useState(Actions.Mint);
  const [showModal, setShowModal] = useState();
  const [receiver, setReceiver] = useState("");
  const {
    drizzle,
    drizzleState,
    superFluidTokenAmount,
    selectedAccount,
    networkType,
    setSelectedAccount,
    isDisabled,
  } = useAccountContext();

  let query = useQuery();

  useEffect(() => {
    const queryAccount = query.get("account");
    if (
      queryAccount &&
      queryAccount !== null &&
      isValidAddress(queryAccount, drizzle.web3)
    )
      setSelectedAccount(queryAccount);
    else setSelectedAccount(drizzleState.accounts[0]);
  }, []);

  const performAction = (action, receiver: string) => {
    setReceiver(receiver);
    setShowModal(true);
    setAction(action);
  };

  const getChildren = (action, drizzle, drizzleState) => {
    switch (action) {
      case Actions.Mint:
        return <Mint onHide={() => setShowModal(false)}></Mint>;
      case Actions.Upgrade:
        return <Upgrade onHide={() => setShowModal(false)}></Upgrade>;
      case Actions.Approve:
        return <Approve onHide={() => setShowModal(false)}></Approve>;
      default:
        return (
          <UpdateFlow
            drizzle={drizzle}
            drizzleState={drizzleState}
            receiver={receiver}
            onHide={() => setShowModal(false)}
          ></UpdateFlow>
        );
    }
  };

  const markRateFlow = (rate) => {
    if (rate > 0) {
      return (
        <span style={{ color: "green" }}>
          {" "}
          {new Number(
            drizzle.web3.utils.fromWei(formatRate(rate, "day"), "ether")
          ).toFixed(4)}
        </span>
      );
    } else if (rate < 0) {
      return (
        <span style={{ color: "red" }}>
          {" "}
          {new Number(
            drizzle.web3.utils.fromWei(formatRate(rate, "day"), "ether")
          ).toFixed(4)}
        </span>
      );
    } else {
      return (
        <span style={{ color: "black" }}>
          {" "}
          {new Number(
            drizzle.web3.utils.fromWei(formatRate(rate, "day"), "ether")
          ).toFixed(4)}
        </span>
      );
    }
  };

  return typeof networkType !== "undefined" ? (
    <Container>
      <ActionModal header={action} show={showModal}>
        {getChildren(action, drizzle, drizzleState)}
      </ActionModal>

      <div style={{ margin: "10px", padding: "10px" }}>
        <span style={{ float: "left" }}>
          Connected to <b>Ethereum {networkType}</b>
        </span>
        <span style={{ float: "right" }}>
          <a href={`https://kovan.etherscan.io/address/${selectedAccount}`}>
            <i>{short(selectedAccount, drizzle.web3)}</i>
          </a>
        </span>
      </div>
      <br></br>

      <div style={{ margin: "20px", alignContent: "center" }}>
        <Row>
          <Col sm={4}>
            <Card>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <b>Account balance: </b>
                  <AccountBalance
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    account={selectedAccount}
                    render={(v) => wad4human(v)}
                  />{" "}
                  ETH
                </ListGroupItem>

                <ListGroupItem>
                  <b>Test Token: </b>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TestToken"
                    method="balanceOf"
                    methodArgs={[selectedAccount]}
                    render={(v) => wad4human(v)}
                  />
                </ListGroupItem>

                <ListGroupItem>
                  <b>Allowance: </b>
                  {drizzleState.currentBlock.timestamp ? (
                    <ContractData
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      contract="TestToken"
                      method="allowance"
                      methodArgs={[
                        selectedAccount,
                        drizzle.contracts.SuperTestToken.address,
                      ]}
                      render={(v) => wad4human(v)}
                    />
                  ) : (
                    0.0
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <b>Super Token: </b> {superFluidTokenAmount}
                </ListGroupItem>
                <ListGroupItem>
                  <b>Net Flow Rate: </b>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="FlowAgreement"
                    method="getNetFlow"
                    methodArgs={[
                      drizzle.contracts.SuperTestToken.address,
                      selectedAccount,
                    ]}
                    render={(v) => markRateFlow(v)}
                  />{" "}
                  / day
                </ListGroupItem>
              </ListGroup>
              <Card.Footer>
                <small className="text-muted">
                  Last block time: {drizzleState.currentBlock.timestamp}
                </small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Row>
              <div style={{ margin: "10px" }}>
                {/*
                                    <h3><b>Actions</b></h3>
*/}
                <span>
                  <Button
                    disabled={isDisabled}
                    onClick={() => performAction(Actions.UpdateFlow)}
                  >
                    {" "}
                    add flow{" "}
                  </Button>
                </span>
                <span>
                  {" "}
                  <Button
                    disabled={isDisabled}
                    onClick={() => performAction(Actions.Mint)}
                  >
                    {" "}
                    mint token{" "}
                  </Button>
                </span>
                <span>
                  {" "}
                  <Button
                    disabled={isDisabled}
                    onClick={() => performAction(Actions.Approve)}
                  >
                    {" "}
                    approve token{" "}
                  </Button>
                </span>
                <span>
                  {" "}
                  <Button
                    disabled={isDisabled}
                    onClick={() => performAction(Actions.Upgrade)}
                  >
                    {" "}
                    upgrade token{" "}
                  </Button>
                </span>
              </div>
            </Row>
            <Row>
              <div style={{ margin: "10px", padding: "10px" }}>
                <ListFlow
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  update={(receiver: string) =>
                    performAction(Actions.UpdateFlow, receiver)
                  }
                ></ListFlow>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  ) : (
    <div>Loading ...</div>
  );
};

export default Dashboard;
