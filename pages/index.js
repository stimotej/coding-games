import Link from "next/link";
import useSWR from "swr";
import formatHtml from "../lib/formatHtml";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";

export default function Home() {
  const { data: games } = useSWR("/games");
  const { user } = useUser();

  return (
    <Layout title="Home">
      {!!user && (
        <div className="p-4 bg-blue-500 text-white w-fit mb-6 rounded-lg text-center">
          <span className="text-blue-200">Rank</span> <br />
          <strong className="text-lg">{user?.rank}</strong>
        </div>
      )}
      <h3 className="text-xl font-bold mb-3">Games</h3>
      <div className="flex">
        <Link href="/css/select-level">
          <a className="p-6 rounded-lg text-sm uppercase bg-white border">
            <span className="text-blue-500 text-xl font-bold">CSS</span>
            <br />
            Current level: {user?.progressCss}
          </a>
        </Link>
      </div>
      {!!user && (
        <>
          <h3 className="text-xl font-bold mt-6">My games</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
            {games
              ?.filter((game) => game.createdBy._id === user?._id)
              ?.map((game) => (
                <Link key={game._id} href={`/games/${game._id}`}>
                  <a className="border bg-white rounded-lg">
                    <div
                      className="bg-gray-200 h-[150px] flex rounded-t-lg"
                      dangerouslySetInnerHTML={{
                        __html: formatHtml(game.codeHtml, game.codeCss),
                      }}
                    />
                    <div className="p-4">Level {game.name}</div>
                  </a>
                </Link>
              ))}
          </div>
        </>
      )}
      <Link href="/games">
        <a className="flex w-fit mt-8 rounded-lg p-4 bg-blue-500 text-white font-semibold uppercase">
          See all games
        </a>
      </Link>
    </Layout>
  );
}
