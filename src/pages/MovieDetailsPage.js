import React, { Component, Fragment } from "react";
import { Link, Route } from 'react-router-dom';
import styles from '../components/app.module.css';
import Loader from '../components/Loader';
import * as MoviesAPI from "../services/movie-api.js";
import ErrorNotification from '../components/errorNotification';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';


const getIdFromProps = props => props.match.params.movieId;
const imgUrl = 'https://image.tmdb.org/t/p/w500/';
var currentParentPageToReturn=null;

export default class MovieDetailsPage extends Component {
    state = {
        film: null,
        error: null,
        isLoading: false,
    };


    componentDidMount() {
        if(this.props.location.state){
            currentParentPageToReturn= this.props.location.state.goOnBack;}
        else{currentParentPageToReturn=null}
        this.setState({ isLoading: true });
        const id = getIdFromProps(this.props);
        MoviesAPI
            .fetchMoviesDetails(id)
            .then(({ data }) => (this.setState({ film: data })))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ isLoading: false }))
            
    }
    
handleGoBack=()=>{
      if((currentParentPageToReturn===undefined)||(currentParentPageToReturn===null)){currentParentPageToReturn="/"}
    this.props.history.push(currentParentPageToReturn)
 
    
}
    render() {
        const { film, isLoading, error } = this.state
        
        return (
            
            <Fragment>
               <button type="button" className={styles['Goback-btn']} onClick={this.handleGoBack} >Go back</button>
                {isLoading && <Loader />}
                {film &&
                    <Fragment>
                        
                        <div className={styles['movie-detail-wrapper']}>
                            <div className={styles['movie-detail-img-box']}>
                                <img src={imgUrl + film.poster_path} className={styles['movie-detail-img']} alt={film.title}></img>
                            </div>
              
                            <div className={styles['movie-detail-desc-box']}>
                                <h1>{film.title} ({film.release_date})</h1>
                                <p>Vote average: {film.vote_average} /10 </p>
                                <p>Overview:</p>
                                <span className={styles['movie-detail-overview-txt']}>{film.overview}</span>
                                <p className={styles['movie-detail-desc-title']}>Genres:</p>
                                <ul className={styles['movie-detail-desc-ul']}>
                                {film.genres.map(item => (
                                    <li key={item.id} className={styles['movie-detail-genres-li']}>{item.name}</li>
                                ))}
                                </ul>
                            </div>

                        </div>

                        <div className={styles['movie-detail-add']}>
                            <p className={styles['movie-detail-desc-title']}>Additional Information</p>
                            <ul className={styles['movie-detail-desc-ul']}>
                                <li className={styles['movie-detail-add-li']}>
                                    <Link to={`/movies/${film.id}/cast`} className={styles['movie-detail-add-li-link']}>Cast</Link>
                                </li>
                                <li className={styles['movie-detail-add-li']}>
                                    <Link to={`/movies/${film.id}/reviews`} className={styles['movie-detail-add-li-link']}>Reviews</Link>
                                </li>
                            </ul>
                        </div>
                         
                    </Fragment >
                }



            {<Route path="/movies/:movieId/cast" component={Cast} />}
            <Route path="/movies/:movieId/reviews" component={Reviews} />
            {error && <ErrorNotification text={error.message} />}
            
            </Fragment >
        );
    }
}

