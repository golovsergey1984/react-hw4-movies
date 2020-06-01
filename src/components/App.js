import React, { Component, lazy, Suspense } from "react";
import { Route, Switch } from 'react-router-dom';
import Nav from './nav';
/* import HomePage from '../pages/home.js'; */
/* import MoviesPage from '../pages/movies.js';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import NotFoundPage from '../pages/pageNotFound.js'; */
import styles from '../components/app.module.css';
/* import Loader from '../components/Loader'; */

const AsyncHomePage = lazy(() =>
    import('../pages/home' /*webpackChunkName: "home-page" */),
)
const AsyncMovieDetailsPage = lazy(() =>
    import('../pages/MovieDetailsPage' /*webpackChunkName: "MovieDetails-page" */),
)
const AsyncMoviesPage = lazy(() =>
    import('../pages/movies' /*webpackChunkName: "Movies-page" */),
)
const AsyncNotFoundPage = lazy(() =>
    import('../pages/pageNotFound' /*webpackChunkName: "NotFound-page" */),
)


export default class App extends Component {
    state = {

    };



    render() {

        return (
            <div className={styles['site-wrapper']}>
                <Nav />
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Switch>
                        <Route path="/" exact component={AsyncHomePage} />
                        <Route path="/movies/:movieId" component={AsyncMovieDetailsPage} />
                        <Route path="/movies" component={AsyncMoviesPage} />
                        <Route component={AsyncNotFoundPage} />
                    </Switch>
                </Suspense>
            </div>
        );
    }
}