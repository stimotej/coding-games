import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children, title }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title} | Coding Games</title>
        <meta
          name="description"
          content="Play games and improve your coding skills."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {router.pathname === "/games/css" && <Sidebar />}
      <div
        className={`bg-gray-50 min-h-screen ${
          router.pathname === "/games/css" ? "pl-[200px]" : ""
        }`}
      >
        <Navbar />
        <div
          className={`p-6 ${
            router.pathname.includes("/games/") ? "rounded-tl-xl" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
