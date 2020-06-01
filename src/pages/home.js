import React, { Component } from "react";
import * as MoviesAPI from "../services/movie-api.js";
import ErrorNotification from '../components/errorNotification';
import Loader from '../components/Loader';
import MoviesGallery from '../components/moviesGallery';
import styles from '../components/app.module.css';


export default class HomePage extends Component {
    state = {
        movies: [],
        error: null,
        isLoading: false,
    };

    componentDidMount() {
        this.setState({ isLoading: true });

        MoviesAPI
            .fetchMoviesTrend()
            .then(({ data }) => (this.setState({ movies: data.results })))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ isLoading: false }))

    }

    render() {
        const { isLoading, error, movies } = this.state;
        const currentPath = this.props.location.pathname;
        return (

            < div >
                <h1>Trending today</h1>
                {error && <ErrorNotification text={error.message} />}
                {isLoading && <Loader />}
                {movies.length > 0 && <ul className={styles['List-items-ul']}> <MoviesGallery items={movies} parentPage={currentPath} /></ul>}
            </div >
        );
    }
}

