export default (code) => {
  code = code || "";
  var cssCode = code.substring(
    code.indexOf("<style>") + 7,
    code.lastIndexOf("</style>")
  );
  var htmlCode = code.replace(cssCode, "").replace("<style></style>", "");
  const cleanCss = cssCode.replace(/\s/g, "");
  const cssClassList = cleanCss.split(/[.]/);

  const cssList = cssClassList.reduce((result, classItem) => {
    const className = classItem.substring(0, classItem.indexOf("{"));
    const content = classItem.substring(
      classItem.indexOf("{") + 1,
      classItem.lastIndexOf("}")
    );

    if (className !== '"' && className !== "")
      result.push({ class: className, code: content });

    return result;
  }, []);

  cssList.forEach(
    (css) =>
      (htmlCode = htmlCode.replace(
        new RegExp(`class="${css.class}"`, "g"),
        `class="${css.code}"`
      ))
  );
  htmlCode = htmlCode.replace(new RegExp("class", "g"), "style");

  return htmlCode;
};
