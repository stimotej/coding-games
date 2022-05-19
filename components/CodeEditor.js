import { useState, useRef, useEffect } from "react";
import cssSyntax from "../lib/cssSyntax";

const CodeEditor = ({
  value,
  onChange,
  placeholder,
  disabled,
  className,
  highlight = [],
  showLineNumbers = true,
  onChangeColors,
}) => {
  const codeEditor = useRef(null);
  const textArea = useRef(null);
  const selection = useRef(null);
  const lineNumbers = useRef(null);

  const [lines, setLines] = useState(1);

  useEffect(() => {
    let codeText = value || "";

    codeText = codeText
      .replace(new RegExp("&", "g"), "&amp;")
      .replace(new RegExp(" ", "g"), "&nbsp;")
      .replace(new RegExp("<", "g"), "&lt;")
      .replace(new RegExp("\n", "g"), "<br />");

    // CSS HIGHLIGHT
    cssSyntax.words.map((fun) => {
      codeText = codeText.replace(
        new RegExp(fun, "g"),
        `<span style="color: ${cssSyntax.color}">${fun}</span>`
      );
    });

    // HTML HIGHLIGHT
    codeText = codeText
      .replace(
        new RegExp("div", "g"),
        `<span style='color: #1565C0'>div</span>`
      )
      .replace(
        new RegExp("class", "g"),
        `<span style='color: #42A5F5'>class</span>`
      );

    // Find colors
    let colors =
      value?.match(/#[a-fA-F0-9]{8}|#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g) || [];
    if (typeof onChangeColors === "function") onChangeColors(colors);

    // Highlight colors
    colors.forEach((color) => {
      codeText = codeText.replace(
        new RegExp(color, "g"),
        `<span style="color: #FB8C00">${color}</span>`
      );
    });

    // Highlight additional words from highlight prop
    highlight.forEach((item) => {
      codeText = codeText.replace(
        new RegExp(item.word, "g"),
        `<span style="color: ${item.color}">${item.word}</span>`
      );
    });

    // SET LINE NUMBERS
    var linesS = codeText.split("<br />");
    setLines(linesS.length);

    // PUT CODE IN DIV AS HTML
    codeEditor.current.innerHTML = codeText;

    if (!!selection.current) textArea.current.selectionEnd = selection.current;
    selection.current = null;
  }, [value]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleScroll = (e) => {
    codeEditor.current.scrollTop = e.target.scrollTop;
    codeEditor.current.scrollLeft = e.target.scrollLeft;
    lineNumbers.current.scrollTop = e.target.scrollTop;
    lineNumbers.current.scrollLeft = e.target.scrollLeft;
  };

  const handleKey = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      let codeText = value || "";
      codeText =
        codeText.slice(0, e.target.selectionStart) +
        "    " +
        codeText.slice(e.target.selectionEnd);
      codeEditor.current.innerHTML = codeText;
      selection.current = e.target.selectionStart + 4;
      onChange(codeText);
    }
  };

  return (
    <div
      className={`relative text-md font-normal bg-gray-100 dark:bg-secondary h-[200px] rounded-lg ${className}`}
    >
      {showLineNumbers && (
        <div
          ref={lineNumbers}
          className="flex flex-col py-4 w-6 items-center text-gray-500 dark:text-text-light h-full overflow-hidden"
        >
          {[...Array(lines)].map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
      )}
      <textarea
        ref={textArea}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKey}
        onScroll={handleScroll}
        spellCheck="false"
        className="ml-6 pl-1 absolute inset-0 p-4 resize-none overflow-auto border-none outline-none text-transparent bg-transparent z-10 caret-black whitespace-wrap"
      ></textarea>

      <div
        ref={codeEditor}
        spellCheck={false}
        className="ml-6 pl-1 absolute inset-0 overflow-auto text-gray-800 dark:text-gray-200 bg-gray-100dark:bg-secondary p-4 rounded-lg z-0 whitespace-wrap"
      />
    </div>
  );
};

export default CodeEditor;
