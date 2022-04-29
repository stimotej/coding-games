import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import CodeEditor from "../../components/CodeEditor";
import formatHtml from "../../lib/formatHtml";
import Layout from "../../components/Layout";
import useUser from "../../lib/useUser";
import Tabs from "../../components/Tabs";

const NewLevel = () => {
  const router = useRouter();

  const { data: levels, mutate } = useSWR(`/css`);
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [codeHtml, setCodeHtml] = useState("");
  const [codeCss, setCodeCss] = useState([]);

  const [codeDisplay, setCodeDisplay] = useState("");

  const [classList, setClassList] = useState([]);

  const [actvieTab, setActiveTab] = useState("");

  const [color, setColor] = useState("");
  const [colorList, setColorList] = useState([]);

  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (!!levels) setTitle(`Level ${levels.length + 1}`);
  }, [levels]);

  useEffect(() => {
    setCodeDisplay(formatHtml(codeHtml, codeCss));
  }, [codeHtml, codeCss]);

  const handleChangeCss = (code) => {
    let codeCssCopy = [...codeCss];
    codeCssCopy.find((code) => code.className === actvieTab).code = code;
    setCodeCss(codeCssCopy);
  };

  const handleChangeHtml = (code) => {
    setCodeHtml(code);

    const parts = code.split(/ |\n/);
    const classParts = parts.filter((part) => part.includes("class="));

    const finalClassList = classParts.reduce((result, classPart) => {
      const className = classPart.substring(
        classPart.indexOf('"') + 1,
        classPart.lastIndexOf('"')
      );

      if (className !== '"' && className !== "") result.push(className);

      return result;
    }, []);

    if (finalClassList.length === 1) setActiveTab(finalClassList[0]);

    setCodeCss(
      finalClassList.map((className) => ({
        className,
        code: codeCss.find((item) => item.className === className)?.code || "",
      }))
    );

    setClassList(finalClassList);
  };

  const handleSave = () => {
    setLoading(true);
    axios
      .post(
        "/css",
        {
          name: title,
          codeHtml,
          codeCss,
          colors: colorList,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        mutate([...levels, res.data]);
        router.push({
          pathname: "/games/css",
          query: { level: res.data.level },
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <Layout title="New Level">
      <h1 className="text-2xl font-bold mb-6">New CSS level</h1>
      <h3 className="text-xl font-semibold mb-2">Title</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 rounded-lg bg-gray-100 outline-none"
      />
      <h3 className="text-xl font-semibold mt-6 mb-2">Preview</h3>
      <div
        className="bg-gray-100 rounded-lg w-full h-[200px] mt-0 flex p-2"
        dangerouslySetInnerHTML={{ __html: codeDisplay }}
      />
      <h3 className="text-xl font-semibold mt-6 mb-2">Colors</h3>
      <div className="flex flex-row items-center">
        <div className="flex flex-row flex-wrap">
          {colorList.length <= 0 ? (
            <span className="my-2 text-gray-500">No colors yet.</span>
          ) : (
            colorList.map((colorItem, index) => (
              <button
                key={index}
                style={{ backgroundColor: colorItem }}
                className="p-3 rounded-lg mr-2"
                onClick={() =>
                  setColorList(colorList.filter((item) => item !== colorItem))
                }
              >
                {colorItem}
              </button>
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2">
          <h3 className="text-xl font-semibold mt-6 mb-2">CSS</h3>
          {classList.length > 0 && (
            <Tabs
              className="mb-2"
              tabs={classList}
              value={actvieTab}
              onChange={setActiveTab}
            />
          )}
          <CodeEditor
            value={codeCss.find((code) => code.className === actvieTab)?.code}
            onChange={handleChangeCss}
            onChangeColors={setColorList}
            language="css"
            disabled={classList.length <= 0}
            placeholder={
              classList.length <= 0
                ? "Add HTML element with class to start editing"
                : "Code here..."
            }
          />
        </div>
        <div className="w-full sm:w-1/2 ml-0 sm:ml-4 flex flex-col">
          <h3 className="text-xl font-semibold mt-6 mb-2">HTML</h3>
          <CodeEditor
            value={codeHtml}
            onChange={handleChangeHtml}
            onChangeColors={setColorList}
            language="html"
            className="h-[200px] sm:h-full"
            placeholder="Code here..."
          />
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 z-20 py-3 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
        onClick={handleSave}
        disabled={user?.role !== "Admin"}
      >
        {loading ? "Loading..." : "Save"}
      </button>
    </Layout>
  );
};

export default NewLevel;
