import React from "react";
import Layout from "../Components/Layouts/Layout";
import { useAuth } from "../context/authContext";
import HeroSection from "../Components/Layouts/HeroSection";
import Services from "../Components/Layouts/Services";
import Trusted from "../Components/Layouts/Trusted";

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Home - TechEmporium"}>
      <HeroSection />
      <Services />
      <Trusted />
    </Layout>
  );
};

export default Home;
