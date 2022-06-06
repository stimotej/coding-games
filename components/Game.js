import { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import defaultCodeValue from "../lib/defaultCodeValue";
import Image from "next/image";
import useUser from "../lib/useUser";
import domtoimage from "dom-to-image";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";

const Game = ({ game, isLevel }) => {
  const router = useRouter();

  const [code, setCode] = useState(defaultCodeValue);

  const { user, mutate } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    domtoimage
      .toBlob(document.getElementById("solution"))
      .then(function (blob) {
        var formData = new FormData();
        formData.append("code", code);
        formData.append("image", blob);
        console.log(blob);
        axios
          .post(
            isLevel ? `/css/${game._id}/submit` : `/games/${game._id}/submit`,
            formData
          )
          .then((res) => {
            if (res.data.success === 0) setError("Wrong answer");
            console.log(res.data);
            if (res.data.success === 1) console.log("passed");
            mutate(res.data.user);
            setResult(res.data.data);
          })
          .catch((err) => {
            setError("Submit failed.");
            console.log(err);
          })
          .finally(() => setLoading(false));
      });
  };

  return (
    <div>
      <div className="flex justify-between mb-4 bg-white border dark:border-0 p-2 rounded-lg dark:bg-secondary">
        <button
          className="flex items-center py-2 px-5 rounded-lg dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
          onClick={() => router.back()}
        >
          <MdArrowBack size={22} className="mr-2" />
          Back
        </button>

        <h3 className="flex items-center dark:text-white text-xl font-semibold">
          {isLevel ? `Level ${game?.level}` : game?.name}
        </h3>

        <div className="w-[100px]" />
      </div>
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
          <Preview id="solution" html={code} />
          <div className="mt-4">
            {user && (
              <div className="mb-2 p-2 bg-white dark:bg-secondary dark:text-white flex justify-between rounded-lg border dark:border-0">
                <p>Highest score</p>
                <p>
                  {user?.played.find(
                    (playedGame) => playedGame.gameId === game?._id
                  )?.highestScore || "---"}
                </p>
              </div>
            )}
            {result && (
              <div className="border dark:border-0 bg-white dark:bg-secondary rounded-lg p-2 dark:text-white mb-4">
                <h4 className="uppercase text-sm font-semibold mb-2">Result</h4>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Characters</p>
                  <p>{result.codeLength}</p>
                </div>
                <div className="bg-gray-300 dark:bg-secondary-light border-none h-[0.5px] my-1" />
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Solution difference</p>
                  <p>{Number(result.imageDifference.toFixed(2)) * 100}%</p>
                </div>
                <div className="bg-gray-300 dark:bg-secondary-light border-none h-[0.5px] my-1" />
                <div className="flex items-center justify-between">
                  <p>Score</p>
                  <p>{result.score}</p>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <button
                className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-6 rounded-full mt-2"
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
              {error && <div className="mr-3 text-red-500">{error}</div>}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/3">
          {/* <Preview html={formatHtml(game?.code)} /> */}
          {game?.solutionImage ? (
            <div className="w-[380px] h-[300px] relative">
              <Image
                src={game?.solutionImage}
                alt="Solution image"
                layout="fill"
                unoptimized={true}
                className="bg-gray-100 dark:bg-secondary rounded-lg"
              />
            </div>
          ) : (
            <div className="w-[380px] h-[300px] bg-gray-100 dark:bg-secondary rounded-lg" />
          )}

          <div className="items-center mt-4">
            <h3 className="mb-2 mr-4 md:mr-0 dark:text-white">Colors</h3>
            <div className="flex gap-2 flex-wrap">
              {game?.colors?.map((color, index) => (
                <button
                  key={index}
                  className="p-1 pr-3 rounded-lg flex flex-row items-center border dark:border-0 dark:text-white dark:bg-secondary hover:bg-gray-100 dark:hover:bg-secondary-light"
                  onClick={() => {
                    navigator.clipboard.writeText(color).then(
                      function () {
                        console.log(
                          "Async: Copying to clipboard was successful!"
                        );
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
      </div>
    </div>
  );
};

export default Game;
