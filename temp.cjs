// // const axios = require("axios");
// // // const fs = require("fs");

// // const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTNjZmUxNDBkOTMwYTRmZjczZWMyNThjNGU0ZGY1YyIsIm5iZiI6MTc0Njk5NjA0NC4yMzEsInN1YiI6IjY4MjEwYjRjNTU1OGU3YzY3NWExNjA4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.geVfokP5Ck2H0dj0R4pljk0R2DQKpWhtiGJZwoes8NY";

// // const headers = {
// //   Authorization: `Bearer ${BEARER_TOKEN}`,
// //   accept: "application/json",
// // };

// // const TOTAL_PAGES = 25; // 20 movies per page × 25 pages = 500 movies
// // const MOVIES = [];

// // async function fetchMovies() {
// //   for (let page = 1; page <= TOTAL_PAGES; page++) {
// //     const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

// //     try {
// //       const response = await axios.get(url, { headers });
// //       const results = response.data.results;

// //       results.forEach((movie) => {
// //         MOVIES.push({
// //           title: movie.title,
// //           rating: movie.vote_average,
// //           release_date: movie.release_date,
// //           language: movie.original_language,
// //           overview: movie.overview,
// //         });
// //       });

// //       console.log(`Fetched page ${page}`);
// //     } catch (error) {
// //       console.error(`Error fetching page ${page}:`, error.message);
// //     }
// //   }

// //   fs.writeFileSync("tmdb_movies.json", JSON.stringify({ movies: MOVIES }, null, 2));
// //   console.log(`Saved ${MOVIES.length} movies to tmdb_movies.json`);
// // }

// // fetchMovies();



// const axios = require("axios");
// const fs = require("fs");

// // Replace this with your actual OMDb API key
// const OMDB_API_KEY = "43d4c90a";

// // Generate 500 IMDb IDs from tt1000000 to tt1000499
// const imdbIDs = [];
// for (let i = 1; i <= 500; i++) {
//   imdbIDs.push(`tt${i.toString().padStart(7, "0")}`);
// }
// const MOVIES = [];

// async function fetchMovies() {
//   for (let i = 0; i < imdbIDs.length; i++) {
//     const imdbID = imdbIDs[i];
//     const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`;

//     try {
//       const response = await axios.get(url);
//       const movie = response.data;

//       if (movie && movie.Response !== "False") {
//         MOVIES.push(movie);
//         console.log(`✅ Fetched: ${movie.Title} (${i + 1}/${imdbIDs.length})`);
//       } else {
//         console.warn(`⚠️ Not found: ${imdbID} (${i + 1}/${imdbIDs.length})`);
//       }
//     } catch (error) {
//       console.error(`❌ Error fetching ${imdbID}:`, error.message);
//     }
//   }

//   fs.writeFileSync("omdb_movies.json", JSON.stringify({ movies: MOVIES }, null, 2));
//   console.log(`🎉 Saved ${MOVIES.length} valid movies to omdb_movies.json`);
// }


const OMDB_API_KEY = "43d4c90a";
let imdbData = [];

async function fetchMovies() {
  for (let i = 1; i <= 500; i++) {
    const imdbID = `tt${i.toString().padStart(7, "0")}`;
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
      const movie = response.data;

      if (movie && movie.Response === "True") {
        imdbData.push(movie);
      }
    } catch (error) {
     
    }
  }

  console.log(imdbData); // Print all collected movies
}
 fetchMovies();


 / const axios = require("axios");


// const axios = require("axios");
// const fs = require("fs");

// // Replace this with your actual OMDb API key
const OMDB_API_KEY = "43d4c90a";
let imdbData = [];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchMovies() {
  for (let i = 0000001; i <= 9999999; i++) {
    const imdbID = `tt${i.toString().padStart(7, "0")}`;
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`, {
        timeout: 5000, // 5 seconds timeout
      });
      const movie = response.data;

      if (movie && movie.Response === "True") {
        imdbData.push(movie);
       
      } 
    } catch (error) {

    }

    // Delay between requests to avoid rate limits
    await delay(500);
  }

  console.log(imdbData);
}


fetchMovies();
// (async () => {
//   const movies = await getMovies(URL);
//   createMovieCard(fullData);
// })();

