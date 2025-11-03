const API_KEY = "jHLMSWS5wX18DgvfKS35bqAqL9JJmdcw"; 
const searchInput = document.querySelector("#search-input");
const fetchBtn = document.querySelector("#fetch-gif-btn");
const gifContainer = document.querySelector("#gif-container");

fetchBtn.addEventListener("click", async () => {
  const query = searchInput.value; // get search term
  if (!query) return; // do nothing if input is empty

  // clear previous GIFs
  gifContainer.innerHTML = "";

  // API request
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=10&rating=g`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    // extract image URLs
    const images = data.data.map(gif => gif.images.original.url);

    // display GIFs
    images.forEach(url => {
      gifContainer.innerHTML += `<img src="${url}" class="col-3 mb-3">`;
    });

  } catch (err) {
    console.error("Error fetching GIFs:", err);
  }
});
