import { useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import axios from "axios";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import formatHtml from "../lib/formatHtml";
import useSWR from "swr";
import defaultCodeValue from "../lib/defaultCodeValue";

const CreateGame = ({ defaultTitle, isGame }) => {
  const router = useRouter();
  const [code, setCode] = useState(defaultCodeValue);

  const { data: levels, mutate } = useSWR(`/css`);
  const { user } = useUser();

  const [colorList, setColorList] = useState([]);
  const [loading, setLoading] = useState("");
  const [title, setTitle] = useState(defaultTitle || "");

  useEffect(() => {
    if (!!levels && !isGame) setTitle(`Level ${levels.length + 1}`);
  }, [levels]);

  const handleChangeHtml = (code) => {
    setCode(code);
  };

  const handleSave = () => {
    setLoading(true);

    domtoimage
      .toBlob(document.getElementById("solution"))
      .then(function (blob) {
        var formData = new FormData();
        formData.append("name", title);
        formData.append("code", code);
        formData.append("colors", JSON.stringify(colorList));
        formData.append("image", blob);

        axios
          .post(
            isGame ? "/games" : "/css",
            // {
            //   name: title,
            //   code,
            //   codeCss,
            //   colors: colorList,
            //   solutionImage: blob,
            // },
            formData
          )
          .then((res) => {
            console.log(res.data);
            mutate([...levels, res.data]);
            router.push(isGame ? "/games" : "/css/select-level");
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        {isGame ? "Create game" : "New CSS level"}
      </h1>
      <div className="flex flex-row mt-6">
        <div className="w-full sm:w-1/2 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Code</h3>
          <CodeEditor
            value={code}
            onChange={handleChangeHtml}
            onChangeColors={setColorList}
            className="h-[200px] sm:h-full"
            placeholder="Code here..."
          />
        </div>
        <div className="w-1/3 ml-6">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              Preview
            </h3>
            <Preview
              id="solution"
              html={formatHtml(code)}
              className="mb-6 w-full min-h-[200px]"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Title</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-gray-100 outline-none dark:bg-secondary-light dark:text-white"
            />
            <button
              className="ml-2 py-3 px-8 bg-blue-600 dark:bg-blue-800 hover:bg-blue-500 dark:hover:bg-blue-700 text-white rounded-lg"
              onClick={handleSave}
              disabled={user?.role !== "Admin"}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
        <div className="w-1/6">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              Colors
            </h3>
            <div className="flex flex-row items-center">
              <div className="flex flex-row flex-wrap gap-2">
                {colorList.length <= 0 ? (
                  <span className="my-2 text-gray-500 dark:text-white">
                    No colors yet.
                  </span>
                ) : (
                  colorList.map((colorItem, index) => (
                    <button
                      key={index}
                      className="p-1 pr-3 rounded-lg flex flex-row items-center border dark:border-0 dark:text-white dark:bg-secondary hover:bg-gray-100 dark:hover:bg-secondary-light"
                    >
                      <div
                        className="w-10 h-10 rounded-lg mr-3"
                        style={{ backgroundColor: colorItem }}
                      />
                      {colorItem}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGame;
