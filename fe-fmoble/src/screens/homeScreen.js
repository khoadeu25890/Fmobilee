import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../component/banner/banner";
import Products from "../component/Products";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { listProducts } from "../actions/productActions";
const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  return (
    <>
      <Banner />
      <Container>
        <h1 className="mt-3">Lastest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
