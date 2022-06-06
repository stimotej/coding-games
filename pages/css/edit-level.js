import Layout from "../../components/Layout";
import CreateGame from "../../components/CreateGame";
import { useRouter } from "next/router";

const EditLevel = () => {
  const router = useRouter();

  const level = router.query?.level;

  return (
    <Layout title="Edit Level">
      <CreateGame level={level} />
    </Layout>
  );
};

export default EditLevel;
