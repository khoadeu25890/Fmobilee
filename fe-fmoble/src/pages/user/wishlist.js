import React from "react";
import { Container } from "react-bootstrap";
import UserNavbar from "./userNavbar";
const Wishlist = () => {
  return (
    <div>
      <Container>
        <div className="row mt-4">
          <div className="col-md-2">
            <UserNavbar />
          </div>
          <div className="col text-center">user Wishlist page</div>
        </div>
      </Container>
    </div>
  );
};

export default Wishlist;
