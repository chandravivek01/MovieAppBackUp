import React, { useEffect, useState } from 'react'
import IMovie from '../models/IMovie';
import { getMoviesTopRatedIndian } from '../services/movies';
import { Row, Col } from 'react-bootstrap';
import MovieListItem from './MovieListItem';

type Props = {
  addToFavourites: (sampleMovie : IMovie) => void
}

const namespace : string = "topRatedIndian";
const TopRatedIndian = ( {addToFavourites } : Props ) => {

  const [movies, setMovies] = useState<IMovie[]>([]);
  useEffect(
    () => {
      const fetchMovies = async () => {
        const data = await getMoviesTopRatedIndian();
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
              <MovieListItem key={movie.id} movie={movie} localnamespace="topRatedIndian" addToFavourites={addToFavourites} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default TopRatedIndian