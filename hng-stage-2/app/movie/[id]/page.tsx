"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchMovieDetails } from "@/utils/movie-details";
import SideBar from "@/components/ui/SideBar";

type TMovieDetails = {
  title: string;
  poster: string;
  runtime: string;
  release_date: string;
  overview: string;
  genres: [];
  vote_average: string;
  vote_count: string;
};

const MovieDetail = () => {
  const params = useParams();

  const id = params.id;
  const [movieDetails, setMovieDetails] = useState<TMovieDetails>({
    title: "",
    poster: "",
    runtime: "",
    release_date: "",
    overview: "",
    genres: [],
    vote_average: "",
    vote_count: "",
  });

  const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN || "";

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const getMovieDetails = async () => {
      if (id) {
        const movie = await fetchMovieDetails(bearerToken, id);

        setMovieDetails({
          title: movie.title || "",
          poster: movie.poster_path || "",
          runtime: movie.runtime || "",
          release_date: movie.release_date || "",
          overview: movie.overview || "",
          genres: movie.genres || [],
          vote_average: movie.vote_average || "",
          vote_count: movie.vote_count || "",
        });
      }
    };

    getMovieDetails();
  }, [bearerToken, id]);

  useEffect(() => {
    console.log(movieDetails);
  }, [id]);

  return (
    <div className="flex gap-[40px]">
      <aside>
        <SideBar />
      </aside>
      <main>
        <img src={`${imageBaseUrl}${movieDetails.poster}`} alt="movie-poster" className="w-[300px] h-[400px]" />
        <p>{movieDetails?.title}</p>
        <p>{movieDetails?.runtime}</p>
        <p>{movieDetails?.release_date}</p>
        <p>{movieDetails?.overview}</p>
        <p>{movieDetails?.vote_average}</p>
        <p>{movieDetails?.vote_count}</p>

        <div>
          {movieDetails.genres.map(({ name }, index) => {
            return <p key={index}>{name}</p>;
          })}
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
