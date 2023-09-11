import React from "react";
type Tcard = {
  poster_path: string;
  title: string;
  release_date: string;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const Card = ({poster_path, title, release_date}: Tcard) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div>
        <img
          src={`${imageBaseUrl}${poster_path}`}
          alt="movie-poster"
          className=" w-[130px] lg:w-[250px] lg:h-[370px]"
        />
      </div>
      <div className=" text-[#9CA3AF] text-[12px]">{release_date}</div>

      <div className="text-[18px] font-[700]">{title}</div>
    </div>
  );
};

export default Card;
