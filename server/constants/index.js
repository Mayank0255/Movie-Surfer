const API_URL = 'https://api.themoviedb.org/3';

const API_KEY = process.env.API_KEY;
const API_KEY_URL = `?api_key=${API_KEY}&language=en-US`

const MOVIE_GENRE_URL = `/genre/movie/list${API_KEY_URL}`;
const TV_GENRE_URL = `/genre/tv/list${API_KEY_URL}`;

module.exports = {
    API_URL,
    API_KEY_URL,
    MOVIE_GENRE_URL,
    TV_GENRE_URL
}