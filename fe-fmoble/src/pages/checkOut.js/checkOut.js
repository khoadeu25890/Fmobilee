import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCash } from "../../component/formatCash";
import { getUserCart } from "../../functions/user";

const CheckOut = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  // const getToken = localStorage.getItem("token");
  // console.log(getToken);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    getUserCart(getToken).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Thanh Toán Đơn Hàng</h2>
      </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          {JSON.stringify(products)}
          {/* bug ở đây---- bạn xử lý thêm nhé */}
          {products.map((p, i) => (
            <>
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Giỏ hàng</span>
                <span className="badge badge-secondary badge-pill">
                  {p.length}
                </span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{p.title}</h6>
                    <small className="text-muted">{p.title}</small>
                  </div>
                  <span className="text-muted">{formatCash(`${total}đ`)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Mã giảm giá</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">-$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>{formatCash(`${total}đ`)}</strong>
                </li>
              </ul>
            </>
          ))}
          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Mã giảm giá..."
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  Áp dụng
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Thông Tin Đặt hàng</h4>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">Họ Tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Họ Tên"
                  defaultValue
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Thành phố/Tỉnh</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required
                >
                  <option value>Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">Quận/Huyện</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required
                >
                  <option value>Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Phường/Xã</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder="Phường Xã"
                  required
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="same-address"
              />
              <label className="custom-control-label" htmlFor="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="save-info"
              />
              <label className="custom-control-label" htmlFor="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="mb-4" />
            <h4 className="mb-3">Thanh toán online</h4>
            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  defaultChecked
                  required
                />
                <label className="custom-control-label" htmlFor="credit">
                  Credit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required
                />
                <label className="custom-control-label" htmlFor="debit">
                  Debit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required
                />
                <label className="custom-control-label" htmlFor="paypal">
                  PayPal
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder="Tên Chủ Thẻ"
                  required
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">Name on card is required</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder="Số Thẻ"
                  required
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  required
                />
                <div className="invalid-feedback">Expiration date required</div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-cvv">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  required
                />
                <div className="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;