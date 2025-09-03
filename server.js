const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Streamflix proxy is running - HMR working",
    timestamp: new Date().toISOString(),
    hasApiKey: !!process.env.TMDB_API_KEY,
  });
});

// Trendind endpoint
app.get("/api/movies/trending", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    res.status(500).json({
      error: "Failed to fetch trending movies",
      message: error.message,
    });
  }
});

app.get("/test-tmdb", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();

    res.json({
      success: true,
      message: "TMDB API connection working",
      movieCount: data.results?.length || 0,
      firstMovieTitle: data.results?.[0]?.title || "No movies found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
