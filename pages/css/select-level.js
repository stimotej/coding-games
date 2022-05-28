import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Layout from "../../components/Layout";
import formatHtml from "../../lib/formatHtml";
import LevelCard from "../../components/LevelCard";
import useUser from "../../lib/useUser";

const SelectLevel = () => {
  const { data: levels, error } = useSWR(`/css`);
  const { user } = useUser();

  return (
    <Layout title="Select level">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Levels</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {levels?.map((level) => (
          <LevelCard
            key={level._id}
            level={level}
            passed={user?.levelsPassed >= level.level}
            disabled={user?.levelsPassed + 1 < level.level}
          />
        ))}
      </div>
    </Layout>
  );
};

export default SelectLevel;
