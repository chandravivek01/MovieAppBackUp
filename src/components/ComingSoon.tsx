import React from 'react';
import { useState, useEffect } from 'react';
import IMovie from '../models/IMovie';
import { getMoviesComingSoon } from '../services/movies';
import { Row, Col } from 'react-bootstrap';
import MovieListItem from './MovieListItem';

type Props = {
  addToFavourites: (sampleMovie : IMovie) => void, 
  movies: IMovie[]
}

// const namespace : string = "comingSoon";
const ComingSoon = ( { addToFavourites, movies } : Props) => {
  
  // useEffect(
  //   () => {
  //     const fetchMovies = async () => {
  //       const data = await getMoviesComingSoon();
  //       setMovies(data);
  //     }
  //     fetchMovies();
  //   },
  //   []
  // );
  

  return (
    <>
      <Row xs={1} md={2} lg={4} xl={5}>
        {
          movies.map(movie => (
            <Col className='d-flex my-3'>
              <MovieListItem key={movie.id} movie={movie} localnamespace="comingSoon" addToFavourites={addToFavourites} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default ComingSoon

