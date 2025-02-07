import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import SmallCard from "../components/SmallCard";
import InputGroup from "../components/InputGroup";
import CustomSkeleton from "../components/CustomSkeleton";
import useFetch from "../hooks/useFetch";
import useErrorHandling from "../hooks/useErrorHandling";
import useSearch from "../hooks/useSearch";
import LoadMore from "../components/LoadMore";

const TVSeries = () => {
  const loadingArray = useMemo(() => Array.from({ length: 20 }), []);
  const searchValue = useSearch();
  const [pageCount, setPageCount] = useState(1);
  const [series, setSeries] = useState([]);
  const [searchSeries, setSearchSeries] = useState([]);

  const endPoint = useMemo(
    () =>
      searchValue
        ? `${import.meta.env.VITE_SERIES_SEARCH_URL}=${searchValue}`
        : `${import.meta.env.VITE_SERIES_BASE_URL}?page=${pageCount}`,
    [searchValue, pageCount]
  );

  const { data, error, loading } = useFetch(endPoint);
  const { hasError } = useErrorHandling(error);

  useEffect(() => {
    if (data) {
      if (searchValue) {
        setSearchSeries(
          data.filter(({ backdrop_path }) => backdrop_path !== null)
        );
      } else {
        setSeries((prevMovies) => [
          ...prevMovies,
          ...data.filter(({ backdrop_path }) => backdrop_path !== null),
        ]);
      }
    }
  }, [data, searchValue]);

  useEffect(() => {
    if (!searchValue) {
      setSearchSeries([]);
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
      <div className="md:pl-[165px] md:pt-16 pt-20 flex flex-col gap-[34px]">
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
            TV Series
          </h1>
          <h1
            className={`text-white ${
              searchValue?.length > 0 ? "flex" : "hidden"
            } font-abc md:text-[32px] md:pl-0 pl-[15px] sm:text-[32px] text-xl font-normal tracking-[-0.5px]`}
          >
            {`Found ${searchSeries?.length} results for ‘${searchValue}’`}
          </h1>
          <div className="w-full m-auto px-4 md:px-0">
            <ul className="grid md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-10 grid-cols-2 sm:grid-cols-3 gap-[15px] md:pr-4 md:pb-10">
              {loading
                ? loadingArray.map((_, index) => (
                    <li
                      key={index}
                      className=" md:w-[280px] w-full md:h-[200px] sm:h-[180px] h-[150px]"
                    >
                      <CustomSkeleton />
                    </li>
                  ))
                : (searchValue ? searchSeries : series)?.map(
                    (
                      {
                        name,
                        id,
                        backdrop_path,
                        original_language,
                        first_air_date,
                      },
                      index
                    ) => (
                      <li key={`${id}-${index}`}>
                        <SmallCard
                          name={name}
                          img={backdrop_path}
                          originalLanguage={original_language}
                          firstAirDate={first_air_date}
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

export default TVSeries;
