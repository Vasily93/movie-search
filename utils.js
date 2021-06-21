
// wraper function for delayed search
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {  
            func.apply(null, args);
        }, delay)
    };
}

//function to create anchor element for the drop down list from search results
const createAnchorElement = (movie) => {
    const a = document.createElement('a');
    a.setAttribute('class', 'dropdown-item');
    a.setAttribute('id', movie.imdbID);
    a.innerHTML = movie.Title;
    a.addEventListener('click', async (e) => {
        search.value = movie.Title;
        dropdownMenu.classList.remove('is-active');
        const movieDetails = await fetchData({i: e.target.id});
        console.log('----->',movieDetails);
        document.querySelector('.summary').innerHTML = createMovieTemplate(movieDetails);
    }) 
    return a;
}

const createMovieTemplate = (movieDetail) => {
    return `
    <div>
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h3>${movieDetail.Awards}</h3>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
    </div>
    `
}
