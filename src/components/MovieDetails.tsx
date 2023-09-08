import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import IMovie from '../models/IMovie';
import { useParams } from 'react-router-dom';
import { getMoviesComingSoonById, getMoviesInTheatresById, getMoviesTopRatedIndianById, getMoviesTopRatedMoviesById } from '../services/movies';
import { Card, Col, Row } from 'react-bootstrap';

type Props = {
  localnamespace: string
}

type Params = {
  id: string
}

const MovieDetails = ({ localnamespace }: Props) => {

  const { id } = useParams<Params>();
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(
    () => {
      const fetchMovie = async () => {

        switch (localnamespace) {
          case 'comingSoon':
            const comingSoonMovie = await getMoviesComingSoonById(id as any);
            setMovie(comingSoonMovie);
            break;
          case 'topRatedIndian':
            const topRatedIndianMovie = await getMoviesTopRatedIndianById(id as any);
            setMovie(topRatedIndianMovie);
            break;
          case 'topRatedMovies':
            const topRatedMovie = await getMoviesTopRatedMoviesById(id as any);
            setMovie(topRatedMovie);
            break;
          case 'moviesInTheatres':
            const theatreMovie = await getMoviesInTheatresById(id as any);
            setMovie(theatreMovie);
            break;
        }
      }
      fetchMovie();
    },
    []
  );
  return (
    <>
      <Row>
        <Col lg={4}>
          <img src={movie?.posterurl} alt="not available" />
        </Col>
        <Col lg={8}>
          <Row>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{movie?.title}({movie?.year})</div>
          </Row>
          <Row>
            <Col>Imdb Rating</Col>
            <Col>{movie?.imdbRating}</Col>
          </Row>
          <Row>
            <Col>Content Rating</Col>
            <Col>{movie?.contentRating}</Col>
          </Row>
          <Row>
            <Col>Average Rating</Col>
            <Col>{movie?.averageRating}</Col>
          </Row>
          <Row>
            <Col>Duration</Col>
            <Col>{movie?.duration}</Col>
          </Row>
          <Row>
            <Col>Genres</Col>
            <Col>{movie?.genres}</Col>
          </Row>
          <Row>
            <Col>Actors</Col>
            <Col>{movie?.actors}</Col>
          </Row>
          <Row>
            <Col>Release Date</Col>
            <Col>{movie?.releaseDate}</Col>
          </Row>
          <Row>
            <Col>Storyline</Col>
            <Col>{movie?.storyline}</Col>
          </Row>
        </Col>
      </Row>
      <div>{localnamespace}</div>

    </>


  )
}

export default MovieDetails
