import useSWR from "swr";
import Link from "next/link";
import Layout from "../../components/Layout";
import formatHtml from "../../lib/formatHtml";

const Games = () => {
  const { data: games } = useSWR("/games");

  return (
    <Layout title="Games">
      <h3 className="text-xl font-bold mb-3">All Games</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
        {games?.map((game) => (
          <Link key={game._id} href={`/games/${game._id}`}>
            <a className={`border bg-white rounded-lg`}>
              <div
                className="bg-gray-200 h-[150px] flex rounded-t-lg"
                dangerouslySetInnerHTML={{
                  __html: formatHtml(game.codeHtml, game.codeCss),
                }}
              />
              <div className="p-4">
                Level {game.name}
                <div className="mt-2">{game.createdBy.name}</div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Games;
