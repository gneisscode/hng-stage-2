"use client"
import React, { useEffect, useState } from "react";
import { fetchTopMovies } from '@/utils/top-rated';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';


export default function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN || "";

  useEffect(() => {
    const getTopMovies = async () => {
      const movies = await fetchTopMovies(bearerToken);
      setTopMovies(movies);
    };

    getTopMovies();
  }, [bearerToken]);

   const topTenMovies = topMovies.slice(0, 10);

  return (
    <main className="flex min-h-screen flex-col w-full pb-[100px]">
      <header>
        <Header />
      </header>

      <section className='px-[44px] lg:px-[98px] pt-[35px] lg:pt-[70px]'>
        <p className=" text-[28px] lg:text-[36px] font-bold mb-[44px]">Featured Movies</p>

        <div className='grid grid-cols-2 lg:grid-cols-5 lg:gap-[80px] gap-4'>
          {topTenMovies.map(({ title, index, release_date, poster_path }) => {
            return (
              <Card title={title} release_date={release_date} poster_path={poster_path} key={index} />
            )
          })}
        </div>
      </section>
    </main>
  );
}
