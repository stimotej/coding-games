import axios from "axios";
import { SWRConfig } from "swr";
import "../styles/globals.css";

axios.defaults.baseURL = "http://localhost:5000/api";

function MyApp({ Component, pageProps }) {
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
