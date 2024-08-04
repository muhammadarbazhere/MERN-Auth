import React, { useEffect, useState } from "react";
import "../Styles/CartStyle.css";
import Layout from "../Components/Layouts/Layout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import FormatPrice from "../Helper/FormatPrice";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += parseFloat(item.price);
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Total shipping fee
  const totalShippingFee = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += parseFloat(item.shipping_fee);
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // total amount
  const totalAmount = () => {
    try {
      const totalPriceValue = totalPrice();
      const totalShippingFeeValue = totalShippingFee();
      const total = totalPriceValue + totalShippingFeeValue;
      return total.toLocaleString("en-PK", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      console.log("paymentdata:", data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // remove all items
  const removeItems = (pid) => {
    try {
      setCart([]);
      // Clear the cart in localStorage
      localStorage.removeItem("cart");
    } catch (error) {
      console.log(error);
    }
  };

  if (cart?.length === 0) {
    return (
      <Layout title={"Cart - TechEmporium"}>
        <div className="container cart-page" style={{ padding: "0px" }}>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mb-1">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <h3 className="text-center" style={{ paddingTop: "10px" }}>
                {cart?.length
                  ? `You have ${cart.length} items in your cart${
                      auth?.token ? "" : ", And please login to checkout"
                    }`
                  : " Your Cart Is Empty"}
              </h3>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={"Cart - TechEmporium"}>
      <div className="container cart-page" style={{ padding: "0px" }}>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h3 className="text-center" style={{ paddingTop: "10px" }}>
              {cart?.length
                ? `You have ${cart.length} items in your cart${
                    auth?.token ? "" : ", And please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-3">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height={"100%"}
                  />
                </div>
                <div className="col-md-9" style={{ paddingLeft: "30px" }}>
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 65)}...</p>
                  <p>
                    <FormatPrice price={p.price} />
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-btn">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>

              <button className="btn btn-danger" onClick={removeItems}>
                Clear Cart
              </button>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            {/*<h4>Total : {totalPrice()} </h4>*/}
            <div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <p style={{ fontSize: "20px", fontWeight: "700" }}>Subtotal:</p>
                <p style={{ fontSize: "20px" }}>Rs {totalPrice()}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <p style={{ fontSize: "20px", fontWeight: "700" }}>
                  Shipping Fee:
                </p>
                <p style={{ fontSize: "20px" }}>Rs {totalShippingFee()}</p>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <p style={{ fontSize: "20px", fontWeight: "700" }}>
                  Order Total:
                </p>
                <p style={{ fontSize: "20px" }}>{totalAmount()}</p>
              </div>
              <br />
            </div>
            <hr />
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}

            {/*Payment code*/}

            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary mb-5"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
