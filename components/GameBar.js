import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import useUser from "../lib/useUser";

const GameBar = ({ game, codeCss }) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    axios
      .post(`/css/${game._id}/submit`, { codeCss })
      .then((res) => {
        if (res.data.success === 0) setError("Wrong answer");
        console.log(res.data);
        if (res.data.success === 1) console.log("passed");
      })
      .catch((err) => setError("Sending answer failed."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-[56px] flex flex-row sticky top-0 items-center justify-between px-4 sm:px-12 bg-white border-b w-full">
      <h3 className="font-bold">Level {game?.level}</h3>
      <div className="flex flex-row items-center">
        {error && <div className="mr-3 text-red-500">{error}</div>}
        <button
          className="bg-blue-500 text-white py-2 px-5 rounded-lg"
          onClick={handleSubmit}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
        {user?.progressCss > game?.level && (
          <Link href={{ pathname: "/css", query: { level: game?.level + 1 } }}>
            <a className="bg-blue-500 text-white py-2 px-5 rounded-lg ml-3">
              Next
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default GameBar;
