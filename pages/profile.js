import React from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";

const Profile = () => {
  const { data: levels, mutate } = useSWR(`/games/css`);

  const handleDeleteLevel = (levelId) => {
    if (confirm("Are you sure?"))
      axios
        .delete(`/games/css/${levelId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })
        .then((res) => mutate(levels.filter((level) => level._id !== levelId)))
        .catch((err) => console.log(err.response));
  };

  return (
    <Layout title="Profile">
      <h2 className="text-xl font-semibold mb-4">Levels</h2>
      {levels?.map((level) => (
        <div
          key={level._id}
          className="bg-gray-100 rounded-xl p-2 pl-4 mb-3 flex flex-row items-center justify-between"
        >
          <h3 className="font-semibold">{level.name}</h3>
          <div className="flex flex-row">
            <Link href="">
              <a className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg">
                Edit
              </a>
            </Link>
            <button
              className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg ml-2"
              onClick={() => handleDeleteLevel(level._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Profile;
