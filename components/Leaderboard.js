import React from "react";
import useSWR from "swr";

const Leaderboard = () => {
  const { data: leaderboard, error } = useSWR("/games/leaderboard");

  return (
    <div className="p-4 w-full bg-white dark:bg-secondary rounded-lg sticky top-4 border dark:border-0">
      <h3 className="font-semibold mb-4 dark:text-white">Top players</h3>
      {leaderboard?.map((user) => (
        <div
          key={user._id}
          className="p-2 bg-gray-100 dark:bg-secondary-light rounded-lg flex items-center mb-3"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-secondary/50 mr-3" />
          <div className="flex flex-col">
            <div className="font-semibold dark:text-white">{user.name}</div>
            <div className="text-sm dark:text-text-light">{user.score} pts</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
