
createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie) {
      const option = document.createElement('a');
      option.setAttribute('id', movie.imdbID);
      const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

      option.classList.add('dropdown-item');
      option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title} , ${movie.Year}
    `;
    return option;
    },
    async onOptionSelect(movie) {
        const response = await fetchData({i: movie.imdbID});
        document.querySelector('.summary').innerHTML = createMovieTemplate(response);
    },
    inputValue(movie) {
        return movie.Title;
    },

})

//API REQUEST
const fetchData = async (paramsObj) => {
    let params = { apikey: 'e881083e' };
    const entries = Object.entries(paramsObj)[0];
    params[entries[0]] = entries[1];

    const response = await axios.get('http://www.omdbapi.com/', {params});
    if(response.data.Error) { 
        console.log('no movies found!')
        return []; }

    return response.data;
}