import { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const CodeEditor = ({
  value,
  onChange,
  suggestions = true,
  onChangeColors,
}) => {
  const monaco = useMonaco();
  const [theme, setTheme] = useState("vs-dark");

  const findColors = (text) => {
    let colors =
      text?.match(/#[a-fA-F0-9]{8}|#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g) || [];
    return colors.filter((v, i, a) => a.indexOf(v) === i);
  };

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("dark-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#272636",
        },
      });
      monaco.editor.defineTheme("light-theme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#f3f4f6",
        },
      });

      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      )
        setTheme("dark-theme");
      else setTheme("light-theme");
    }

    const colors = findColors(value);
    if (typeof onChangeColors === "function") onChangeColors(colors);
  }, [monaco]);

  const handleOnChange = (code) => {
    onChange(code);

    const colors = findColors(code);
    if (typeof onChangeColors === "function") onChangeColors(colors);
  };

  return (
    <div className="py-4 h-full bg-gray-100 dark:bg-secondary rounded-lg dark:text-neutral-300">
      <Editor
        defaultLanguage="html"
        theme={theme}
        value={value}
        onChange={handleOnChange}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          ...(!suggestions && {
            quickSuggestions: {
              other: false,
              comments: false,
              strings: false,
            },
            tabCompletion: "off",
            wordBasedSuggestions: false,
            parameterHints: {
              enabled: false,
            },
            ordBasedSuggestions: false,
            suggestOnTriggerCharacters: false,
            acceptSuggestionOnEnter: "off",
          }),
        }}
      />
    </div>
  );
};

export default CodeEditor;
