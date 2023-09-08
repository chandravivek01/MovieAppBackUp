import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getMoviesInTheatres } from '../services/movies';
import IMovie from '../models/IMovie';
import MovieListItem from './MovieListItem';

type Props = {
    addToFavourites: (sampleMovie : IMovie) => void,
    movies: IMovie[]
  }

const namespace : string = "moviesInTheatres";
const MoviesInTheatres = ( { addToFavourites, movies } : Props ) => {

    // useEffect(
    //     () => {
    //         const fetchMovies = async () => {
    //             const data = await getMoviesInTheatres();
    //             setMovies(data);
    //         }
    //         fetchMovies();
    //     },
    //     []
    // ); 
    return (

        <>
            <Row xs={1} md={2} lg={4} xl={5}>
                {
                    movies.map(movie => (
                        <Col className='d-flex my-3'>
                            <MovieListItem key={movie.id} movie={movie} localnamespace={namespace} addToFavourites={addToFavourites} />
                        </Col>
                    ))
                }
            </Row>
        </>
        
    )
}

export default MoviesInTheatres