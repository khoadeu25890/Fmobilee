import React from "react";
import { Container } from "react-bootstrap";
import UserNavbar from "./userNavbar";
const PassWord = () => {
  return (
    <div>
      <Container>
        <div className="row mt-4">
          <div className="col-md-2">
            <UserNavbar />
          </div>
          <div className="col text-center">user password update page</div>
        </div>
      </Container>
    </div>
  );
};

export default PassWord;
