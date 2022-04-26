import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout title="Home">
      <h3 className="text-xl font-bold mb-8">Games</h3>
      <Link href="/games/css/select-level">
        <a className="p-6 rounded-lg text-xl text-blue-500 font-bold uppercase bg-white border">
          CSS
        </a>
      </Link>
    </Layout>
  );
}
