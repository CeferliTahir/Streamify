import InputGroup from "../components/InputGroup";
import Trending from "../components/Trending";
import Recommended from "../components/Recommended";

const Home = () => {
  return (
    <>
      <div className="md:pl-[165px] pt-20 md:pt-16 flex flex-col gap-6 md:gap-[34px]">
        <div className="md:pl-0 pl-[15px]">
          <InputGroup />
        </div>
        <div className="flex flex-col gap-10">
          <Trending />
          <Recommended />
        </div>
      </div>
    </>
  );
};

export default Home;
