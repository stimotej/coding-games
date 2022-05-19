import { useEffect } from "react";
import axios from "axios";
import { SWRConfig } from "swr";
import "../styles/globals.css";

axios.defaults.baseURL = "http://localhost:5000/api";
// axios.defaults.baseURL = "https://coding-games-mc2.herokuapp.com/api";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
