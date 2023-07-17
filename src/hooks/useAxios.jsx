import { useEffect, useState } from "react";
import axios from "axios";

export const useAxios = (url) => {
  const [nextPage, setNextPage] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setNextPage(response.data._links.next.href);
      console.log(response);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(url);
  }, [url]);

  return {
    data,
    loading,
    error,
    fetchData,
    setData,
    setLoading,
    setError,
    nextPage,
    setNextPage,
  };
};
