const search = document.querySelector('#search');
const searchList = document.querySelector('#search-list');

const onInput = event => {
    searchMovies(event.target.value);
}

search.addEventListener('input', debounce(onInput, 500))


//API REQUEST
const fetchData = (paramsObj) => {
    let params = { apikey: 'e881083e' };

    const entries = Object.entries(paramsObj)[0];
    params[entries[0]] = entries[1];

    return axios.get('http://www.omdbapi.com/', {params});
}


const searchMovies = async (searchInput) => {
        const response = await fetchData({s: searchInput});
        const movies = response.data.Search;
        console.log(movies);
        for(movie of movies) {
            const li = createLI(movie);
            searchList.appendChild(li);
        }

}

  