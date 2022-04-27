import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Layout from "../../../components/Layout";
import formatHtml from "../../../lib/formatHtml";

const SelectLevel = () => {
  const { data: levels, error } = useSWR(`/games/css`);
  return (
    <Layout title="Select level">
      <h3 className="text-xl font-bold mb-4">Levels</h3>
      <div className="grid grid-cols-4 gap-2 w-full">
        {levels?.map((level) => (
          <Link
            key={level._id}
            href={{ pathname: `/games/css`, query: { level: level.level } }}
          >
            <a className="border bg-white rounded-lg">
              <div
                className="bg-gray-200 h-[150px] flex rounded-t-lg"
                dangerouslySetInnerHTML={{
                  __html: formatHtml(level.codeHtml, level.codeCss),
                }}
              />
              <div className="p-4">{level.name}</div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default SelectLevel;
