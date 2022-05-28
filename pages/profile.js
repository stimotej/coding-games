import { useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import Image from "next/image";
import axios from "axios";
import ThemeSelect from "../components/ThemeSelect";
import useUser from "../lib/useUser";

const Profile = () => {
  const { data: levels, mutate } = useSWR(`/css`);
  const { user, mutate: setUser } = useUser();

  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(user?.username || "");
  const [fullName, setFullName] = useState(user?.name || "");

  const handleDeleteLevel = (levelId) => {
    if (confirm("Are you sure?"))
      axios
        .delete(`/css/${levelId}`)
        .then((res) => mutate(levels.filter((level) => level._id !== levelId)))
        .catch((err) => console.log(err.response));
  };

  const handleSave = (e) => {
    e.preventDefault();
    var data = {};
    if (profileImage) {
      data = new FormData();
      data.append("username", username);
      data.append("name", fullName);
      data.append("image", profileImage);
    } else {
      data = { username, name: fullName };
    }
    console.log(data);
    axios
      .patch("/auth/profile", data)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  const [tab, setTab] = useState("profile");

  return (
    <Layout title="Profile">
      <div className="flex gap-6 w-full">
        <div className="w-1/4 sticky top-6">
          <div className="flex flex-col p-4 bg-white border dark:bg-secondary dark:border-0 rounded-lg">
            <button
              className={`p-3 my-1 w-full rounded-lg dark:text-white ${
                tab === "profile"
                  ? "bg-gray-100 dark:bg-secondary-light"
                  : "hover:bg-gray-100 hover:dark:bg-secondary-light"
              }`}
              onClick={() => setTab("profile")}
            >
              Profile
            </button>
            <hr />
            <button
              className={`p-3 my-1 w-full rounded-lg dark:text-white ${
                tab === "myGames"
                  ? "bg-gray-100 dark:bg-secondary-light"
                  : "hover:bg-gray-100 hover:dark:bg-secondary-light"
              }`}
              onClick={() => setTab("myGames")}
            >
              My Games
            </button>
            {user?.role === "Admin" && (
              <>
                <hr />
                <button
                  className={`p-3 my-1 w-full rounded-lg dark:text-white ${
                    tab === "admin"
                      ? "bg-gray-100 dark:bg-secondary-light"
                      : "hover:bg-gray-100 hover:dark:bg-secondary-light"
                  }`}
                  onClick={() => setTab("admin")}
                >
                  Admin
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-3/4">
          {tab === "myGames" ? (
            <></>
          ) : tab === "admin" ? (
            <>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Levels
              </h2>
              {levels?.map((level) => (
                <div
                  key={level._id}
                  className="bg-white dark:bg-secondary border dark:border-0 rounded-xl p-2 pl-4 mb-3 flex flex-row items-center justify-between"
                >
                  <h3 className="font-semibold dark:text-white">
                    Level {level.level}
                  </h3>
                  <div className="flex flex-row">
                    {/* <Link href="">
                      <a className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg">
                        Edit
                      </a>
                    </Link> */}
                    <button
                      className="bg-gray-100 dark:bg-secondary-light dark:text-white hover:bg-gray-200 py-2 px-4 rounded-lg ml-2"
                      onClick={() => handleDeleteLevel(level._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="">
              <form
                onSubmit={handleSave}
                className="border dark:border-0 bg-white dark:bg-secondary rounded-lg p-4 flex"
              >
                <label
                  htmlFor="profileImage"
                  className="block w-1/3 relative h-[200px]"
                >
                  <Image
                    src={
                      (typeof window !== "undefined" &&
                        profileImage &&
                        URL.createObjectURL(profileImage)) ||
                      user?.image ||
                      "/default_profile_image.png"
                    }
                    alt="Profile image"
                    layout="fill"
                    objectFit="contain"
                  />
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setProfileImage(e.target.files[0]);
                    console.log(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <button type="submit">Save</button>
              </form>

              <div className="dark:text-white mr-4">Select theme: </div>
              <ThemeSelect />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
