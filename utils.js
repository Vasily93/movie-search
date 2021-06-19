
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

//function to create li element for the drop down list from search results
const createLI = (movie) => {
    const li = document.createElement('li');
    li.setAttribute('id', movie.imdbID)
    li.innerHTML = movie.Title;
    li.addEventListener('click', async (e) => {
        const movieDetails = await fetchData({i: e.target.id});
        console.log(movieDetails.data);
    }) 
    return li;
}
