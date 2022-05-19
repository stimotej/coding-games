import React from "react";

const Preview = ({ id, html, className }) => {
  return (
    <div className="flex flex-row items-start justify-start min-w-[384px]">
      <div
        id={id}
        className={`bg-gray-100 dark:bg-secondary rounded-lg flex p-2 overflow-hidden w-[380px] h-[300px] ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default Preview;
