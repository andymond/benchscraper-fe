let links = document.querySelectorAll('a')
let sections = document.querySelectorAll('section')
let searchBar = document.querySelector('.main-search-bar')
let searchButton = document.querySelector('.main-search-button')
links[0].focus();

links.forEach((link, i) => {
  link.addEventListener('click', () => {
    sections.forEach((section) => {
      section.classList.add('hidden')
    })
    link.focus();
    sections[i].classList.remove('hidden');
  });
});

function removeResults() {
  let oldResults = document.querySelectorAll('.api-result')
  oldResults.forEach((result) => {
    result.remove()
  })
}

function noResults() {
  let searchResults = document.getElementById('populated-results')
  searchResults.innerHTML = "<div class='api-result text-block'> No Results Found! </div>"
}

function addResult(result) {
  let newResult = document.createElement('div');
  newResult.className = 'api-result'
  newResult.className += ' text-block'
  newResult.innerHTML += "<div class='priceandseller'><span>" + result.seller + "</span>" + "<span>" + result.price + "</span></div>"
  newResult.innerHTML += "<div class='product-name'>" + result.name + "</div>"
  let searchResults = document.getElementById('search-results')
  let popResults = document.getElementById('populated-results')
  searchResults.insertBefore(newResult, popResults.nextSibling)
};

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const baseURL = () => {
    const host = window.location.hostname
    if (host === "") {
      return 'http://localhost:3000'
    } else {
      return 'https://stormy-shelf-17792.herokuapp.com'
    }}

  fetch(baseURL() + '/api/v1/items?name=' + searchBar.value)
    .then((response) => {
      removeResults()
      return response.json()
    })
    .then((json) => {
      if (json.length === 0) {
        noResults()
      } else {
        json.forEach((result) => {
          addResult(result)
        })
      }
    })
    .catch((e) => {
      console.log(e)
    })
})
