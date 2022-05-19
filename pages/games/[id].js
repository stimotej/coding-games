import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";
import GameComponent from "../../components/Game";

const Game = () => {
  const router = useRouter();

  const { data: game } = useSWR(`/games/${router.query?.id}`);

  return (
    <Layout title={game?.name}>
      <GameComponent game={game} />
    </Layout>
  );
};

export default Game;
