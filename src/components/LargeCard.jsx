const LargeCard = ({
  title,
  img,
  name,
  originalLanguage,
  firstAirDate,
  releaseDate,
  mediaType,
}) => {
  function DataYear(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    return year;
  }
  return (
    <>
      <div className="md:w-[470px] md:h-[230px] sm:w-[470px] sm:h-[230px] w-[240px] h-[140px] relative cursor-pointer rounded-lg overflow-hidden group">
        <img
          className="w-full h-full bg-center bg-cover object-cover"
          src={import.meta.env.VITE_IMAGE_BASE_URL + img}
          alt="SORRE"
        />
        <div className="play-hover w-full h-full hidden group-hover:md:flex absolute top-0 items-center justify-center">
          <button className="play-button flex items-center font-abc gap-[19px] rounded-[28.5px] py-3 pr-6 pl-[9px] text-white text-lg font-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 15C0 6.7125 6.7125 0 15 0C23.2875 0 30 6.7125 30 15C30 23.2875 23.2875 30 15 30C6.7125 30 0 23.2875 0 15ZM21 14.5L12 8V21L21 14.5Z"
                fill="white"
              />
            </svg>
            Play
          </button>
        </div>
        <div className="save-button top-4 right-6 absolute z-10">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <circle
                opacity="0.500647"
                cx="16"
                cy="16"
                r="16"
                fill="#10141E"
              />
              <path
                d="M20.7112 9.771L20.7215 9.77548L20.7319 9.77965C20.7992 9.80657 20.8386 9.84049 20.8705 9.88692C20.9032 9.93458 20.9167 9.97786 20.9167 10.0364V21.9636C20.9167 22.0221 20.9032 22.0654 20.8705 22.1131C20.8386 22.1595 20.7992 22.1934 20.7319 22.2203L20.7237 22.2236L20.7156 22.2271C20.7107 22.2292 20.6807 22.2407 20.6094 22.2407C20.5085 22.2407 20.4397 22.2142 20.3686 22.15L16.3572 18.2346L15.8333 17.7233L15.3095 18.2346L11.2975 22.1505C11.2129 22.2276 11.1421 22.25 11.0573 22.25C11.02 22.25 10.9882 22.2433 10.9555 22.229L10.9452 22.2245L10.9347 22.2203C10.8674 22.1934 10.8281 22.1595 10.7962 22.1131C10.7635 22.0654 10.75 22.0221 10.75 21.9636V10.0364C10.75 9.97786 10.7635 9.93458 10.7962 9.88692C10.8281 9.84049 10.8674 9.80657 10.9347 9.77965L10.9452 9.77548L10.9555 9.771C10.9882 9.75674 11.02 9.75 11.0573 9.75H20.6094C20.6466 9.75 20.6784 9.75674 20.7112 9.771Z"
                stroke="white"
                stroke-width="1.5"
              />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-6 left-6 text-white font-abc">
          <div className="flex items-center md:text-[15px] sm:text-[15px] text-xs font-normal opacity-[0.75] gap-2">
            <p>
              {firstAirDate ? DataYear(firstAirDate) : DataYear(releaseDate)}
            </p>
            <p>.</p>
            <div className="flex items-center gap-[6px]">
              {name ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    opacity="0.75"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.448 2.68865H12V12H0V2.68865H2.952L1.332 0.72163L2.268 0.0174588L4.2 2.3453L6.132 0L7.068 0.72163L5.448 2.68865ZM1.2 3.85257V10.8361H7.2V3.85257H1.2ZM10.2 8.50824H9V7.34433H10.2V8.50824ZM9 6.18041H10.2V5.01649H9V6.18041Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    opacity="0.75"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.1733 0H1.82667C0.817827 0 0 0.817827 0 1.82667V10.1733C0 11.1822 0.817827 12 1.82667 12H10.1733C10.6578 12 11.1224 11.8075 11.465 11.465C11.8075 11.1224 12 10.6578 12 10.1733V1.82667C12 1.3422 11.8075 0.877585 11.465 0.535018C11.1224 0.192452 10.6578 0 10.1733 0ZM2.4 5.4H1.2V4.2H2.4V5.4ZM2.4 6.6H1.2V7.8H2.4V6.6ZM10.8 5.4H9.6V4.2H10.8V5.4ZM10.8 6.6H9.6V7.8H10.8V6.6ZM10.8 1.644V2.4H9.6V1.2H10.356C10.4738 1.2 10.5867 1.24678 10.67 1.33004C10.7532 1.41331 10.8 1.52624 10.8 1.644ZM2.4 1.2H1.644C1.52624 1.2 1.41331 1.24678 1.33004 1.33004C1.24678 1.41331 1.2 1.52624 1.2 1.644V2.4H2.4V1.2ZM1.2 10.356V9.6H2.4V10.8H1.644C1.52624 10.8 1.41331 10.7532 1.33004 10.67C1.24678 10.5867 1.2 10.4738 1.2 10.356ZM10.356 10.8C10.6012 10.8 10.8 10.6012 10.8 10.356V9.6H9.6V10.8H10.356Z"
                    fill="white"
                  />
                </svg>
              )}
              <p>{mediaType}</p>
            </div>
            <p>.</p>
            <p>{originalLanguage}</p>
          </div>
          <h1 className="md:text-2xl sm:text-2xl text-[15px] font-normal">
            {title} {name}
          </h1>
        </div>
      </div>
    </>
  );
};

export default LargeCard;
