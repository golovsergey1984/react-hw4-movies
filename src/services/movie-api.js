import axios from "axios";


const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = '6f92972774f8b8674e1658a64fab0fe1';
// eslint-disable-next-line
export const fetchMoviesTrend = () => axios.get(BASE_URL + 'trending/all/day' + '?api_key=' + API_KEY);
// eslint-disable-next-line
export const fetchMoviesToSearh = (query) => (axios.get(BASE_URL + 'search/movie' + '?api_key=' + API_KEY + '&query=' + query));
// eslint-disable-next-line
export const fetchMoviesDetails = (id) => (axios.get(BASE_URL + 'movie/' + id + '?api_key=' + API_KEY));
// eslint-disable-next-line
export const fetchMoviesCast = (id) => (axios.get(BASE_URL + 'movie/' + id + '/credits' + '?api_key=' + API_KEY));
// eslint-disable-next-line
export const fetchMoviesReviews = (id) => (axios.get(BASE_URL + 'movie/' + id + '/reviews' + '?api_key=' + API_KEY));
