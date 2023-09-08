import React, { useState } from 'react'
import IMovie from '../models/IMovie'
import { Row, Col } from 'react-bootstrap'
import FavouriteListItem from './FavouriteListItem'
import { deleteMovieByIdFromFavourites, getMoviesFromFavourites } from '../services/movies'

type Props = {
    favouriteList: IMovie[],
}

const FavouriteMovies = ({ favouriteList }: Props) => {

    const getMovies = async () => {
        const data = await getMoviesFromFavourites();
        setFavouriteMovies(data);
        console.log(data)
        console.log('setter called')
        window.location.reload();
    }

    const deleteMovie = async (id: string | number) => {
        await deleteMovieByIdFromFavourites(id);
        getMovies();
    }

    const [favouriteMovies, setFavouriteMovies] = useState(favouriteList);

    return (
        <>
            <Row xs={1} md={2} lg={4} xl={5}>
                {
                    favouriteList.map( (movie) => (
                        <Col className='d-flex my-3'>
                            <FavouriteListItem movie={movie} deleteMovie={deleteMovie} />
                        </Col>
                        
                    ))
                    
                }
            </Row>
        </>
    )
}

export default FavouriteMovies