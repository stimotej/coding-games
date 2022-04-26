import Link from "next/link";
import { MdAdd } from "react-icons/md";
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
    <div className="h-[56px] flex flex-row items-center justify-between px-12 bg-white border-b w-full">
      <Link href="/">
        <a className="font-bold text-xl">
          <span className="text-blue-500">Coding</span>:{" "}
          <span className="text-gray-600">games</span>;
        </a>
      </Link>
      <div className="flex flex-row items-center">
        {!!user ? (
          <>
            <Link href="/profile">
              <a className="font-semibold mr-4">{user?.name}</a>
            </Link>
            <button
              className="py-2 px-5 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={handleLogOut}
            >
              Log out
            </button>
            {router.pathname === "/games/css" && user.role === "Admin" && (
              <Link href="/games/css/new-level">
                <a className="py-2 px-5 rounded-full bg-gray-200 hover:bg-gray-300 ml-2">
                  Create level
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
