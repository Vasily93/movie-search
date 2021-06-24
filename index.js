const autoCompleteConfig = {
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
    inputValue(movie) {
        return movie.Title;
    }
}

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('.left-autocomplete'),
    onOptionSelect(movie) {
        onMovieSelect(movie, document.querySelector('.left-summary'), 'left')
    },
})

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('.right-autocomplete'),
   onOptionSelect(movie) {
        onMovieSelect(movie, document.querySelector('.right-summary'), 'right')
    },
})

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, element, side) => {
    const response = await fetchData({i: movie.imdbID});
    element.innerHTML = createMovieTemplate(response);

    if(side === 'left') {leftMovie = response;}
    else {rightMovie = response;}

    if(leftMovie && rightMovie) {
        runTheComparison();
    }
}

const runTheComparison = () => {
    console.log('Run the comparison!!!')
}
