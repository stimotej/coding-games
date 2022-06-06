import { useState, useEffect } from "react";
import {
  MdPerson,
  MdSettings,
  MdDarkMode,
  MdLightMode,
  MdLogout,
} from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";

const Menu = ({ visible, setVisible }) => {
  const router = useRouter();

  const { user, mutate } = useUser();

  const [theme, setTheme] = useState(null);

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");
    mutate(null);
    router.push("/");
  };

  const toggleTheme = () => {
    const nextTheme =
      theme === "auto" ? "dark" : theme === "dark" ? "light" : "auto";
    setTheme(nextTheme);
    if (nextTheme === "auto") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", nextTheme);
    }
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "auto");

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (visible)
    return (
      <>
        <div
          className="fixed top-0 left-0 flex z-10 items-center justify-center w-screen h-screen bg-transparent"
          onClick={() => setVisible(false)}
        ></div>
        <div className="flex flex-col border dark:border-gray-500 shadow-xl shadow-black/20 w-[250px] absolute top-full right-0 rounded-lg bg-white dark:bg-secondary p-2 z-20">
          <button
            className={`flex items-center p-3 w-full rounded-lg hover:bg-gray-100 hover:dark:bg-secondary-light`}
            onClick={() => router.push("/profile")}
          >
            <MdPerson className="mr-0 md:mr-2 text-gray-500" size={24} />
            <div className="flex flex-col items-start ml-2">
              <p className={`dark:text-white`}>Profile</p>
              <p className={`text-gray-500 text-sm`}>
                {user?.name || user?.username}
              </p>
            </div>
          </button>
          <button
            className={`flex items-center p-3 w-full rounded-lg hover:bg-gray-100 hover:dark:bg-secondary-light`}
            onClick={() => router.push("/edit-profile")}
          >
            <MdSettings className="mr-0 md:mr-2 text-gray-500" size={24} />
            <div className={`dark:text-white ml-2`}>Edit Profile</div>
          </button>
          <button
            className={`flex items-center p-3 w-full rounded-lg hover:bg-gray-100 hover:dark:bg-secondary-light`}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <MdLightMode className="mr-0 md:mr-2 text-gray-500" size={24} />
            ) : theme === "dark" ? (
              <MdDarkMode className="mr-0 md:mr-2 text-gray-500" size={24} />
            ) : (
              <VscColorMode className="mr-0 md:mr-2 text-gray-500" size={24} />
            )}
            <div className="flex flex-1 items-center justify-between ml-2">
              <div className={`dark:text-white`}>Theme</div>
              <div className={`text-gray-500 capitalize`}>{theme}</div>
            </div>
          </button>
          <button
            className={`flex items-center p-3 w-full rounded-lg text-gray-500 hover:bg-gray-100 hover:dark:bg-secondary-light`}
            onClick={handleLogOut}
          >
            <MdLogout
              className="mr-0 md:mr-2 text-red-500 dark:text-red-400"
              size={24}
            />
            <div className={`text-red-500 dark:text-red-400 ml-2`}>Log out</div>
          </button>
        </div>
      </>
    );
};

export default Menu;
