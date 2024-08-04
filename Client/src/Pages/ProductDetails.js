import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import "../Styles/ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";
import FormatPrice from "../Helper/FormatPrice";
import PageNavigation from "../Components/Layouts/PageNavigation";
import UpdateProduct from "./Admin/UpdateProduct";
import styled from "styled-components";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <PageNavigation title={product.name} />
      <Wrapper className="grid grid-two-column  px-lg-5 pt-lg-5">
        {/* Product Images */}
        <div className="product-image">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="auto"
            width={"350px"}
          />
        </div>

        {/* Product Data */}

        <div className="product-data">
          <h2 style={{ margin: "0px" }}> {product.name}</h2>
          <p className="product-data-price" style={{ margin: "0px" }}>
            MVP:
            <del>
              <FormatPrice price={product.price + 2500} />
            </del>
          </p>

          <p
            className="product-data-price product-data-real-price"
            style={{ margin: "0px" }}
          >
            Deal of the Day : <FormatPrice price={product.price} />
          </p>

          <p style={{ margin: "0px" }}>{product.description}</p>

          <div className="product-data-warranty">
            <div className="product-warranty-data">
              <TbTruckDelivery className="warranty-icon" />
              <p>Free Delivery</p>
            </div>

            <div className="product-warranty-data">
              <TbReplace className="warranty-icon" />
              <p>30 Days Replacement</p>
            </div>

            <div className="product-warranty-data">
              <TbTruckDelivery className="warranty-icon" />
              <p>Product Delivered </p>
            </div>

            <div className="product-warranty-data">
              <MdSecurity className="warranty-icon" />
              <p>2 Year Warranty </p>
            </div>
          </div>

          <div className="product-data-info">
            <p>
              Available:
              <span>
                {" "}
                {product.quantity > 0 ? "In Stock" : "Not Available"}
              </span>
            </p>

            <p>
              ID : <span> {product._id} </span>
            </p>

            <p>
              Brand :<span> {product.company} </span>
            </p>

            <p className="colors">
              Color :{" "}
              <button
                style={{ backgroundColor: product.color }}
                className="btnStyle active"
              ></button>
            </p>

            <button
              className="btn btn-secondary ms-1"
              style={{ display: product.quantity <= 0 ? "none" : "block" }}
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to cart successfully...");
                // navigate("/cart");
                console.log("addtocart:", cart);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </Wrapper>

      <hr />

      <Wrapper className="row" style={{ paddingLeft: "40px", width: "100%" }}>
        <h2 style={{ paddingBottom: "20px", textAlign: "center" }}>
          Similar Products
        </h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
                style={{
                  borderBottom: "1px solid #dbdbdb",
                  minHeight: "300px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">
                  {" "}
                  <FormatPrice price={p.price} />
                </p>

                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: auto;

    &:hover {
      opacity: 1;
    }
  }

  .colors {
    display: flex;
  }

  .active {
    opacity: 1;
    border: 1px solid;
  }
`;

export default ProductDetails;
