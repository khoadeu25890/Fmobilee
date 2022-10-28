import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AdminNav from "../../component/adminNav/adminNavbar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../functions/category";

const Category = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => getCategories().then((c) => setCategories(c.data));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        if (err.response.status === 400) return toast.error(err.response.data);
      });
  };
  const CategoryForm = () => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            value={name}
            autoFocus
          />
          <br />
          <button className="btn btn-outline-primary">Save</button>
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <Container>
        <div className="row mt-4">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col text-center">
            {loading ? (
              <h4 className="text-danger">Loading..</h4>
            ) : (
              <h4>Create category</h4>
            )}
            {CategoryForm()}
            <hr />
            {JSON.stringify(categories)}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Category;
