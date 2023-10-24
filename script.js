//Key
//key = "3ba23513";

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const result = document.getElementById("result");

const getMovie = () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://www.omdbapi.com/?apikey=3ba23513&t=${searchTerm}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        //Movie exists
        if (data.Response === "True") {
          result.innerHTML = `
            <div class="movie">
                <img src="${data.Poster}" alt="${data.Title}">
                <div class="movie-info">
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <span>${data.imdbRating}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                    <h3>Plot:</h3>
                      <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                      <p>${data.Actors}</p>
                </div>
            </div> 
          `;
        }
        //Movie doesn't exist
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      }
      //Error
      else {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      }
    };
    xhr.send();
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);