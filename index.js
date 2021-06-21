const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search For a Movie</b></label>
<input id="search"/>
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown-content results"></div>
</div>
</div>
`;

const search = document.querySelector('#search');
const searchList = document.querySelector('.dropdown-content');
const dropdownMenu = document.querySelector('.dropdown');

document.addEventListener('click' , e  => {
    if(!root.contains(e.target)) {
        dropdownMenu.classList.remove('is-active');
    }
})

//API REQUEST
const fetchData = async (paramsObj) => {
    let params = { apikey: 'e881083e' };
    const entries = Object.entries(paramsObj)[0];
    params[entries[0]] = entries[1];

    const response = await axios.get('http://www.omdbapi.com/', {params});
    // console.log('fetchdata',response)
    if(response.data.Error) { 
        console.log('no movies found!')
        return []; }

    return response.data;
}

const onInput = async (event) => {
    searchList.innerHTML = ''
    dropdownMenu.classList.add('is-active');

    const data = await fetchData({s: event.target.value});
    // console.log('onInput',data);
    if(!data.Search) {
        dropdownMenu.classList.remove('is-active');
        return;
    }
    const movies = data.Search;
    for(movie of movies) {
        const a = createAnchorElement(movie);
        searchList.appendChild(a);
    }
}



//DOM
search.addEventListener('input', debounce(onInput, 500))


  