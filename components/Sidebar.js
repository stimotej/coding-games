import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const activeLevel = router.query?.level;

  const { data: levels, error } = useSWR(`/games/css`);

  return (
    <div className="fixed h-screen w-[200px] px-2 bg-white border-r">
      <h2 className="text-center mt-6 font-bold text-2xl text-blue-500">CSS</h2>
      <div className="mt-6 flex flex-col">
        {levels?.map((level) => (
          <Link
            key={level._id}
            href={{ pathname: "/games/css", query: { level: level.level } }}
          >
            <a
              className={`p-3 rounded-lg text-center mb-2 ${
                parseInt(activeLevel) === level.level ||
                (typeof activeLevel === "undefined" && level.level === 1)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {level.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
