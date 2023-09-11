"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchNowPlaying } from "@/utils/now-playing";
import { PlayIcon } from "../icons";
import Nav from "./Nav";


export default function Header() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN || "";


  useEffect(() => {
    const getNowPlaying = async () => {
      const movies = await fetchNowPlaying(bearerToken);
      setNowPlaying(movies);
    };

    getNowPlaying();
  }, [bearerToken]);

  const firstFiveMovies = nowPlaying.slice(0, 5);

  return (
    <>
      <div className=" bg-[url('/images/Poster.png')] h-[340px] lg:h-[600px] px-[12px] lg:px-[169px] w-full bg-cover bg-no-repeat">
        <Nav />
        <section className="flex w-[100%] justify-between">
          <div>
            <div className="w-[50%] mt-[42px] text-white">
              <div className="text-[14px] lg:text-[48px] font-bold text-white ">
                John Wick 3 : Parabellum
              </div>
              <div className="flex gap-4 mt-[14px] lg:mt-[49px]">
                <div className="flex gap-2">
                  <img src="/images/imdb.svg" alt="imdb" />
                  <p className="text-sm">86/100</p>
                </div>
                <div className="flex gap-2">
                  <img src="/images/tomato.svg" alt="tomato" />
                  <p className="text-sm">97%</p>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-white">
                John Wick is on the run after killing a member of the
                international assassins' guild, and with a $14 million price tag
                on his head, he is the target of hit men and women everywhere.
              </p>
              <button className="flex justify-center items-center gap-2 bg-[#BE123C] w-[169px] h-[36px] mt-4 rounded-[6px]">
                <PlayIcon /> WATCH TRAILER
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-[10px] text-[12px] lg:text-base text-white">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
          </div>
        </section>
      </div>

      {/* {firstFiveMovies.map(({ original_title, index }) => {
        return <p key={index}>{original_title}</p>;
      })} */}
    </>
  );
}
