import useSWR from "swr";
import Link from "next/link";
import Layout from "../../components/Layout";
import formatHtml from "../../lib/formatHtml";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";
import LevelCard from "../../components/LevelCard";

const Games = () => {
  const router = useRouter();

  const { data: games } = useSWR("/games");

  return (
    <Layout title="Games">
      <div className="flex justify-between mb-4 bg-white border dark:border-0 p-2 rounded-lg dark:bg-secondary">
        <button
          className="flex items-center py-2 px-5 rounded-lg dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
          onClick={() => router.back()}
        >
          <MdArrowBack size={22} className="mr-2" />
          Back
        </button>

        <h3 className="flex items-center dark:text-white text-xl font-semibold">
          All games
        </h3>

        <div className="w-[100px]" />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {games?.length <= 0 ? (
          <p className="text-gray-500 mt-6">You dont have games yet.</p>
        ) : (
          games?.map((game) => <LevelCard key={game._id} level={game} isGame />)
        )}
      </div>
    </Layout>
  );
};

export default Games;
