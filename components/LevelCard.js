import {
  MdCheckCircleOutline,
  MdPlayCircleOutline,
  MdLock,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import Image from "next/image";
import MyLink from "./MyLink";

const LevelCard = ({
  level,
  className,
  passed,
  disabled,
  isGame,
  score,
  deleteBtn,
  onDeleteClicked,
  editBtn,
  onEditClicked,
}) => {
  return (
    <MyLink
      disabled={disabled || deleteBtn || editBtn}
      href={{
        pathname: isGame ? `/games/${level._id}` : `/css`,
        query: isGame ? {} : { level: level?.level },
      }}
      className="mb-5"
    >
      <a
        className={`rounded-lg relative text-black mb-5 ${className} ${
          disabled || deleteBtn || editBtn
            ? "bg-gray-100 dark:bg-secondary pointer-events-none"
            : "bg-white dark:bg-secondary hover:ring-2"
        }`}
      >
        {/* <div
          className="border dark:border-0 h-[150px] flex rounded-lg self-stretch"
          dangerouslySetInnerHTML={{
            __html: formatHtml(level.code),
          }}
        /> */}
        {level?.solutionImage && (
          <Image
            src={level.solutionImage}
            alt="Solution image"
            width={380}
            height={300}
            layout="responsive"
            className="bg-gray-100 dark:bg-secondary rounded-lg"
          />
        )}
        <div
          className={`px-4 ${
            score
              ? "h-16 rounded-lg"
              : deleteBtn || editBtn
              ? "h-12 rounded-full"
              : "h-10 rounded-full"
          } w-[90%] flex items-center dark:text-white justify-between absolute -bottom-5 left-1/2 transform -translate-x-1/2 ${
            !isGame && !score
              ? passed
                ? "bg-white dark:bg-secondary-light ring-1 ring-green-500"
                : !disabled
                ? "ring-1 ring-blue-500 bg-white dark:bg-secondary-light"
                : "bg-gray-200 dark:bg-secondary ring-1 ring-secondary-light"
              : "bg-white dark:bg-secondary-light border border-blue-500"
          }`}
        >
          {score ? (
            <div>
              <p className="text-gray-400">{level?.name}</p>
              <p className="text-lg font-semibold">{score}</p>
            </div>
          ) : isGame ? (
            level.name
          ) : (
            `Level ${level?.level}`
          )}
          {!isGame && !score && !deleteBtn && !editBtn ? (
            passed ? (
              <MdCheckCircleOutline className="text-green-600" size={22} />
            ) : disabled ? (
              <MdLock
                className="text-gray-200 dark:text-secondary-light"
                size={22}
              />
            ) : (
              <MdPlayCircleOutline className="text-blue-500" size={22} />
            )
          ) : (
            <div className="flex items-center gap-1">
              {editBtn ? (
                <button
                  className="p-2 hover:bg-blue-500/50 rounded-full pointer-events-auto"
                  onClick={onEditClicked}
                >
                  <MdEdit size={20} />
                </button>
              ) : (
                <></>
              )}
              {deleteBtn ? (
                <button
                  className="p-2 hover:bg-red-500/50 rounded-full pointer-events-auto"
                  onClick={onDeleteClicked}
                >
                  <MdDelete size={20} />
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </a>
    </MyLink>
  );
};

export default LevelCard;
