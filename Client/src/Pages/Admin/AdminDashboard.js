import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { useAuth } from "../../context/authContext";
import styled from "styled-components";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard - TechEmporium"}>
      <Wrapper className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Details</h1>

            <div className="border shadow mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="user-name">
                      Name
                    </th>
                    <th scope="col" className="user-email">
                      Email
                    </th>
                    <th className="table-date" scope="col">
                      Phone no
                    </th>
                    <th scope="col" className="user-address">
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="user-name">{auth.user.name}</td>
                    <td className="user-email">{auth.user.email}</td>
                    <td className="table-phone">{auth.user.phone}</td>
                    <td className="user-address">{auth.user.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  h1 {
    text-align: center;
  }

  padding: 2rem;

  @media only screen and (max-width: 767px) and (min-width: 320px) {
    padding: 0.5rem !important;
    margin-top: 20px;

    .user-email {
      display: none;
    }

    h1 {
      margin-top: 20px;
    }
  }
`;

export default AdminDashboard;
