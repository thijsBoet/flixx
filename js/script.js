const global = { currentPage: window.location.pathname };

async function displayPopularMovies() {
	const { results } = await fetchAPIData('movie/popular');

	results.forEach(movie => {
		const { title, poster_path, release_date, id } = movie;

		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
            <a href="movie-details.html?id=${id}">
                ${
									poster_path
										? `<img
                        src="https://image.tmdb.org/t/p/w500${poster_path}"
                        class="card-img-top"
                        alt="${title}"
                    />`
										: `<img
                        src="../images/no-image.jpg"
                        class="card-img-top"
                        alt=${title}
                    />`
								}
            </a>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${release_date}</small>
                </p>
            </div>`;
		document.querySelector('#popular-movies').appendChild(div);
	});
}

async function displayPopularShows() {
	const { results } = await fetchAPIData('tv/popular');

	results.forEach(show => {
		const { name, poster_path, first_air_date, id } = show;

		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
            <a href="tv-details.html?id=${id}">
                ${
									poster_path
										? `<img
                        src="https://image.tmdb.org/t/p/w500${poster_path}"
                        class="card-img-top"
                        alt="${name}"
                    />`
										: `<img
                        src="../images/no-image.jpg"
                        class="card-img-top"
                        alt=${name}
                    />`
								}
            </a>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${first_air_date}</small>
                </p>
            </div>`;
		document.querySelector('#popular-shows').appendChild(div);
	});
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

async function displayMovieDetails() {
	const movieId = window.location.search.split('=')[1];

	const movie = await fetchAPIData(`movie/${movieId}`);
	console.log(movie);
	const {
		title,
		poster_path,
		vote_average,
		genres,
		overview,
		budget,
		revenue,
		runtime,
		status,
		backdrop_path,
		homepage,
		production_companies,
		release_date,
	} = movie;

	const div = document.createElement('div');
	div.classList.add('card');
	div.innerHTML = `
        <div class="details-top">
            <div>
                <img
                    src="https://image.tmdb.org/t/p/w500${poster_path}"
                    class="card-img-top"
                    alt="${title}"
                />
            </div>
            <div>
                <h2>${title}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${vote_average.toFixed(1)} / 10
                </p>
                <p class="text-muted">Release Date: ${release_date}</p>
                <p>
                    ${overview}
                </p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${genres.map(genre => `<li>${genre.name}</li>`).join('')}
                </ul>
                <a href="${homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
							budget
						)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
							revenue
						)}</li>
            <li><span class="text-secondary">Runtime:</span> ${runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${production_companies
							.map(production_company => production_company.name)
							.join(', ')}</div>
        </div>
    `;

	document.querySelector('#movie-details').appendChild(div);
}

async function displayMovieDetails() {
	const movieId = window.location.search.split('=')[1];

	const movie = await fetchAPIData(`movie/${movieId}`);

	const {
		title,
		poster_path,
		vote_average,
		genres,
		overview,
		budget,
		revenue,
		runtime,
		status,
		backdrop_path,
		homepage,
		production_companies,
		release_date,
	} = movie;

	displayBackgroundImage('movie', backdrop_path);

	const div = document.createElement('div');

	div.innerHTML = `
        <div class="details-top">
            <div>
                ${
									poster_path
										? `<img src="https://image.tmdb.org/t/p/w500${poster_path}" class="card-img-top"
                    alt="${title}" />`
										: `<img src="../images/no-image.jpg" class="card-img-top" alt="${title}" />`
								}
            </div>
            <div>
                <h2>${title}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${vote_average.toFixed(1)} / 10
                </p>
                <p class="text-muted">Release Date: ${release_date}</p>
                <p>
                    ${overview}
                </p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${genres.map(genre => `<li>${genre.name}</li>`).join('')}
                </ul>
                <a href="${homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
                <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
									budget
								)}</li>
                <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
									revenue
								)}</li>
                <li><span class="text-secondary">Runtime:</span> ${runtime} minutes</li>
                <li><span class="text-secondary">Status:</span> ${status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                ${production_companies
									.map(company => `<span>${company.name}</span>`)
									.join(', ')}
            </div>
        </div>
    `;

	document.querySelector('#movie-details').appendChild(div);
}

function displayBackgroundImage(type, backgroundPath) {
	const overlayDiv = document.createElement('div');

	overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
	overlayDiv.style.backgroundSize = 'cover';
	overlayDiv.style.backgroundPosition = 'center';
	overlayDiv.style.backgroundRepeat = 'no-repeat';
	overlayDiv.style.height = '100vh';
	overlayDiv.style.width = '100vw';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.15';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

async function fetchAPIData(endpoint) {
	const API_KEY = '90c1383062fa64fd5ec456b8b748b423';
	const API_URL = 'https://api.themoviedb.org/3';

	showSpinner();

	const response = await fetch(
		`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
	);
	const data = await response.json();

	hideSpinner();

	return data;
}

function highlightActiveLink() {
	const links = document.querySelectorAll('.nav-link');

	links.forEach(link => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
}

function addCommasToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies();
			break;
		case '/shows.html':
			displayPopularShows();
			break;
		case '/tv-details.html':
			displayMovieDetails();
			break;
		case '/movie-details.html':
			displayMovieDetails();
			break;
		case '/search.html':
			console.log('search');
	}

	highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
