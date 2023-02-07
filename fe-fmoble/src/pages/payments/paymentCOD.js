import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Modal, Result } from "antd";

import "./payment.css";

import { getUserCart } from "../../functions/user";
import { createBill } from "../../functions/Bill";
import {
  getAddressSesstionStorage,
  removeAddressLocalStorage,
} from "../../utils/functionHelp";
//load stripe outside of components render to avoid
const PaymentCOD = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { handleSubmit, register, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(
    JSON.parse(sessionStorage.getItem("address"))
  );
  const [idCart, setIdCard] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFail, setisModalFail] = useState(false);
  const navigate = useNavigate();

  //call APi return Vnpay
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    getUserCart(getToken).then((res) => {
      setProducts(res.data.products);
      setIdCard(res.data._id);
      reset({ ...res.data.products, address });
      console.log("res.data", res.data);
      let totalCard = 0;
      setTotal(
        res.data.products.map(
          (i) => (totalCard += +i?.product?.price * +i?.count)
        )
      );
      setTotal(totalCard);
    });

    console.log("getAddressLocalStorage", getAddressSesstionStorage);
  }, []);
  console.log("products", products);

  //Handle SUbmit form
  const onSubmit = async (data) => {
    const newData = {
      ...data,
      orderdBy: user._id,
      idCart: idCart,
      username: address.username,
      email: address.email,
      phoneNumber: address.phoneNumber,
      address: address.address,
      billTotal: total,
      products: products.map((product) => product.product),
      images: products.map((product) => product.images),
      color: products.map((product) => product.color),
    };
    console.log(newData);
    const status = await createBill(newData);
    if (status === 200) {
      showModal();
    } else {
      showModalFail();
    }
  };
  const showModalFail = () => {
    setisModalFail(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    sessionStorage.removeItem("address");
    navigate("/");
  };
  const handleOkFail = () => {
    setisModalFail(false);
    navigate("/");
  };

  const handleCancelFail = () => {
    setisModalFail(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRedirect = () => {
    navigate("/");
  };
  return (
    <>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Result
          status="success"
          title="Đơn hàng đã được xác nhận thành công"
          subTitle="Đơn hàng của quý khách đã được xác nhận thành công, cùng mua sắm tiếp nhé"
          extra={[<Button key="buy">Mua tiếp</Button>]}
        />
        ;
      </Modal>
      <Modal open={isModalFail} onOk={handleOkFail} onCancel={handleCancelFail}>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Link to={"/"}>
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </Modal>
      <div className="container p-5 ">
        <h2 className="text-center">Đơn Hàng Thanh Toán</h2>
        <div className="pt-4 shadow p-3 mb-5 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded container">
            <div className="col">
              {products &&
                products?.map((p, i) => (
                  <div className="row" key={i}>
                    <div className="col-lg-2 ">
                      <img
                        src={p.images && p.images.length ? p.images[0].url : ""}
                        style={{ height: "120px", objectFit: "cover" }}
                        className="m-2"
                      />
                      <input
                        className="input-bill-title"
                        type="text"
                        {...register("images")}
                      />
                    </div>
                    <div className="col-lg-7">
                      <span className="input-bill-title">
                        {p?.product.title}
                      </span>
                      <input
                        className="input-bill-title"
                        type="text"
                        {...register("title")}
                      />
                      <br />
                      Màu sắc:
                      {p?.color}
                      <br />X {p?.count}
                    </div>
                    <div className="col-lg-3">
                      {p?.product?.price * p?.count}
                      <br />
                    </div>
                  </div>
                ))}

              <div>
                <span className="bill">
                  Tên người đặt hàng
                  <input
                    className="input-bill"
                    type="text"
                    {...register("username")}
                    value={address?.username}
                  />
                </span>
                <br />
                <span className="bill">
                  Email:
                  <input
                    className="input-bill"
                    type="text"
                    {...register("email")}
                    value={address?.email}
                  />
                </span>
                <br />
                <span className="bill">
                  Số điện thoại {address?.phoneNumber}
                </span>
                <br />
                <span className="bill">Địa chỉ: {address?.address}</span>
              </div>

              <div>
                <span className="bill" hidden>
                  Trạng thái đơn hàng:
                  <input
                    className="input-bill"
                    type="text"
                    {...register("status")}
                    value={"6391f4358e713e3070f753bb"}
                    hidden
                  />
                </span>
              </div>

              <hr />
              <div>
                <div>
                  <span className="bill">
                    Mã giao dịch:
                    <input
                      className="input-bill"
                      type="text"
                      {...register("tradingCode")}
                      value={Math.floor(Math.random() * 10000000)}
                    />
                  </span>
                </div>
              </div>
              <div className="row mt-3 ">
                <div className="col-lg-9 col-2">
                  <span className="bill">Tổng hóa đơn thanh toán</span>
                </div>
                <div className="col-3 text-success">
                  <input
                    className="input-bill-total"
                    type="number"
                    {...register("billTotal")}
                    value={total}
                  />
                </div>
              </div>
              <div className="text-center mt-5">
                <button className="btn btn-success text-center rounded">
                  Xác nhận thanh toán
                </button>
                <button
                  onClick={handleRedirect}
                  className="btn btn-warning text-center rounded ml-3">
                  Hủy thanh toán
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentCOD;