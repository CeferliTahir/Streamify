import { useEffect, useMemo, useState } from "react";
import SmallCard from "./SmallCard";
import CustomSkeleton from "./CustomSkeleton";
import { Toaster } from "react-hot-toast";
import useErrorHandling from "../hooks/useErrorHandling";
import { shuffleArray } from "../helper/helper";
import useFetch from "../hooks/useFetch";
import useSearch from "../hooks/useSearch";
import LoadMore from "./LoadMore";

const Recommended = () => {
  const loadingArray = useMemo(() => Array.from({ length: 20 }), []);
  const [pageCount, setPageCount] = useState(1);
  const [content, setContent] = useState([]);
  const [searchContent, setSearchContent] = useState([]);

  const searchValue = useSearch();

  const { series, movies } = useMemo(
    () => ({
      series: searchValue
        ? `${import.meta.env.VITE_SERIES_SEARCH_URL}=${searchValue}`
        : `${import.meta.env.VITE_SERIES_BASE_URL}?page=${pageCount}`,
      movies: searchValue
        ? `${import.meta.env.VITE_MOVIES_SEARCH_URL}=${searchValue}`
        : `${import.meta.env.VITE_MOVIES_BASE_URL}?page=${pageCount}`,
    }),
    [searchValue, pageCount]
  );

  const {
    data: seriesData,
    error: seriesError,
    loading: seriesLoading,
  } = useFetch(series);
  const {
    data: movieData,
    error: movieError,
    loading: moviesLoading,
  } = useFetch(movies);

  const shuffled = useMemo(
    () => shuffleArray(seriesData, movieData),
    [seriesData, movieData]
  );

  useEffect(() => {
    if (shuffled) {
      if (searchValue) {
        setSearchContent(shuffled);
      } else {
        setContent((prev) => [...prev, ...shuffled]);
      }
    }
  }, [searchValue, shuffled]);

  useEffect(() => {
    if (!searchValue) {
      setSearchContent([]);
    }
  }, [searchValue]);

  const { hasError } = useErrorHandling(seriesError || movieError);

  const handleButton = () => {
    if (!searchValue) {
      setPageCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <Toaster />
      <div className={`flex-col gap-8 ${hasError ? "hidden" : "flex"} `}>
        {
          <h1
            className={`text-white ${
              searchValue?.length > 0 ? "hidden" : "flex"
            } font-abc md:text-[32px] sm:text-[32px] text-xl font-normal tracking-[-0.5px] pl-[15px] md:pl-0`}
          >
            Recommended for you
          </h1>
        }
        {
          <h1
            className={`text-white ${
              searchValue?.length > 0 ? "flex" : "hidden"
            } font-abc md:text-[32px] sm:text-[32px] text-xl font-normal tracking-[-0.5px] pl-[15px] md:pl-0`}
          >
            {`Found ${shuffled?.length} results for ‘${searchValue}’`}
          </h1>
        }
        <div className="w-full m-auto px-4 md:px-0 ">
          <ul className="grid md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-10 grid-cols-2 sm:grid-cols-3 gap-[15px] md:pr-4 md:pb-10">
            {moviesLoading && seriesLoading
              ? loadingArray.map((_, index) => (
                  <li
                    key={index}
                    className="md:w-[280px] w-full md:h-[200px] sm:h-[180px] h-[150px]"
                  >
                    <CustomSkeleton />
                  </li>
                ))
              : (searchValue ? searchContent : content)?.map(
                  (
                    {
                      title,
                      id,
                      backdrop_path,
                      name,
                      original_language,
                      first_air_date,
                      release_date,
                    },
                    index
                  ) => (
                    <li key={id || index}>
                      <SmallCard
                        title={title}
                        img={backdrop_path}
                        name={name}
                        firstAirDate={first_air_date}
                        originalLanguage={original_language}
                        releaseDate={release_date}
                      />
                    </li>
                  )
                )}
          </ul>
        </div>
        <LoadMore handleButton={handleButton} searchValue={searchValue} />
      </div>
    </>
  );
};

export default Recommended;
