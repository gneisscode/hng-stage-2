"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, SearchIcon } from "../icons";
import { fetchSearchResults } from "@/utils/search-results";
import { handleClickOutsideEvent } from "@/utils/click-out";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN || "";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    //@ts-ignore
    handleClickOutsideEvent([searchBarRef], setShowResults),
    []
  );

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim() === "") {
      return;
    }
    const searchResults = await fetchSearchResults(bearerToken, searchQuery);
    setSearchResults(searchResults);
  };
  return (
    <>
      <div className="flex justify-between items-center pt-[14px] lg:pt-[28px]">
        <div className="flex items-center gap-[8px] lg:gap-[24px] ">
          <Image
            src={"/images/tv.svg"}
            alt="logo"
            width={50}
            height={50}
            className="w-[25px] h-[25px] lg:w-[50px] lg:h-[50px]"
          />
          <div className="text-[14px] lg:text-[24px] text-white font-bold leading-[24px]">
            MovieBox
          </div>
        </div>
        <div className="flex flex-col relative w-[40%] lg:w-[525px]">
          <div className="flex items-center justify-between w-[100%] lg:w-[525px] px-[6px] py-[10px] rounded-[6px] h-[28px] lg:h-[36px] border-2 border-[#D1D5DB]">
            <input
              className=" placeholder:text-white border-none outline-none w-[85%] bg-transparent text-white"
              placeholder="What do you want to watch?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                handleSearch(searchQuery);
              }}
              onClick={() => {
                setShowResults(true);
              }}
              ref={searchBarRef}
            />
            <button
              onClick={() => {
                handleSearch(searchQuery);
              }}
            >
              <SearchIcon />
            </button>
          </div>

          {showResults && (
            <div className="absolute bottom-[-9.5em] rounded-lg z-50 w-[100%] lg:w-[525px] h-[150px] overflow-y-scroll bg-white text-black">
              {searchResults.length > 0 ? (
                searchResults.map(({ id, title }) => (
                  <Link
                    href={`/movie/${id}`}
                    key={id}
                    className=" no-underline"
                  >
                    <div className="border-b border-gray-100 p-2 hover:bg-blue-200 cursor-pointer">
                      <p>{title}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="p-[20px] text-center">Nothing to show...</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-[8px] lg:gap-[27px]">
          <p className="text-[12px] lg:text-[16px] font-bold text-white">
            Sign in
          </p>

          <div className="flex justify-center items-center lg:w-[45px] lg:h-[45px] w-[26px] h-[26px] bg-[#BE123C] rounded-full">
            <MenuIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
