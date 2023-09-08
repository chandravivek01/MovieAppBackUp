import React from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import IMovie from '../models/IMovie'
import { deleteMovieByIdFromFavourites } from '../services/movies'

type Props = {
    movie: IMovie
    deleteMovie: (id : string | number) => void
}

const FavouriteListItem = ({ movie, deleteMovie }: Props) => {

    return (

        <>
            <Card>
            <Card.Img variant="top" src={movie.posterurl} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button variant="primary" onClick={() => {
                    // deleteMovieByIdFromFavourites(movie.id);
                    deleteMovie(movie.id);
                }}>
                    Remove from favourites
                </Button>
            </Card.Body>
        </Card>
        </>    
    )
}

export default FavouriteListItem