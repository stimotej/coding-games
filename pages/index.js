import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import Leaderboard from "../components/Leaderboard";
import { MdAdd, MdInfoOutline, MdArrowRight } from "react-icons/md";
import LevelCard from "../components/LevelCard";
import InfoModal from "../components/InfoModal";
import Image from "next/image";

export default function Home() {
  const { data: games } = useSWR("/games");
  const { data: levels } = useSWR("/css");
  const { user } = useUser();

  const [infoModal, setInfoModal] = useState(false);

  return (
    <Layout title="Home">
      <div className="flex flex-row">
        {/* <button
          onClick={() => {
            compare("faviconds.jpg", "favicond.jpg", function (result) {
              console.log(Number((100 - result).toFixed(0)) + "%");
            });
          }}
        >
          Compare
        </button> */}
        <div className="w-3/4">
          {!!user && (
            <div className="flex flex-row mb-6">
              <div className="flex bg-blue-500 dark:bg-blue-800 text-white rounded-lg w-1/4">
                <div className="flex-1 py-4 px-6">
                  <span className="text-blue-200 uppercase text-sm">Rank</span>
                  <strong className="text-xl mt-2 flex">{user?.rank}</strong>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center justify-center h-full bg-blue-600 hover:bg-blue-600/50 dark:bg-blue-700 dark:hover:bg-blue-600 p-4 rounded-r-lg"
                    onClick={() => setInfoModal("rank")}
                  >
                    <MdInfoOutline size={24} />
                  </button>
                  <InfoModal
                    visible={infoModal === "rank"}
                    setVisible={setInfoModal}
                    title="Ranks"
                    wide
                    content={
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-black dark:text-white">Begginer</p>
                          <p className="text-sm mt-1">{"< 20000"}</p>
                        </div>
                        <MdArrowRight size={22} />
                        <div className="text-center">
                          <p className="text-black dark:text-white">Junior</p>
                          <p className="text-sm mt-1">{"< 80000"}</p>
                        </div>
                        <MdArrowRight size={22} />
                        <div className="text-center">
                          <p className="text-black dark:text-white">Mid</p>
                          <p className="text-sm mt-1">{"< 150000"}</p>
                        </div>
                        <MdArrowRight size={22} />
                        <div className="text-center">
                          <p className="text-black dark:text-white">Senior</p>
                          <p className="text-sm mt-1">{"> 150000"}</p>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="flex ml-4 bg-red-500 dark:bg-red-800 text-white rounded-lg w-1/4">
                <div className="flex-1 py-4 px-6">
                  <span className="text-red-200 uppercase text-sm">Score</span>{" "}
                  <strong className="text-xl mt-2 flex">{user?.score}</strong>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center justify-center h-full bg-red-600 hover:bg-red-600/50 dark:bg-red-700 dark:hover:bg-red-600 p-4 rounded-r-lg"
                    onClick={() => setInfoModal("score")}
                  >
                    <MdInfoOutline size={24} />
                  </button>
                  <InfoModal
                    visible={infoModal === "score"}
                    setVisible={setInfoModal}
                    title="Score"
                    content="This is score from playing games. Levels don't affect this score."
                  />
                </div>
              </div>
              <Link href="/create-game">
                <a className="ml-4 bg-green-500 dark:bg-green-800 text-white rounded-lg w-2/4 flex hover:bg-green-400 dark:hover:bg-green-700 transition-colors duration-300">
                  <div className="flex items-center justify-center bg-green-400 dark:bg-green-700 p-4 rounded-l-lg">
                    <MdAdd size={24} />
                  </div>
                  <div className="py-4 px-6 flex flex-col justify-between">
                    <span className="text-green-200 uppercase text-sm">
                      Challange other players
                    </span>
                    <strong className="text-xl">Create game</strong>
                  </div>
                </a>
              </Link>
            </div>
          )}
          <div className="flex flex-row items-center mb-3">
            <h3 className="text-xl font-bold dark:text-white">Levels</h3>
            <Link href="/css/select-level">
              <a className="text-gray-400 ml-10 hover:text-blue-500 font-medium">
                Select level
              </a>
            </Link>
          </div>
          <div className="flex">
            <Link
              href={{
                pathname: `/css`,
                query: { level: user?.levelsPassed + 1 },
              }}
            >
              <a className="p-6 rounded-lg text-sm uppercase bg-white dark:bg-secondary border dark:border-0">
                <span className="text-blue-500 text-2xl font-bold">CSS</span>
                {user && (
                  <>
                    <br />
                    <div className="mt-2 dark:text-white">
                      Current level: {user?.levelsPassed + 1}
                    </div>
                  </>
                )}
              </a>
            </Link>
          </div>

          {!!user && (
            <>
              <div className="flex flex-row items-center mb-3 mt-6">
                <h3 className="text-xl font-bold dark:text-white">Games</h3>
                <Link href="/games">
                  <a className="text-gray-400 ml-10 hover:text-blue-500 font-medium">
                    All games
                  </a>
                </Link>
              </div>
              {games?.length <= 0 ? (
                <p className="text-gray-500 mt-4">No published games found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
                  {games?.slice(0, 6)?.map((game) => (
                    <LevelCard
                      key={game._id}
                      isGame
                      level={game}
                      passed={user?.played.some(
                        (playedGame) => playedGame.gameId === game._id
                      )}
                    />
                    // <Link key={game._id} href={`/games/${game._id}`}>
                    //   <a className="border bg-white rounded-lg">
                    //     <div
                    //       className="bg-gray-200 h-[150px] flex rounded-t-lg"
                    //       dangerouslySetInnerHTML={{
                    //         __html: formatHtml(game.code),
                    //       }}
                    //     />
                    //     <div className="p-4">Level {game.name}</div>
                    //   </a>
                    // </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="pl-4 flex items-start w-1/4">
          <Leaderboard />
        </div>
      </div>
    </Layout>
  );
}
