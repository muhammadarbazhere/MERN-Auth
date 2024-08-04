import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [color, setColor] = useState("");

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category...");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // handle create products
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("shipping_fee", shippingFee);
      productData.append("color", color);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      console.log("Data:", data);

      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in product create...");
    }
  };

  return (
    <Layout title={"Create Product - TechEmporium"}>
      <Wrapper className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 create-products">
            <h1>Create Product</h1>
            <div className="m-1 w-75 product-creation">
              <Select
                bordered={false}
                placeholder="Select a Category..."
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-image"
                      height={"150px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name..."
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={color}
                  placeholder="Write a color name..."
                  className="form-control"
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price..."
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write Quantity of Product..."
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={shippingFee}
                  placeholder="Write Shipping Fee"
                  className="form-control"
                  onChange={(e) => setShippingFee(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping..."
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  padding: 2rem;

  .create-products {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
  }

  .product-creation {
    width: 75% !important;
  }

  .create-products h1 {
    text-align: center;
  }

  @media only screen and (max-width: 767px) and (min-width: 320px) {
    margin-top: 20px;
    padding: 0.5rem;

    .product-creation {
      width: 100% !important;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default CreateProduct;
