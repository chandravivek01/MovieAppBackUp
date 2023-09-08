import React from 'react'
import IMovie from '../models/IMovie'
import { Card, Button, Alert } from 'react-bootstrap'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

type Props = {
  movie: IMovie,
  localnamespace: string,
  addToFavourites: (sampleMovie: IMovie) => void
}

const MovieListItem = ({ movie, localnamespace, addToFavourites }: Props) => {

  return (

    <>
      <Card>
        <Card.Img variant="top" src={movie.posterurl} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Button variant="primary" onClick={() => (
            addToFavourites(movie)
          )}>
            Add to favourites <FontAwesomeIcon icon={faHeart} />
          </Button>
          <Link to={`/${localnamespace}/${movie.id}`}>More</Link>
        </Card.Body>
      </Card>

    </>


  )
}

export default MovieListItem