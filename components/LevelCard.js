import Link from "next/link";
import formatHtml from "../lib/formatHtml";
import { MdCheckCircleOutline, MdPlayCircleOutline } from "react-icons/md";

const LevelCard = ({ level, className, passed, disabled, isGame }) => {
  return (
    <Link
      href={
        disabled
          ? { pathname: "/css/select-level" }
          : {
              pathname: isGame ? `/games/${level._id}` : `/css`,
              query: isGame ? {} : { level: level.level },
            }
      }
    >
      <a
        className={`rounded-lg relative text-black mb-5 ${className} ${
          disabled ? "bg-gray-100" : "bg-white dark:bg-secondary hover:ring-2"
        }`}
      >
        <div
          className="border dark:border-0 h-[150px] flex rounded-lg self-stretch"
          dangerouslySetInnerHTML={{
            __html: formatHtml(level.code),
          }}
        />
        <div
          className={`px-4 h-10 w-[90%] flex items-center dark:text-white justify-between rounded-full absolute -bottom-5 left-1/2 transform -translate-x-1/2 ${
            !isGame
              ? passed
                ? "bg-white dark:bg-secondary-light ring-1 ring-green-500"
                : !disabled
                ? "ring-1 ring-blue-500 bg-white dark:bg-secondary-light"
                : "bg-gray-200 dark:bg-secondary"
              : "bg-white dark:bg-secondary-light border border-blue-500"
          }`}
        >
          {isGame ? level.name : `Level ${level.level}`}
          {!isGame ? (
            passed ? (
              <MdCheckCircleOutline className="text-green-600" size={22} />
            ) : (
              !disabled && (
                <MdPlayCircleOutline className="text-blue-500" size={22} />
              )
            )
          ) : (
            <></>
          )}
        </div>
      </a>
    </Link>
  );
};

export default LevelCard;
