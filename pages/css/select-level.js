import React from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import LevelCard from "../../components/LevelCard";
import useUser from "../../lib/useUser";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";

const SelectLevel = () => {
  const router = useRouter();

  const { data: levels, error } = useSWR(`/css`);
  const { user } = useUser();

  return (
    <Layout title="Select level">
      <div className="flex justify-between mb-4 bg-white border dark:border-0 p-2 rounded-lg dark:bg-secondary">
        <button
          className="flex items-center py-2 px-5 rounded-lg dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
          onClick={() => router.back()}
        >
          <MdArrowBack size={22} className="mr-2" />
          Back
        </button>

        <h3 className="flex items-center dark:text-white text-xl font-semibold">
          Select level
        </h3>

        <div className="w-[100px]" />
      </div>

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
