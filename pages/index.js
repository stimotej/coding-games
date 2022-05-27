import Link from "next/link";
import useSWR from "swr";
import formatHtml from "../lib/formatHtml";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import Leaderboard from "../components/Leaderboard";
import { MdAdd } from "react-icons/md";
import LevelCard from "../components/LevelCard";

export default function Home() {
  const { data: games } = useSWR("/games");
  const { user } = useUser();

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
              <div className="py-4 px-6 bg-blue-500 dark:bg-blue-800 text-white rounded-lg w-1/4">
                <span className="text-blue-200 uppercase text-sm">Rank</span>{" "}
                <br />
                <strong className="text-xl mt-2 flex">{user?.rank}</strong>
              </div>
              <div className="py-4 px-6 ml-4 bg-red-500 dark:bg-red-800 text-white rounded-lg w-1/4">
                <span className="text-red-200 uppercase text-sm">Score</span>{" "}
                <br />
                <strong className="text-xl mt-2 flex">{user?.score}</strong>
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
            <h3 className="text-xl font-bold dark:text-white">Games</h3>
            <Link href="/css/select-level">
              <a className="text-blue-500 ml-10 dark:text-text-light">
                Select level
              </a>
            </Link>
          </div>
          <div className="flex">
            <Link
              href={{ pathname: `/css`, query: { level: user?.progressCss } }}
            >
              <a className="p-6 rounded-lg text-sm uppercase bg-white dark:bg-secondary border dark:border-0">
                <span className="text-blue-500 text-2xl font-bold">CSS</span>
                <br />
                <div className="mt-2 dark:text-white">
                  Current level: {user?.progressCss}
                </div>
              </a>
            </Link>
          </div>
          {!!user && (
            <>
              <h3 className="text-xl font-bold mt-6 dark:text-white">
                My games
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2 mt-4">
                {games?.map((game) => (
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
            </>
          )}
          {/* <Link href="/games">
            <a className="flex w-fit mt-8 rounded-lg p-4 bg-blue-500 text-white font-semibold uppercase">
              See all games
            </a>
          </Link> */}
        </div>
        <div className="pl-4 flex items-start w-1/4">
          <Leaderboard />
        </div>
      </div>
    </Layout>
  );
}
