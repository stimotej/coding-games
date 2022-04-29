import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import CodeEditor from "../../components/CodeEditor";
import Layout from "../../components/Layout";
import Tabs from "../../components/Tabs";
import useUser from "../../lib/useUser";
import formatHtml from "../../lib/formatHtml";

const CssGame = () => {
  const router = useRouter();

  const level = router.query?.level;

  const { data: game, error } = useSWR(`/css?level=${level || 1}`);

  useEffect(() => {
    if (game && game.codeCss) {
      setCode(
        game.codeCss.map((css) => ({ className: css.className, code: "" }))
      );
      setActiveTab(game.codeCss[0]?.className);

      let html = game.codeHtml;
      html = html.replace(new RegExp("class", "g"), "style");
      game.codeCss.forEach(
        (css) => (html = html.replace(new RegExp(css.className, "g"), css.code))
      );
      setSolutionCodeDisplay(html);
    } else {
      setSolutionCodeDisplay("");
    }
  }, [game]);

  const [code, setCode] = useState([]);
  const [codeDisplay, setCodeDisplay] = useState("");
  const [solutionCodeDisplay, setSolutionCodeDisplay] = useState("");

  const [activeTab, setActiveTab] = useState("");

  const handleChange = (text) => {
    let codeCopy = [...code];
    codeCopy.find((code) => code.className === activeTab).code = text;
    setCode(codeCopy);

    setCodeDisplay(formatHtml(game.codeHtml, game.codeCss));
  };

  return (
    <Layout title="CSS">
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

      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col-reverse sm:flex-row w-full">
          <div
            className="bg-gray-100 rounded-lg w-full sm:w-1/2 h-[200px] mb-6 flex p-2"
            dangerouslySetInnerHTML={{ __html: codeDisplay }}
          />
          <div
            className="bg-gray-100 rounded-lg w-full sm:w-1/2 h-[200px] ml-0 sm:ml-4 mb-6 flex p-2"
            dangerouslySetInnerHTML={{ __html: solutionCodeDisplay }}
          />
        </div>
        <div className="flex flex-row items-center md:items-start md:flex-col ml-0 md:ml-2 md:mb-6">
          <h3 className="mb-2 mr-4 md:mr-0">Colors</h3>
          {game?.colors?.map((color, index) => (
            <button
              key={index}
              style={{ backgroundColor: color }}
              className="p-3 rounded-lg mr-2 w-fit"
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
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
        <div className="w-full md:w-2/3">
          <div className="flex flex-row items-center justify-between mb-2">
            <Tabs
              tabs={game?.codeCss?.map((items) => items.className)}
              value={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <CodeEditor
            value={code.find((code) => code.className === activeTab)?.code}
            onChange={handleChange}
            placeholder="Code here..."
            language="css"
            highlight={game?.colors?.map((color) => ({
              word: color,
              color: "#FB8C00",
            }))}
          />
        </div>
        <div className="w-full md:w-1/3 ml-0 md:ml-4">
          <h3 className="font-semibold uppercase p-2 mb-2 mt-4 md:mt-2">
            HTML
          </h3>
          <CodeEditor value={game?.codeHtml} disabled={true} language="html" />
        </div>
      </div>
    </Layout>
  );
};

export default CssGame;
