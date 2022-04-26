import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout title="Home">
      <h3 className="text-xl font-bold mb-6">Games</h3>
      <Link href={{ pathname: `/games/css`, query: { level: 1 } }}>
        <a className="p-4 rounded-lg shadow-md text-xl text-blue-500 font-bold uppercase">
          CSS
        </a>
      </Link>
    </Layout>
  );
}
