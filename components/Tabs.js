import React from "react";

const Tabs = ({ tabs, value, onChange, className }) => {
  return (
    <div className={className}>
      {tabs?.map((className, index) => (
        <button
          key={index}
          className={`py-2 px-3 bg-gray-100 mr-2 rounded-lg ${
            value === className ? "ring-2 ring-blue-500 text-blue-600" : ""
          }`}
          onClick={() => onChange(className)}
        >
          .{className}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
