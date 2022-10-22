import firebase from "firebase";
import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Fmobile</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/gio-hang">
                <i className="px-1 fas fa-shopping-cart"></i>
                {/* <div className="counter_cart">
                  <span className="">0</span>
                </div> */}
                <Badge bg="dark ">0</Badge>
              </Nav.Link>

              <div>
                <Link to="/register">đăng ký</Link>
              </div>

              <div className="dropdown">
                <button className="dropbtn">
                  <i className="px-1 fas fa-user"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={""} onClick={logout}>
                    Đăng xuất
                  </Link>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
