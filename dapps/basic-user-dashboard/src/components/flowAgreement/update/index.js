import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import LoadingButton from "../../LoadingButton";
import BN from "bn.js";
import { useAccountContext } from "../../../contexts/account/AccountContext";
import { update } from "../../../contexts/account/AccountService";

const UpdateFlow = ({ onHide, receiver }) => {
  const { selectedAccount, drizzle } = useAccountContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div>
        {selectedAccount ? (
          <div style={{ maxWidth: "60%", margin: "10px", padding: "10px" }}>
            <Formik
              initialValues={{
                fromAddress: selectedAccount,
                toAddress: receiver,
                amount: "1",
              }}
              validate={(values) => {
                let errors = {};

                if (!values.fromAddress) {
                  errors.fromAddress = "Sender address is required";
                }

                if (values.fromAddress) {
                  if (!drizzle.web3.utils.isAddress(values.fromAddress)) {
                    errors.toAddress = "Please enter valid sender address";
                  }
                }

                if (!values.toAddress) {
                  errors.toAddress = "Receiver address is required";
                }

                if (values.toAddress) {
                  if (!drizzle.web3.utils.isAddress(values.toAddress)) {
                    errors.toAddress = "Please enter valid receiver address";
                  }
                }

                if (!values.amount || values.amount <= 0) {
                  errors.amount = "Amount must be greater than 0";
                }

                return errors;
              }}
              onSubmit={(values, actions) => {
                setIsLoading(true);
                actions.setSubmitting(false);

                const convertedAmount = drizzle.web3.utils.toWei(
                  values.amount,
                  "ether"
                );
                const bnConverted = new BN(convertedAmount);

                update(
                  values.fromAddress,
                  drizzle,
                  values.toAddress,
                  bnConverted.div(new BN("86400"))
                )
                  .then((value) => {
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                  });
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <Form.Group>
                    <Form.Label>From Address</Form.Label>
                    <Form.Control
                      disabled={true}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.fromAddress}
                      name="fromAddress"
                      type="text"
                    ></Form.Control>
                    {props.errors.fromAddress && props.touched.fromAddress ? (
                      <div>{props.errors.fromAddress}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>To Address</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.toAddress}
                      name="toAddress"
                      type="text"
                    ></Form.Control>
                    {props.errors.toAddress && props.touched.toAddress ? (
                      <div>{props.errors.toAddress}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Amount (per day)</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.amount}
                      name="amount"
                      type="text"
                    ></Form.Control>
                    {props.errors.amount && props.touched.amount ? (
                      <div>{props.errors.amount}</div>
                    ) : null}
                  </Form.Group>
                  <LoadingButton
                    displayText={"Update"}
                    isEnabled={isLoading}
                    loadingText={"Updating flow..."}
                  ></LoadingButton>{" "}
                  <Button disabled={isLoading} onClick={onHide}>
                    Close
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default UpdateFlow;
