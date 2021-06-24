
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
const createMovieTemplate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice
        .replace(/\$/g, '')
        .replace(/,/g, '')
    );
    const metascore = parseInt(movieDetail.Metascore);
    const imdbrating = parseFloat(movieDetail.imdbRating);
    const imdbvotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        let val = parseInt(word);
        if(isNaN(val)) {
            return prev;
        } else {
            return prev + val;
        }
    }, 0);
    const totalSum = dollars + metascore + imdbrating + imdbvotes + awards;
    console.log(totalSum)
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
                    <h3>${movieDetail.Genre}</h3>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article data-value="${awards}" class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value="${dollars}" class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value="${metascore}" class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value="${imdbrating}" class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">imdb Rating</p>
        </article>
        <article data-value="${imdbvotes}" class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">imdb Votes</p>
        </article>
    </div>
    `
}

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