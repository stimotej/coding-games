export default (codeHtml, codeCss) => {
  let html = codeHtml || "";
  html = html.replace(new RegExp("class", "g"), "style");
  codeCss?.forEach(
    (css) => (html = html.replace(new RegExp(css.className, "g"), css.code))
  );
  return html;
};
