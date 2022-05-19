import { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import formatHtml from "../lib/formatHtml";
import defaultCodeValue from "../lib/defaultCodeValue";
import useSWR from "swr";
import useUser from "../lib/useUser";

const Game = ({ game }) => {
  const [code, setCode] = useState(defaultCodeValue);

  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    axios
      .post(
        `/css/${game._id}/submit`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success === 0) setError("Wrong answer");
        console.log(res.data);
        if (res.data.success === 1) console.log("passed");
      })
      .catch((err) => setError("Sending answer failed."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-row gap-4 min-h-[calc(100vh-104px)]">
      <div className="w-1/3">
        {/* <h3 className="font-semibold uppercase mb-2">Code</h3> */}
        <CodeEditor
          value={code}
          onChange={setCode}
          placeholder="Code here..."
          className="h-[100%]"
        />
      </div>
      <div className="flex flex-col w-1/3">
        <Preview html={formatHtml(code)} />
        <div className="mt-4">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Level {game?.level}
          </h3>
          <div className="mb-6 p-2 bg-white dark:bg-secondary dark:text-white flex justify-between rounded-lg border dark:border-0">
            <p>Highest score:</p>
            <p>
              {user?.played.find(
                (playedGame) => playedGame.gameId === game?._id
              )?.highestScore || "---"}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-blue-500 text-white py-2 px-5 rounded-lg"
              onClick={handleSubmit}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            {error && <div className="mr-3 text-red-500">{error}</div>}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/3">
        <Preview html={formatHtml(game?.code)} />
        <div className="flex flex-row items-center md:items-start md:flex-col mt-4">
          <h3 className="mb-2 mr-4 md:mr-0 dark:text-white">Colors</h3>
          {game?.colors?.map((color, index) => (
            <button
              key={index}
              className="p-1 pr-3 rounded-lg flex flex-row items-center border dark:border-0 dark:text-white mr-3 dark:bg-secondary hover:bg-gray-100 dark:hover:bg-secondary-light"
              onClick={() => {
                navigator.clipboard.writeText(color).then(
                  function () {
                    console.log("Async: Copying to clipboard was successful!");
                  },
                  function (err) {
                    console.error("Async: Could not copy text: ", err);
                  }
                );
              }}
            >
              <div
                className="w-10 h-10 rounded-lg mr-3"
                style={{ backgroundColor: color }}
              />
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
