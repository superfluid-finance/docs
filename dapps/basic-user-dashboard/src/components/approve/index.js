import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import LoadingButton from "../LoadingButton";
import * as Yup from "yup";
import BN from "bn.js";
import { useAccountContext } from "../../contexts/account/AccountContext";
import { approve } from "../../contexts/account/AccountService";

const Approve = ({ onHide }) => {
  const { selectedAccount, drizzle } = useAccountContext();
  const [isLoading, setIsLoading] = useState(false);

  const ApproveSchema = Yup.object().shape({
    fromAccount: Yup.string()
      .min(2, "Please enter valid address")
      .required("Address is required"),
    amount: Yup.number()
      .min(1, "Please enter valid amount")
      .required("Amount is required"),
  });

  return (
    <div>
      <div>
        {selectedAccount ? (
          <div style={{ maxWidth: "60%", margin: "10px", padding: "10px" }}>
            <Formik
              initialValues={{
                fromAccount: selectedAccount,
                amount: "1",
              }}
              validationSchema={ApproveSchema}
              onSubmit={(values, actions) => {
                setIsLoading(true);
                actions.setSubmitting(false);

                approve(
                  values.fromAccount,
                  drizzle,
                  drizzle.web3.utils.toWei(new BN(values.amount), "ether")
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
                    <Form.Label>From Account</Form.Label>
                    <Form.Control
                      disabled={true}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.fromAccount}
                      name="fromAccount"
                      type="text"
                    ></Form.Control>
                    {props.errors.fromAccount && props.touched.fromAccount ? (
                      <div>{props.errors.fromAccount}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      onChange={props.handleChange}
                      value={props.values.amount}
                      name="amount"
                      pattern="[0-9]{0,5}"
                      type="number"
                      step={1}
                      min={1}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                      Please enter value for approval
                    </Form.Text>
                    {props.errors.amount && props.touched.amount ? (
                      <div>{props.errors.amount}</div>
                    ) : null}
                  </Form.Group>
                  <LoadingButton
                    loadingText={"Approving..."}
                    isEnabled={isLoading}
                    displayText={"Approve"}
                  />{" "}
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

export default Approve;
