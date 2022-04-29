import Link from "next/link";
import { MdLogout, MdAdd, MdPersonOutline } from "react-icons/md";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const { user } = useUser();

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");
    router.push("/login");
  };

  return (
    <div className="h-[56px] flex flex-row items-center justify-between px-4 sm:px-12 bg-white border-b w-full">
      <Link href="/">
        <a className="font-bold text-xl">
          <span className="text-blue-500 hidden sm:inline">Coding: </span>
          <span className="text-gray-600 hidden sm:inline">games;</span>
          <span className="text-blue-600 sm:hidden">{"{ ; }"}</span>
        </a>
      </Link>
      <div className="flex flex-row items-center">
        {!!user ? (
          <>
            <Link href="/profile">
              <a className="flex flex-row items-center font-semibold mr-2 hover:bg-gray-100 py-2 px-5 rounded-full">
                <MdPersonOutline className="mr-0 md:mr-2" size={24} />
                <span className="hidden md:block">{user?.name}</span>
              </a>
            </Link>
            <button
              className="flex flex-row items-center py-2 px-5 rounded-full bg-gray-100 hover:bg-gray-200"
              onClick={handleLogOut}
            >
              <MdLogout className="mr-0 md:mr-2" size={24} />
              <span className="hidden md:block">Log out</span>
            </button>
            {router.pathname === "/css/select-level" && user.role === "Admin" && (
              <Link href="/css/new-level">
                <a className="flex flex-row items-center py-2 px-5 rounded-full bg-gray-100 hover:bg-gray-200 ml-2">
                  <MdAdd className="mr-0 md:mr-2" size={24} />
                  <span className="hidden md:block">Create level</span>
                </a>
              </Link>
            )}
          </>
        ) : (
          <Link href="/login">
            <a className="py-2 px-5 rounded-full bg-black hover:bg-gray-800 text-white">
              Log in
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
