import { useState } from "react";
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        setError(false);
        localStorage.setItem("auth-token", res.data);
        router.push("/");
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response?.status === 400)
          setError("Wrong username or password.");
        else setError("Something went wrong.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-row h-screen items-center justify-center bg-gray-100 dark:bg-background">
      <div className="bg-white dark:bg-secondary p-6 rounded-lg w-4/5 sm:w-1/2 lg:w-1/3 border dark:border-0">
        <h1 className="text-xl font-semibold dark:text-white">Login</h1>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col mt-6">
          <input
            type="text"
            className="bg-gray-100 dark:bg-secondary-light rounded-lg p-3 outline-none dark:text-white"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="bg-gray-100 dark:bg-secondary-light rounded-lg p-3 outline-none mt-4 dark:text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-800 text-white p-3 rounded-lg mt-4"
            disabled={loading}
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
