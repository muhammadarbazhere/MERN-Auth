import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { MdDeleteForever } from "react-icons/md";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //  handle delete button
  const deleteUser = async (userId) => {
    try {
      let answer = window.prompt("Are you sure want to delete this user?");
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/auth/user/${userId}`);
      toast.success("User Deleted Successfully...");
      // Refresh the user list after deletion
      getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in delete user function...");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"All Users - TechEmporium"}>
      <Wrapper className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>

            {users?.map((u, i) => {
              return (
                <div className="border shadow mt-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
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
                        <th className="user-delete" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td className="user-name">{u.name}</td>
                        <td className="user-email">{u.email}</td>
                        <td className="table-date">{u.phone}</td>
                        <td className="user-address">{u.address}</td>
                        <td className="user-delete">
                          <MdDeleteForever
                            className="delete-btn"
                            onClick={() => deleteUser(u._id)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

padding:2rem;

h1{
  text-align : center;
}

  .delete-btn {
    font-size: 26px;
    color: #d50303;
    cursor: pointer;
  }

  .delete-btn:hover {
    font-size: 28px;
    color: #eb0606;
    cursor: pointer;
  }

  @media only screen and (max-width: 990px) and (min-width: 768px) {
    .user-address {
      display: none;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 320px) {

    
    padding: 0.5rem;
    margin-top: 20px;

    .user-email {
      display: none;
    }

    h1{
      margin-top : 20px;
    }

    .user-address {
      display: none;

  }
`;

export default Users;
