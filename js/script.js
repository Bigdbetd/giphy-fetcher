// Your Giphy API key
const API_KEY = "jHLMSWS5wX18DgvfKS35bqAqL9JJmdcw";

// Select HTML elements
const fetchBtn = document.querySelector("#fetch-gif-btn");
const gifContainer = document.querySelector("#gif-container");
const searchInput = document.querySelector("#search-input");

// Function to build the API endpoint
function buildEndpoint(query) {
  return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=9`;
}

// Function to fetch gifs
async function fetchGifs(query) {
  const endpoint = buildEndpoint(query);
  const response = await fetch(endpoint);
  const data = await response.json();

  // Return array of gif URLs
  return data.data.map(gif => gif.images.original.url);
}

// Function to display gifs
function displayGifs(images) {
  gifContainer.innerHTML = ""; // clear previous gifs

  images.forEach(url => {
    gifContainer.innerHTML += `
      <div class="col-4 mb-3">
        <img src="${url}" class="img-fluid" />
      </div>
    `;
  });
}

// Button event listener
fetchBtn.addEventListener("click", async () => {
  let query = searchInput.value.trim();

  // If no search term typed, use default
  if (query === "") {
    query = "funny cats";
  }

  // Fetch gifs
  const images = await fetchGifs(query);

  // Display gifs
  displayGifs(images);
});
