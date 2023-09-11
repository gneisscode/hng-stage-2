import axios from "axios";

export const fetchMovieDetails = async (bearerToken: string, id: string | undefined | string[]) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return [];
  }
};
