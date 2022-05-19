import React from "react";
import Layout from "../components/Layout";
import CreateGameComponent from "../components/CreateGame";

const CreateGame = () => {
  return (
    <Layout title="Create game">
      <CreateGameComponent isGame />
    </Layout>
  );
};

export default CreateGame;
