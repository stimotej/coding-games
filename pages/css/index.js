import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import useUser from "../../lib/useUser";
import Game from "../../components/Game";

const CssGame = () => {
  const router = useRouter();

  const level = router.query?.level;

  const { data: game } = useSWR(`/css?level=${level || 1}`);
  const { user } = useUser();

  // useEffect(() => {
  //   if (level > user?.levelsPassed) router.push("/css/select-level");
  // }, [game]);

  return (
    <Layout
      title="CSS"
      // beforeContainer={<GameBar game={game} codeCss={code} />}
    >
      {/* <div className="flex flex-row">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <div className="ml-4" dangerouslySetInnerHTML={{ __html: code }} />
      </div> */}
      {/* 
      <div contentEditable={true} onInput={handleChange}>
        {code}
      </div> */}

      <Game game={game} />
    </Layout>
  );
};

export default CssGame;
