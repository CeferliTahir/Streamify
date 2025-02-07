import LargeCard from "./LargeCard";
import CustomSkeleton from "./CustomSkeleton";
import { Toaster } from "react-hot-toast";
import useErrorHandling from "../hooks/useErrorHandling";
import useFetch from "../hooks/useFetch";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

const Trending = () => {
  const loadingArray = useMemo(() => Array.from({ length: 4 }), []);
  const [searchParams] = useSearchParams();
  const value = searchParams.get("name");
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_TRENDING_BASE_URL
  );
  const { hasError } = useErrorHandling(error);

  return (
    <>
      <Toaster />
      <div
        className={`flex-col gap-[25px] ${
          hasError || value ? "hidden" : "flex"
        } pl-[15px] md:pl-0`}
      >
        <h1 className="font-abc md:text-[32px] sm:text-[32px] text-xl font-normal tracking-[-0.5px] text-white">
          Trending
        </h1>
        <div className="flex gap-10">
          <ul className="scroll flex md:gap-10 sm:gap-10 gap-4">
            {loading
              ? loadingArray.map((_, index) => {
                  return (
                    <li key={index} className="w-[470px]">
                      <CustomSkeleton />
                    </li>
                  );
                })
              : data?.map(
                  (
                    {
                      title,
                      id,
                      backdrop_path,
                      name,
                      original_language,
                      first_air_date,
                      release_date,
                      media_type,
                    },
                    index
                  ) => {
                    return (
                      <li key={id || index}>
                        <LargeCard
                          title={title}
                          img={backdrop_path}
                          name={name}
                          firstAirDate={first_air_date}
                          originalLanguage={original_language}
                          releaseDate={release_date}
                          mediaType={media_type}
                        />
                      </li>
                    );
                  }
                )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Trending;
