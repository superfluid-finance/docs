import React from "react";
import { Button, Spinner } from "react-bootstrap";

const LoadingButton = ({ isEnabled, loadingText, displayText }) => {
  return (
    <>
      {" "}
      {isEnabled ? (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span style={{ marginLeft: "4px", paddingLeft: "4px" }}>
            {loadingText}
          </span>
        </Button>
      ) : (
        <Button variant="primary" type="submit">
          {displayText}
        </Button>
      )}
    </>
  );
};

export default LoadingButton;
