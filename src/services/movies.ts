import axios from "axios"
import IMovie from "../models/IMovie";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getMoviesBySearch = (namespace: string) => {


}

const getMoviesInTheatres = async () => {

    const response = await axios.get(`${baseUrl}/movies-in-theaters`);
    return response.data as IMovie[];
}

const getMoviesInTheatresById = async (id: number | string) => {

    const response = await axios.get(`${baseUrl}/movies-in-theaters/${id}`);
    return response.data as IMovie;
}

const getMoviesComingSoon = async () => {

    const response = await axios.get(`${baseUrl}/movies-coming`);
    return response.data as IMovie[];
}

const getMoviesComingSoonById = async (id: number | string) => {

    const response = await axios.get(`${baseUrl}/movies-coming/${id}`);
    return response.data as IMovie;
}

const getMoviesTopRatedIndian = async () => {

    const response = await axios.get(`${baseUrl}/top-rated-india`);
    return response.data as IMovie[];
}

const getMoviesTopRatedIndianById = async (id: number | string) => {

    const response = await axios.get(`${baseUrl}/top-rated-india/${id}`);
    return response.data as IMovie;
}

const getMoviesTopRatedMovies = async () => {

    const response = await axios.get(`${baseUrl}/top-rated-movies`);
    return response.data as IMovie[];
}

const getMoviesTopRatedMoviesById = async (id: number | string) => {

    const response = await axios.get(`${baseUrl}/top-rated-movies/${id}`);
    return response.data as IMovie;
}

const getMoviesFavourites = async () => {

    const response = await axios.get(`${baseUrl}/favourite`);
    return response.data as IMovie[];
}

const postMoviesToFavourites = async (movie : IMovie) => {

    await axios.post(`${baseUrl}/favourite`, movie, {
        headers : {
            'Content-Type': 'application/json'
        }
    });
}

const deleteMovieByIdFromFavourites = async (id : number | string) => {
    console.log('in the delete method')
    await axios.delete(`${baseUrl}/favourite/${id}`);
}

const getMoviesFromFavourites = async () => {

    const response = await axios.get(`${baseUrl}/favourite`);
    return response.data as IMovie[];
}

export {
    getMoviesInTheatres,
    getMoviesComingSoon,
    getMoviesTopRatedIndian,
    getMoviesTopRatedMovies,
    getMoviesInTheatresById,
    getMoviesComingSoonById,
    getMoviesTopRatedIndianById,
    getMoviesTopRatedMoviesById,
    getMoviesFavourites,
    postMoviesToFavourites,
    deleteMovieByIdFromFavourites,
    getMoviesFromFavourites,
    getMoviesBySearch
}