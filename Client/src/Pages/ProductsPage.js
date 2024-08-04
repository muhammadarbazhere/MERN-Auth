import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { Checkbox, Radio, Spin } from "antd";
import { Prices } from "../Components/Layouts/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import "../Styles/ProductsPageStyle.css";
import toast from "react-hot-toast";
import FormatPrice from "../Helper/FormatPrice";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false); // State to track filtering

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Fetch total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products based on page number
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product/");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter products by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Filter products by category and price
  const filterProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setLoading(false);
      setProducts(data?.products);
      setFiltering(true); // Set filtering state to true
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Handle price filter change
  const handlePriceChange = (e) => {
    setRadio(e.target.value);
  };

  // Update Product API

  useEffect(() => {
    if (!checked.length && !radio) {
      getAllProducts();
      setFiltering(false); // Set filtering state to false
    } else {
      filterProducts();
    }
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Shop now"}>
      <div className="container-fluid p-5 product-page">
        <div className="row rows">
          {/* Category filter */}
          <div className="col-md-3 filter-section">
            <h4>Filter By Category</h4>
            <div className="d-flex flex-column check-box">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  style={{ marginLeft: "0px" }}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* Price filter */}
            <h4 className="mt-4">Filter By Prices</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={handlePriceChange} value={radio}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            {/* Filter Reset Button */}
            <div className="mt-4">
              <button
                className="btn btn-danger px-4 py-2"
                onClick={() => {
                  setChecked([]);
                  setRadio("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          {/* Product display */}
          <div className="col-md-9 product-section">
            <h1 className="text-center">All Products</h1>
            <div className="products-adjustment">
              {loading ? (
                <Spin
                  size="large"
                  style={{ marginTop: "170px", marginLeft: "400px" }}
                />
              ) : (
                products?.map((p) => (
                  <div
                    className="card m-2 cards"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{
                        borderBottom: "1px solid #dbdbdb",
                        minHeight: "300px",
                      }}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">
                        <FormatPrice price={p.price} />
                      </p>
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>

                      {/* <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          // Check if the product quantity is greater than 0
                          if (p.quantity > 0) {
                            // Decrease the product quantity
                            const updatedProducts = products.map((product) => {
                              if (product._id === p._id) {
                                return {
                                  ...product,
                                  quantity: product.quantity - 1,
                                };
                              }
                              return product;
                            });

                            // Update the state with the new product quantities
                            setProducts(updatedProducts);

                            // Add the product to the cart
                            setCart([...cart, p]);

                            // Update local storage
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );

                            // Show success message
                            toast.success("Item added to cart successfully...");
                          } else {
                            // Product is sold out
                            toast.error("Product Sold...");
                          }
                        }}
                      >
                        Add To Cart
                      </button>*/}

                      <button
                        className="btn btn-secondary ms-1"
                        // style={{ display: p.quantity <= 0 ? "none" : "block" }}
                        onClick={() => {
                          // Check if the product quantity is greater than 0
                          if (p.quantity > 0) {
                            // Decrease the product quantity
                            const updatedProducts = products.map((product) => {
                              if (product._id === p._id) {
                                return {
                                  ...product,
                                  quantity: product.quantity - 1,
                                };
                              }
                              return product;
                            });

                            // Update the state with the new product quantities
                            setProducts(updatedProducts);

                            // Add the product to the cart
                            setCart([...cart, p]);

                            // Update local storage
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );

                            // Show success message
                            toast.success("Item added to cart successfully...");
                          } else {
                            // Product is sold out
                            toast.error("Product Unavailable...");
                          }
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
