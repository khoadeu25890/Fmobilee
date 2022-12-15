import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getCategories } from "../../functions/category";
import { getUserCart } from "../../functions/user";
import Search from "../form/Search";
import "./header.css";
const Header = () => {
  const [categories, setCategories] = useState([]);
  const [cartDB, setCartDB] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const logout = () => {
    firebase.auth().signOut();
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history("/");
  };

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
    const getToken = localStorage.getItem("token");
    getUserCart(getToken).then((e) => {
      setCartDB(e.data.products);
    });
  }, []);
  return (
    <div className="fixed-top ">
      <Navbar variant="light">
        <Container>
          <Navbar.Brand>
            <Link to="/">Fmobile</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-xl" />
          <Nav as="ul" className="ulHeader ml-auto mt-2">
            <Search />
            <Nav.Link href="/gio-hang" className="icon-cart">
              <i className="fas fa-shopping-cart"></i>
              <Badge bg="none">{cartDB.length}</Badge>
            </Nav.Link>

            <div className="dropdown">
              {/* nếu user không tồn tai */}
              {!user?.email && (
                <button className="dropbtn">
                  <i className=" fas fa-user"></i>
                </button>
              )}
              <div className="text-white pl-2 pt-3">
                {user?.email && user?.email.split("@")[0]}
              </div>
              {!user?.email && (
                <div className="dropdown-content">
                  <Link to="/register">đăng ký</Link>
                  <Link to="/login">đăng nhập</Link>
                </div>
              )}
              {/* Nếu user có tồn tại  */}
              {user?.email && user?.role === "subscriber" && (
                <div className="dropdown-content">
                  <Link to="/" onClick={logout}>
                    đăng xuất
                  </Link>
                  <Link to={"/user/history"}>Settings</Link>
                </div>
              )}

              {user?.email && user?.role === "admin" && (
                <div className="dropdown-content">
                  <Link to="/" onClick={logout}>
                    đăng xuất
                  </Link>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </div>
              )}
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Nav>
        </Container>
      </Navbar>
      <Navbar
        className="nav-child"
        variant="dark"
        expand="lg"
        collapseOnSelect="false"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse className="basic-navbar-nav justify-content-center">
          <Nav as="ul" className="Ul">
            {categories.map((c) => (
              <Nav.Item as="li" className="LI" key={c._id}>
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
