import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const useSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      setSearchValue(searchTerm);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchParams.get("name"));
  }, [searchParams]);

  return searchValue;
};

export default useSearch;
