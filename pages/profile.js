import { useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import useUser from "../lib/useUser";
import {
  MdPerson,
  MdSportsEsports,
  MdAdminPanelSettings,
  MdAdd,
} from "react-icons/md";
import LevelCard from "../components/LevelCard";
import { useRouter } from "next/router";
import Modal from "../components/Modal";

const Profile = () => {
  const router = useRouter();

  const { user } = useUser();

  const { data: levels, mutate: mutateLevels } = useSWR(`/css`);
  const { data: games, mutate: mutateGames } = useSWR(`/games`);

  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState("profile");

  const handleDelete = () => {
    axios
      .delete(
        modal?.for === "level"
          ? `/css/${modal?.what?._id}`
          : `/games/${modal?.what?._id}`
      )
      .then((res) => {
        if (modal?.for === "level")
          mutateLevels(levels.filter((level) => level._id !== modal.what._id));
        else mutateGames(games.filter((game) => game._id !== modal.what._id));
        setModal(null);
      })
      .catch((err) => console.log(err.response));
  };

  const tabs = [
    { title: "Profile", value: "profile", icon: <MdPerson size={22} /> },
    {
      title: "My Games",
      value: "myGames",
      icon: <MdSportsEsports size={22} />,
    },
    {
      title: "Admin",
      value: "admin",
      adminOnly: true,
      icon: <MdAdminPanelSettings size={22} />,
    },
  ];

  return (
    <Layout title="Profile">
      <Modal
        visible={modal}
        setVisible={setModal}
        title={modal?.for === "level" ? "Delete level" : "Delete game"}
        content={`Are you sure you want to delete "${
          modal?.for === "level"
            ? `Level ${modal?.what?.level}`
            : modal?.what?.name
        }"?`}
        actionText="Delete"
        onClick={handleDelete}
      />

      <div className="flex gap-6 w-full">
        <div className="w-1/4">
          <Sidebar
            items={tabs}
            value={tab}
            onChange={setTab}
            className="sticky top-6"
            backText="Home"
            backHref="/"
            logout
          />
        </div>
        <div className="w-3/4">
          {tab === "myGames" ? (
            <>
              <div className="flex items-center justify-between bg-white border dark:border-0 p-4 rounded-lg dark:bg-secondary">
                <h3 className="flex items-center dark:text-white text-lg">
                  My Games
                </h3>
                <button
                  type="submit"
                  className="flex items-center py-2 px-5 rounded-full dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
                  onClick={() => router.push("/create-game")}
                >
                  <MdAdd size={22} className="mr-2" />
                  Create game
                </button>
              </div>
              {games?.filter((game) => game.createdBy._id === user?._id)
                ?.length <= 0 ? (
                <p className="text-gray-500 mt-6">You dont have games yet.</p>
              ) : (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {games
                    ?.filter((game) => game.createdBy._id === user?._id)
                    ?.map((game) => (
                      <LevelCard
                        key={game._id}
                        level={game}
                        isGame
                        deleteBtn
                        onDeleteClicked={() =>
                          setModal({ for: "game", what: game })
                        }
                      />
                    ))}
                </div>
              )}
            </>
          ) : tab === "admin" ? (
            <>
              <>
                <div className="flex items-center justify-between bg-white border dark:border-0 p-4 rounded-lg dark:bg-secondary">
                  <h3 className="flex items-center dark:text-white text-lg">
                    Levels
                  </h3>
                  <button
                    className="flex items-center py-2 px-5 rounded-full dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
                    onClick={() => router.push("/css/new-level")}
                  >
                    <MdAdd size={22} className="mr-2" />
                    Create level
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {levels?.map((level) => (
                    <LevelCard
                      key={level._id}
                      level={level}
                      deleteBtn
                      onDeleteClicked={() =>
                        setModal({ for: "level", what: level })
                      }
                      editBtn
                      onEditClicked={() => {
                        router.push({
                          pathname: "/css/edit-level",
                          query: { level: level.level },
                        });
                      }}
                    />
                  ))}
                </div>
              </>
            </>
          ) : (
            <>
              <div className="bg-white border dark:border-0 p-4 rounded-lg dark:bg-secondary">
                <div className="flex items-center">
                  <div className="block relative cursor-pointer h-[100px] w-[100px] bg-gray-100 dark:bg-secondary-light rounded-full">
                    <Image
                      src={user?.image || "/default_profile_image.png"}
                      alt="Profile image"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-3xl font-semibold dark:text-white mb-2">
                      {user?.name || user?.username}
                    </h3>
                  </div>
                  <Link href="/edit-profile">
                    <a
                      type="submit"
                      className="flex self-start flex-row items-center py-2 px-5 rounded-full dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
                    >
                      Edit profile
                    </a>
                  </Link>
                </div>
                <div className="flex items-center justify-evenly mt-6">
                  <div className="flex-1 border-r border-gray-200 dark:border-gray-600 text-center">
                    <p className="text-gray-500">Rank</p>
                    <p className="dark:text-white font-semibold text-lg">
                      {user?.rank || "Begginer"}
                    </p>
                  </div>
                  <div className="flex-1 border-r border-gray-200 dark:border-gray-600 text-center">
                    <p className="text-gray-500">Score</p>
                    <p className="dark:text-white font-semibold text-lg">
                      {user?.score || 0}
                    </p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-gray-500">Level</p>
                    <p className="dark:text-white font-semibold text-lg">
                      {user?.levelsPassed + 1 || 1}
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="flex items-center dark:text-white text-lg mt-6 mb-4">
                Top played
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {user?.played
                  ?.filter((item) => (item.game ? true : false))
                  ?.sort((a, b) => b.highestScore - a.highestScore)
                  ?.slice(0, 8)?.length <= 0 ? (
                  <p className="text-gray-500">No games played yet.</p>
                ) : (
                  user?.played
                    ?.filter((item) => (item.game ? true : false))
                    ?.sort((a, b) => b.highestScore - a.highestScore)
                    ?.slice(0, 8)
                    ?.map((game) => (
                      <LevelCard
                        key={game._id}
                        level={game.game}
                        score={game.highestScore}
                        isGame
                      />
                    ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
