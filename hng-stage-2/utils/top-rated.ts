import axios from "axios";

export const fetchTopMovies = async (bearerToken: string) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const apiUrl =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return [];
  }
};
