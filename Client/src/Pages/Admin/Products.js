import Layout from "../../Components/Layouts/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in products...");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Update Products - TechEmporium"}>
      <Wrapper className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap products-fields">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{
                        borderBottom: "1px solid #dfdfdf",
                        minHeight: "300px",
                      }}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
padding: 2rem;

.products-fields{
  display: flex;
  justify-content: center;
}

@media only screen and (max-width: 1024px) and (min-width: 768px) {
  .products-fields{
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
  margin-top: 20px;
  padding: 0.5rem;

  .products-fields{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
  }

`;

export default Products;
