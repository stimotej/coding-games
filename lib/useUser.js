import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function useUser() {
  const router = useRouter();

  const { data, error } = useSWR(`/auth/profile`, (url) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })
      .then((res) => res.data)
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
