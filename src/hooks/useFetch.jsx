import { useEffect, useState } from "react";
import { instance } from "../api/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;
    const getRecommended = async () => {
      try {
        const res = await instance.get(url);
        setData(res.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getRecommended();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
