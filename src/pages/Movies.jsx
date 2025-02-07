import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import SmallCard from "../components/SmallCard";
import InputGroup from "../components/InputGroup";
import CustomSkeleton from "../components/CustomSkeleton";
import useFetch from "../hooks/useFetch";
import useErrorHandling from "../hooks/useErrorHandling";
import useSearch from "../hooks/useSearch";
import LoadMore from "../components/LoadMore";

const Movies = () => {
  const loadingArray = useMemo(() => Array.from({ length: 20 }), []);
  const searchValue = useSearch();
  const [pageCount, setPageCount] = useState(1);
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);

  const endPoint = useMemo(
    () =>
      searchValue
        ? `${import.meta.env.VITE_MOVIES_SEARCH_URL}=${searchValue}`
        : `${import.meta.env.VITE_MOVIES_BASE_URL}?page=${pageCount}`,
    [searchValue, pageCount]
  );

  const { data, error, loading } = useFetch(endPoint);
  const { hasError } = useErrorHandling(error);

  useEffect(() => {
    if (data) {
      if (searchValue) {
        setSearchMovies(
          data.filter(({ backdrop_path }) => backdrop_path !== null)
        );
      } else {
        setMovies((prevMovies) => [
          ...prevMovies,
          ...data.filter(({ backdrop_path }) => backdrop_path !== null),
        ]);
      }
    }
  }, [data, searchValue]);

  useEffect(() => {
    if (!searchValue) {
      setSearchMovies([]);
    }
  }, [searchValue]);

  function handleButton() {
    if (!searchValue) {
      setPageCount((prevPage) => prevPage + 1);
    }
  }

  return (
    <>
      <Toaster />
      <div className="md:pl-[165px] md:pt-16 pt-20 flex flex-col gap-[34px] ">
        <div className="md:pl-0 pl-[15px]">
          <InputGroup />
        </div>
        <div
          className={`flex flex-col gap-[38px] ${hasError ? "hidden" : "flex"}`}
        >
          <h1
            className={`text-white ${
              searchValue?.length > 0 ? "hidden" : "flex"
            } font-abc md:text-[32px] sm:text-[32px] text-xl font-normal tracking-[-0.5px] md:pl-0 pl-[15px]`}
          >
            Movies
          </h1>
          <h1
            className={`text-white ${
              searchValue?.length > 0 ? "flex" : "hidden"
            } font-abc md:text-[32px] md:pl-0 pl-[15px] sm:text-[32px] text-xl font-normal tracking-[-0.5px]`}
          >
            {`Found ${searchMovies?.length} results for ‘${searchValue}’`}
          </h1>
          <div className="w-full m-auto px-4 md:px-0">
            <ul className="grid md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-10 grid-cols-2 sm:grid-cols-3 gap-[15px] md:pr-4 md:pb-10">
              {loading
                ? loadingArray.map((_, index) => (
                    <li
                      key={index}
                      className=" md:w-[280px] w-full md:h-[200px] sm:h-[180px] h-[150px]"
                    >
                      <CustomSkeleton key={index} />
                    </li>
                  ))
                : (searchValue ? searchMovies : movies || [])?.map(
                    (
                      {
                        title,
                        id,
                        backdrop_path,
                        release_date,
                        original_language,
                      },
                      index
                    ) => (
                      <li key={`${id}-${index}`}>
                        <SmallCard
                          title={title}
                          img={backdrop_path}
                          releaseDate={release_date}
                          originalLanguage={original_language}
                        />
                      </li>
                    )
                  )}
            </ul>
          </div>
        </div>
        <LoadMore handleButton={handleButton} searchValue={searchValue} />
      </div>
    </>
  );
};

export default Movies;
