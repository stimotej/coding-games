import useUser from "../lib/useUser";
import Link from "next/link";
import { MdArrowBack, MdLogout } from "react-icons/md";
import { useRouter } from "next/router";

const Sidebar = ({
  items,
  links,
  value,
  onChange,
  className,
  backHref,
  backText,
  logout,
}) => {
  const router = useRouter();

  const { user } = useUser();

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");
    mutate(null);
    router.push("/");
  };

  return (
    <div
      className={`flex flex-col p-2 bg-white border dark:bg-secondary dark:border-0 rounded-lg ${className}`}
    >
      {backText && backHref ? (
        <>
          <Link href={backHref}>
            <a
              className={`flex items-center p-3 my-1 w-full rounded-lg dark:text-white hover:bg-gray-100 hover:dark:bg-secondary-light
          `}
            >
              <MdArrowBack size={22} className="text-gray-500 mr-2" />
              {backText}
            </a>
          </Link>
          <div className="h-px w-full bg-gray-500/50 my-1" />
        </>
      ) : (
        <></>
      )}
      {links
        ? items.map((item, index) => (
            <Link key={index} href={item.value}>
              <a
                className={`flex items-center p-3 my-1 w-full rounded-lg text-gray-500 ${
                  value === item.value.split("#")[1]
                    ? "bg-gray-100 dark:bg-secondary-light"
                    : "hover:bg-gray-100 hover:dark:bg-secondary-light"
                }`}
              >
                {item.icon}
                <div
                  className={`text-black dark:text-white ${
                    item.icon ? "ml-2" : ""
                  }`}
                >
                  {item.title}
                </div>
              </a>
            </Link>
          ))
        : items.map((item, index) => {
            if (item?.adminOnly && user?.role !== "Admin") return;
            return (
              <button
                key={index}
                className={`flex items-center p-3 my-1 w-full rounded-lg text-gray-500 ${
                  value === item.value
                    ? "bg-gray-100 dark:bg-secondary-light"
                    : "hover:bg-gray-100 hover:dark:bg-secondary-light"
                }`}
                onClick={() => onChange(item.value)}
              >
                {item.icon}
                <div
                  className={`text-black dark:text-white ${
                    item.icon ? "ml-2" : ""
                  }`}
                >
                  {item.title}
                </div>
              </button>
            );
          })}
      {logout ? (
        <button
          className={`flex items-center p-3 my-1 w-full rounded-lg text-gray-500 hover:bg-gray-100 hover:dark:bg-secondary-light`}
          onClick={handleLogOut}
        >
          <MdLogout
            className="mr-0 md:mr-2 text-red-500 dark:text-red-400"
            size={24}
          />
          <div className={`text-red-500 dark:text-red-400 ml-2`}>Log out</div>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Sidebar;
