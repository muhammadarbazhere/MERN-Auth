
import React, { useState, useEffect } from "react";
import UserMenu from "../../Components/Layouts/UserMenu";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import styled from "styled-components";
import FormatPrice from "../../Helper/FormatPrice";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders - TechEmporium"}>
      <Wrapper className="container-flui dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow mt-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th className="table-date" scope="col">
                          {" "}
                          Date
                        </th>
                        <th scope="col">Payment</th>
                        <th className="table-quantity" scope="col">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td className="table-date">
                          {moment(o?.createAt).format("YYYY-MM-DD")}
                        </td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td className="table-quantity">
                          {o?.products?.length}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container" style={{ padding: "0px" }}>
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-2 ">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100%"
                            height={"100%"}
                          />
                        </div>
                        <div className="col-md-8 px-5 ">
                          <h4>{p.name}</h4>
                          <p>{p.description.substring(0, 70)}....</p>
                          <h6>
                            <FormatPrice price={p.price} />
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  padding: 2rem;

  @media only screen and (max-width: 990px) and (min-width: 768px) {
    .card {
      // width: 100%;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 320px) {
    padding: 0.5rem;
    margin-top: 20px;

    .table-date {
      display: none;
    }

    .table-quantity {
      display: none;
    }
  }
`;

export default Orders;
