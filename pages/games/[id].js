import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";

const Game = () => {
  const router = useRouter();

  const { data: game } = useSWR(`/games/${router.query?.id}`);

  return <Layout title={game?.name}>Game</Layout>;
};

export default Game;
