const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};
let generValues=Object.values(genreMap)
generValues.sort();
const parentElement=document.querySelector(".main");
const searchInput=document.querySelector(".input");
const movieRating=document.querySelector("#rating-select");
const movieGenre=document.querySelector("#genre-select");
let searchValue="";
let rating=0;
let genreInput="";

let filteredArrayMovies=[]
const URL = "https://api.themoviedb.org/3/movie/popular?api_key=3e3cfe140d930a4ff73ec258c4e4df5c";
  let fullData = []; // Declare data as an array
const getMovies = async (url) => {
// axios.get(url, { timeout: 10000 }) // 10 seconds

  for (let page = 1; fullData.length < 600; page++) {
    const response = await axios.get(`${url}&page=${page}`);
    // console.log(response)
    // console.log(response.data)
    const movies = response.data.results;

    if (!movies || movies.length === 0) 
      break;
// console.log(...movies)
    fullData.push(...movies);
  }

  // console.log(fullData); // Print all collected movies
};


// fetch(URL)
// .then((response)=>response.json())
//  .then((fullData)=> console.log(data))
//  .catch((err)=> console.log(err))

// Function that creates HTML tag
const createElement=(element)=> document.createElement(element)
const imageLink="https://image.tmdb.org/t/p/w500/"
//function that create Movi card

const createMovieCard=(movies)=>{

    for(let movie of movies)
    {
const cardContainer = createElement("div");
    cardContainer.classList.add("card", "shadow");

    const imageContainer = createElement("div");
    imageContainer.classList.add("card-image-container");

    const imageEle = createElement("img");
    imageEle.classList.add("card-image");
    imageEle.setAttribute("src", `${imageLink}${movie.poster_path}`);
    imageEle.setAttribute("alt", movie.original_title);

    imageContainer.appendChild(imageEle);
    cardContainer.appendChild(imageContainer);

    const cardDetails = createElement("div");
    cardDetails.classList.add("movie-details");

    const titleEle = createElement("p");
    titleEle.classList.add("title");
    titleEle.innerText = movie.original_title;
    cardDetails.appendChild(titleEle);

    const genreNames = movie.genre_ids.map(id => genreMap[id] || "Unknown").join(", ");
    const genreEle = createElement("p");
    genreEle.classList.add("genre");
    genreEle.innerText = `Genre: ${genreNames}`;
    cardDetails.appendChild(genreEle);

    const movieRating = createElement("div");
    movieRating.classList.add("ratings");

    const starRating = createElement("div");
    starRating.classList.add("star-rating");

    const starIcon = createElement("span");
    starIcon.classList.add("material-symbols-outlined");
    starIcon.innerText = "star";
    starRating.appendChild(starIcon);

    const ratingValue = createElement("span");
    ratingValue.innerText = movie.vote_average;
    starRating.appendChild(ratingValue);

    movieRating.appendChild(starRating);

    const timeOfMovie = createElement("p");
    timeOfMovie.innerText = "137 mins"; // Static value; you might want to fetch actual runtime
    movieRating.appendChild(timeOfMovie);

    cardDetails.appendChild(movieRating);
    cardContainer.appendChild(cardDetails);
    parentElement.appendChild(cardContainer);
    }
}

 function handleSearch(event){
  
searchValue=event.target.value.toLowerCase();
console.log(searchValue);
const filteredBySearch=getFilteredData()
// console.log("filtered data",filteredArrayMovies)
if(filteredBySearch.length==0){
parentElement.innerHTML="";
const pre=createElement("pre");
pre.innerText="No Result Found!!!"
pre.classList.add()
parentElement.appendChild(pre);

}
parentElement.innerHTML="";
createMovieCard(filteredBySearch);


};


function debounce(callback, delay) {
  let timerId; // Step 1: Declare a variable to store the timeout ID

  return (...args) => { // Step 2: Return a new function that captures any arguments passed to it
    
    clearTimeout(timerId); // Step 3: Clear the previous timer if it exists

    // Step 4: Set a new timer that waits for the specified delay
    timerId = setTimeout(() => {
      callback(...args); // Step 5: After the delay, call the original callback with the arguments
    }, delay);
  };
}

const debounceInput=debounce(handleSearch,0);//may 1000 i sec

function getFilteredData()
{
  filteredArrayMovies=searchValue?.length>0 ? fullData.filter(movie=> movie.original_title?.toLowerCase().includes(searchValue) || 
searchValue ===movie.director_name?.toLowerCase()||
 movie.writter_name?.toLowerCase().split(",").includes(searchValue)
|| movie.cast_name?.toLowerCase().split(",").includes(searchValue) ):fullData;

if(rating>0)
{
filteredArrayMovies=searchValue?.length>0?filteredArrayMovies:fullData;
if(rating==4)
  filteredArrayMovies=filteredArrayMovies.filter(movie=>movie.vote_average<=rating);
else
filteredArrayMovies=filteredArrayMovies.filter(movie=>movie.vote_average>=rating)

}

if(genreInput?.length>0){
//   filteredArrayMovies=searchValue?.length>0 && rating >0 ?filteredArrayMovies:fullData;
//  filteredArrayMovies=filteredArrayMovies.filter((movie)=>movie.geners.toLowerCase().includes(genreInput));
//
filteredArrayMovies = filteredArrayMovies.filter((movie) => {
  const genreNames = movie.genre_ids.map(id => genreMap[id]?.toLowerCase() || "");
  return genreNames.includes(genreInput);
});
 }
return filteredArrayMovies;

}

function handleRatingSelector(event){
  rating=event.target.value;
  // console.log(rating)
  let filteredByRating= getFilteredData();
  parentElement.innerHTML="";
createMovieCard(rating?filteredByRating:fullData);
}

searchInput.addEventListener("input",debounceInput);
movieRating.addEventListener("change",handleRatingSelector);
(async () => {
  const movies = await getMovies(URL);
  createMovieCard(fullData);
})();

// //Fliteres Genre
// const genres=fullData.reduce((acc,cur)=>{
// let genersArr=[];
// let tempGenreArr=Cur.genre.split(",");
// acc=[...acc,...tempGenreArr];
// for(let genre of acc){
//   if(genre of acc){
//     if(!genersArr.includes(genre))
//     {
//       genersArr=[...genersArr,genre];

//     }
//   }

// return genersArr;
// },[]);



for(let genre of generValues)
{
  const option=createElement("option");
  option.classList.add("option");
    option.setAttribute("value",genre);
    option.innerText=genre;
    movieGenre.appendChild(option);
  
}

function handleGenreSelect(event){
  genreInput=event.target.value;
  genreInput=genreInput.toLocaleLowerCase();
  // console.log(genreInput);
 let filterByGenare=getFilteredData();
   parentElement.innerHTML="";
createMovieCard(genreInput?filterByGenare:fullData);
}
movieGenre.addEventListener("change",handleGenreSelect)
