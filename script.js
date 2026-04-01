const mediaData = [
    { id: 1, title: "Interstellar", year: 2014, rating: 8.9, genre: "Sci-Fi", badge: "Must Watch", type: "movie", image: "https://via.placeholder.com/300x450/111/2ecc71?text=Interstellar" },
    { id: 2, title: "The Boys", year: 2019, rating: 8.7, genre: "Action/Comedy", badge: "Trending", type: "tv", image: "https://via.placeholder.com/300x450/111/f1c40f?text=The+Boys" },
    { id: 3, title: "Dune: Part Two", year: 2024, rating: 9.0, genre: "Sci-Fi", badge: "New Release", type: "movie", image: "https://via.placeholder.com/300x450/111/2ecc71?text=Dune+Part+Two" },
    { id: 4, title: "Severance", year: 2022, rating: 8.7, genre: "Thriller", badge: "Must Watch", type: "tv", image: "https://via.placeholder.com/300x450/111/f1c40f?text=Severance" },
    { id: 5, title: "Alien: Romulus", year: 2024, rating: 7.4, genre: "Horror", badge: "New Release", type: "movie", image: "https://via.placeholder.com/300x450/111/2ecc71?text=Alien+Romulus" },
    { id: 6, title: "The Last of Us", year: 2023, rating: 9.2, genre: "Drama", badge: "Trending", type: "tv", image: "https://via.placeholder.com/300x450/111/f1c40f?text=The+Last+of+Us" },
    { id: 7, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi", badge: "Classic", type: "movie", image: "https://via.placeholder.com/300x450/111/2ecc71?text=The+Matrix" },
    { id: 8, title: "Jurassic Park", year: 1993, rating: 8.2, genre: "Adventure", badge: "Classic", type: "movie", image: "https://via.placeholder.com/300x450/111/f1c40f?text=Jurassic+Park" },
    { id: 9, title: "Venom: The Last Dance", year: 2024, rating: 6.5, genre: "Action", badge: null, type: "movie", image: "https://via.placeholder.com/300x450/111/2ecc71?text=Venom" }
];

function getRatingClass(rating) {
    if (rating >= 8.5) {
        return "rating-gold"; 
    } else if (rating >= 7.5) {
        return "rating-green";
    } else {
        return "rating-standard"; 
    }
}

function getBadgeHTML(badge) {
    switch(badge) {
        case 'New Release':
            return `<span class="card-badge" style="background: var(--neon-green); color: black;">${badge}</span>`;
        case 'Trending':
            return `<span class="card-badge" style="background: var(--bright-yellow); color: black;">${badge}</span>`;
        case 'Must Watch':
            return `<span class="card-badge" style="background: #ff4757; color: white;">${badge}</span>`;
        case 'Classic':
            return `<span class="card-badge" style="background: #ffffff; color: black;">${badge}</span>`; // White badge for classics
        default:
            return ''; 
    }
}

function createCardHTML(item) {
    const ratingColorClass = getRatingClass(item.rating);
    const badgeHTML = getBadgeHTML(item.badge);

    return `
        <div class="movie-card">
            <div style="position: relative;">
                ${badgeHTML}
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="card-content">
                <h3>${item.title}</h3>
                <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 5px;">${item.genre} • ${item.year}</p>
                <div class="rating">
                    <span class="${ratingColorClass}">★ ${item.rating}</span> 
                    <span class="fav-icon" title="Add to favourites">❤</span>
                </div>
            </div>
        </div>
    `;
}


function renderCards(dataArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; 

    let finalHTML = '';
    let i = 0; 
    
    while (i < dataArray.length) {
        finalHTML += createCardHTML(dataArray[i]);
        i++;
    }
    
    container.innerHTML = finalHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'movies.html') {
        const moviesOnly = [];
        let i = 0;
        while (i < mediaData.length) {
            if (mediaData[i].type === 'movie') moviesOnly.push(mediaData[i]);
            i++;
        }
        renderCards(moviesOnly, 'dynamic-grid');

    } else if (currentPage === 'tv-shows.html') {
        const tvOnly = [];
        let i = 0;
        while (i < mediaData.length) {
            if (mediaData[i].type === 'tv') tvOnly.push(mediaData[i]);
            i++;
        }
        renderCards(tvOnly, 'dynamic-grid');

    } else if (currentPage === 'home.html' || currentPage === '') {
        const topRated = [];
        let i = 0;
        
        while (i < mediaData.length) {
            if (mediaData[i].rating > 8.0) {
                topRated.push(mediaData[i]);
            }
            i++;
        }
        
        renderCards(topRated, 'dynamic-grid');
    }
});