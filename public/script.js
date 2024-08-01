const searchBar = document.getElementById('search-bar');

// Optional: Add additional behavior on focus and blur
searchBar.addEventListener('focus', () => {
    searchBar.classList.add('focused');
});

searchBar.addEventListener('blur', () => {
    searchBar.classList.remove('focused');
});
