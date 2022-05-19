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
  const [title, setTitle] = useState(defaultTitle);

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
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
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
      <h1 className="text-2xl font-bold mb-6">
        {isGame ? "Create game" : "New CSS level"}
      </h1>
      <h3 className="text-xl font-semibold mb-2">Title</h3>
      <input
        type="text"
        placeholder="Title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 rounded-lg bg-gray-100 outline-none"
      />
      <div className="flex flex-row mt-6">
        <div className="w-full sm:w-1/2 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Code</h3>
          <CodeEditor
            value={code}
            onChange={handleChangeHtml}
            onChangeColors={setColorList}
            className="h-[200px] sm:h-full"
            placeholder="Code here..."
          />
        </div>
        <div className="w-1/2 ml-6">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <Preview
              id="solution"
              html={formatHtml(code)}
              className="mb-6 w-full min-h-[200px]"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Colors</h3>
            <div className="flex flex-row items-center">
              <div className="flex flex-row flex-wrap">
                {colorList.length <= 0 ? (
                  <span className="my-2 text-gray-500">No colors yet.</span>
                ) : (
                  colorList.map((colorItem, index) => (
                    <button
                      key={index}
                      className="p-1 pr-3 rounded-lg flex flex-row items-center border mr-3 hover:bg-gray-100"
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

      <button
        className="fixed bottom-4 right-4 z-20 py-3 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
        onClick={handleSave}
        disabled={user?.role !== "Admin"}
      >
        {loading ? "Loading..." : "Save"}
      </button>
    </>
  );
};

export default CreateGame;
