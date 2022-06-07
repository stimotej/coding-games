import { useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import axios from "axios";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import defaultCodeValue from "../lib/defaultCodeValue";
import { MdSave, MdArrowBack } from "react-icons/md";
import Input from "../components/Input";

const CreateGame = ({ defaultTitle, isGame, level }) => {
  const router = useRouter();

  const { data: levels, mutate } = useSWR(`/css`);
  const { user } = useUser();

  const [loading, setLoading] = useState("");

  const [title, setTitle] = useState(defaultTitle || "");
  const [code, setCode] = useState(defaultCodeValue);
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    if (!!levels && !isGame && !level) setTitle(`Level ${levels.length + 1}`);
    if (level && !!levels) {
      const levelObject = levels.find((item) => item.level === parseInt(level));
      if (levelObject) {
        setCode(levelObject.code);
        setTitle(`Level ${levelObject.level}`);
        setColorList(levelObject.colors);
      }
    }
  }, [levels, level]);

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
      <div className="flex justify-between bg-white border dark:border-0 p-2 rounded-lg dark:bg-secondary">
        <button
          className="flex items-center py-2 px-5 rounded-lg dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
          onClick={() => router.back()}
        >
          <MdArrowBack size={22} className="mr-2" />
          Back
        </button>

        <h3 className="flex items-center dark:text-white text-xl font-semibold">
          {level
            ? `Edit level ${level}`
            : isGame
            ? "Create game"
            : "New CSS level"}
        </h3>

        <div className="flex">
          <Input
            type="text"
            placeholder="Title here..."
            value={title}
            onChange={setTitle}
            className=""
          />
          <button
            className="flex items-center ml-2 py-2 px-5 rounded-lg dark:text-white bg-gray-100 dark:bg-secondary-light hover:hover:bg-blue-500 dark:hover:bg-blue-600"
            onClick={handleSave}
          >
            <MdSave size={22} className="mr-2" />
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
      <div className="flex flex-row mt-6 items-stretch min-h-[400px]">
        <div className="w-full sm:w-1/2 flex flex-col items-stretch">
          <h3 className="mb-2 text-gray-500">Code</h3>
          {/* <CodeEditor
            value={code}
            onChange={handleChangeHtml}
            onChangeColors={setColorList}
            className="h-[200px] sm:h-full"
            placeholder="Code here..."
          /> */}
          <CodeEditor
            value={code}
            onChange={setCode}
            onChangeColors={setColorList}
          />
        </div>
        <div className="w-1/3 ml-4">
          <div className="flex flex-col">
            <h3 className="mb-2 text-gray-500">Preview</h3>
            <Preview id="solution" html={code} />
          </div>
        </div>
        <div className="w-1/6 ml-4">
          <div className="flex flex-col">
            <h3 className="mb-2 text-gray-500">Colors</h3>
            <div className="flex flex-row items-center">
              <div className="flex flex-row flex-wrap gap-2">
                {colorList.length <= 0 ? (
                  <span className="my-2 text-gray-500 dark:text-gray-500">
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
