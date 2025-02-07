const LoadMore = ({ handleButton, searchValue }) => {
  return (
    <>
      <div className="md:pb-[105px] pb-[61px] w-full flex justify-center items-center">
        <button
          onClick={handleButton}
          className={`text-white bg-[#FC4747] py-4 px-[30px] text-base rounded-[5px] hover:md:bg-[red] font-abc font-bold ${
            searchValue ? "hidden" : "flex"
          }`}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default LoadMore;
