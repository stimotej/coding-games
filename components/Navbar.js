import { useState } from "react";
import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import Menu from "./Menu";

const Navbar = () => {
  const router = useRouter();

  const { user, mutate } = useUser();

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");
    mutate(null);
    router.push("/");
  };

  const [menu, setMenu] = useState(false);

  return (
    <div className="h-[56px] flex flex-row items-center justify-between px-4 sm:px-12 bg-white dark:bg-secondary border-b dark:border-0 w-full">
      <Link href="/">
        <a className="font-bold text-xl">
          <span className="text-blue-500 hidden sm:inline">Coding: </span>
          <span className="text-gray-600 dark:text-text-light hidden sm:inline">
            games;
          </span>
          <span className="text-blue-600 sm:hidden">{"{ ; }"}</span>
        </a>
      </Link>
      <div className="flex flex-row items-center">
        {!!user ? (
          <div className="relative">
            <button
              className="flex flex-row items-center dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-secondary-light py-1 px-5 rounded-full"
              onClick={() => setMenu(!menu)}
            >
              {/* <MdPersonOutline className="mr-0 md:mr-2" size={24} /> */}
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-secondary-light mr-2">
                <Image
                  src={user.image || "/default_profile_image.png"}
                  alt="User"
                  width={32}
                  height={32}
                  layout="fixed"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
              <span className="hidden md:block">
                {user?.name || user?.username}
              </span>
            </button>
            <Menu visible={menu} setVisible={setMenu} />
            {/* <button
              className="flex flex-row items-center py-2 px-5 rounded-full dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
              onClick={handleLogOut}
            >
              <MdLogout className="mr-0 md:mr-2" size={24} />
              <span className="hidden md:block">Log out</span>
            </button> */}
          </div>
        ) : (
          <Link href="/login">
            <a className="py-2 px-5 rounded-full dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50">
              Log in
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
