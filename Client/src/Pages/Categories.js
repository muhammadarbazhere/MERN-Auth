import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../Components/Layouts/Layout";
import "../Styles/CategoryProductStyle.css";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories - TechEmporium"}>
      <div className="container" style={{ padding: "0px" }}>
        <div
          className="row container"
          style={{ padding: "0px", margin: "0px" }}
        >
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn btn-primary">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
