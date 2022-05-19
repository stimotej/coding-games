import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children, title, beforeContainer }) => {
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

      <div className={`bg-gray-50 dark:bg-background min-h-screen`}>
        <Navbar />
        {beforeContainer}
        <div className={`p-6`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
