import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import MovieListItem from './MovieListItem'
import { getMoviesTopRatedMovies } from '../services/movies';
import IMovie from '../models/IMovie';

type Props = {
  addToFavourites: (sampleMovie : IMovie) => void
}

const namespace : string = "topRatedMovies";
const TopRatedMovies = ( {addToFavourites } : Props ) => {

  const [movies, setMovies] = useState<IMovie[]>([]);
  useEffect(
    () => {
      const fetchMovies = async () => {
        const data = await getMoviesTopRatedMovies();
        setMovies(data);
      }
      fetchMovies();
    },
    []
  );
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

export default TopRatedMovies