import axios from "axios";
import { useState, useEffect } from "react";
import CodeEditor from "../../../components/CodeEditor";
import Layout from "../../../components/Layout";
import Tabs from "../../../components/Tabs";
import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "../../../lib/useUser";

const NewLevel = () => {
  const router = useRouter();

  const { data: levels, mutate } = useSWR(`/games/css`);
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
    let code = codeHtml;

    code = code.replace(new RegExp("class", "g"), "style");
    codeCss.forEach(
      (css) => (code = code.replace(new RegExp(css.className, "g"), css.code))
    );

    setCodeDisplay(code);
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

  const handleAddColor = (e) => {
    e.preventDefault();
    if (
      color.startsWith("#") &&
      (color.length === 7 || color.length === 4 || color.length === 9)
    ) {
      setColorList([...colorList, color]);
      setColor("");
    }
  };

  const handleSave = () => {
    setLoading(true);
    axios
      .post(
        "/games/css",
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
        mutate(res.data);
        router.push("/games/css");
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
        <form onSubmit={handleAddColor}>
          <input
            type="text"
            placeholder="Color HEX"
            className="p-3 rounded-lg bg-gray-100 outline-none"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue p-3 rounded-lg bg-blue-600 text-white ml-2 uppercase"
          >
            Add
          </button>
        </form>
        <div className="flex flex-row flex-wrap ml-6">
          {colorList.map((colorItem, index) => (
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
          ))}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
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
            language="css"
            highlight={colorList.map((item) => ({
              word: item,
              color: "#FB8C00",
            }))}
            disabled={classList.length <= 0}
            placeholder={
              classList.length <= 0
                ? "Add HTML element with class to start editing"
                : "Code here..."
            }
          />
        </div>
        <div className="ml-4 w-1/2 flex flex-col">
          <h3 className="text-xl font-semibold mt-6 mb-2">HTML</h3>
          <CodeEditor
            value={codeHtml}
            onChange={handleChangeHtml}
            language="html"
            className="h-full"
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
