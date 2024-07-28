import React from "react";
import Layout from "./components/Layout";
import Chat from "./components/Chat";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Chat />
    </Layout>
  );
};

export default HomePage;
