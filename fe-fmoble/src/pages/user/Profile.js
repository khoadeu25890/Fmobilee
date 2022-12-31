import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Space } from "antd";
import { Input } from "antd";
import FileUpload from "../../component/form/fileUpload";

const Profile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [open, setOpen] = useState(false);

  return (
    <section className="container-profile">
      <div className="pt-2 text-center">
        <h4>Thông tin tài khoản</h4>
        <span>
          <Button type="primary" onClick={() => setOpen(true)}>
            Thay đổi thông tin cá nhân
          </Button>
        </span>
      </div>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <form>
          <h4 className="text-center">Thông tin cá nhân</h4>
          <FileUpload />
          <Input placeholder="Basic usage" value={user?.name} />;
          <Input placeholder="Basic usage" value={user?.email} />;
          <Input placeholder="Basic usage" value={user?.address} />;
        </form>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className=" mb-4">
              <div className="card-img py-4">
                <img
                  src="https://img.favpng.com/17/24/10/computer-icons-user-profile-male-avatar-png-favpng-jhVtWQQbMdbcNCahLZztCF5wk.jpg"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">{user.name}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="my-4">
              <div className="">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0 fw-normal">Họ tên</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0 fw-normal">{user.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Số điện thoại</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">096459596</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Địa chỉ</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Hà Nội, Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
