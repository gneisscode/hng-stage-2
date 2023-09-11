import axios from "axios";

export const fetchSearchResults = async (bearerToken: string, query:string) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
