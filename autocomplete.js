const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue
}) => {
    root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input id="search"/>
    <div class="dropdown">
    <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
    </div>
    </div>
    `;

    const search = root.querySelector('#search');
    const searchList = root.querySelector('.dropdown-content');
    const dropdownMenu = root.querySelector('.dropdown');

    document.addEventListener('click' , e  => { //hides dropdown menu if a click occures anywhere outside of it
        if(!root.contains(e.target)) {
            dropdownMenu.classList.remove('is-active');
        }
    })

    const onInput = async (event) => {
        searchList.innerHTML = ''
        dropdownMenu.classList.add('is-active');
    
        const data = await fetchData({s: event.target.value});
        if(!data.Search) { //if no movies found -> hide dropdown
            dropdownMenu.classList.remove('is-active');
            return;
        }
        const movies = data.Search;
        for(let movie of movies) { //render movies dropdown and attach eventListener
            let option = renderOption(movie);
            option.addEventListener('click', () => {
                search.value = inputValue(movie);
                dropdownMenu.classList.remove('is-active');
                onOptionSelect(movie)
            })
            searchList.appendChild(option);
        }
    }
    
    search.addEventListener('input', debounce(onInput, 500));
};
