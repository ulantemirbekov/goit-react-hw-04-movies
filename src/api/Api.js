// const baseUrl = "https://api.themoviedb.org/3";
const API_KEY = "4272cb42db17ce34813c9e555c9d91dd";

export const fetchTrending = () => {
    const baseURL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

    return fetch(baseURL)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            return data.results;
        });
};

export const fetchMovies = (search) => {
    const baseURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&include_adult=false`;

    return fetch(baseURL)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            return data.results;
        });
};

export const fetchMovieDetails = (id) => {
    const baseURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

    return fetch(baseURL)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            return data;
        });
};

export const fetchMovieCast = (id) => {
    const baseURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

    return fetch(baseURL)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            return data;
        });
};

export const fetchMovieReviews = (id) => {
    const baseURL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

    return fetch(baseURL)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            return data;
        });
};