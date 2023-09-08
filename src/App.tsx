import React, { useState } from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Col, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import MoviesInTheatrePage from './pages/MoviesInTheatre/MoviesInTheatrePage';
import ComingSoonPage from './pages/ComingSoon/ComingSoonPage';
import TopRatedIndianPage from './pages/TopRatedIndian/TopRatedIndianPage';
import TopRatedMoviesPage from './pages/TopRatedMovies/TopRatedMoviesPage';
import Menu from './components/Menu/Menu';
import MovieDetailsPage from './pages/MovieDetails/MovieDetailsPage';
import FavouriteMovies from './components/FavouriteMovies';
import IMovie from './models/IMovie';
import { getMoviesComingSoon, getMoviesFavourites, getMoviesFromFavourites, getMoviesInTheatres, getMoviesTopRatedIndian, getMoviesTopRatedMovies, postMoviesToFavourites } from './services/movies';
import { useEffect } from 'react';
import DisplayAlert from './components/DisplayAlert';
import MovieListItem from './components/MovieListItem';

function App() {

  const navigate = useNavigate();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [origialMovies, setOriginalMovies] = useState<IMovie[]>([]);
  const [statuses, setStatuses] = useState('');
  const [namespace, setNamespace] = useState<string>('/');
  const [searchList, setSearchList] = useState<IMovie[]>([]);
  const [favouriteMovies, setFavouriteMovies] = useState<IMovie[]>([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(
    () => {
      const fetchMovies = async () => {

        const data = await getMoviesInTheatres();
        setOriginalMovies(data);
        setMovies(data);
        setSearchList(data);
        const dataset = await getMoviesFavourites();
        setFavouriteMovies(dataset);
      }
      fetchMovies();
    },
    []
  );

  useEffect(
    () => {

      if (namespace === '/') {
        navigate('/');
      }
      else if (namespace === '/comingSoon') {
        navigate('/comingSoon');
      }
      else if (namespace === '/topRatedIndian') {
        navigate('/topRatedIndian');
      }
      else if (namespace === '/topRatedMovies') {
        navigate('/topRatedMovies');
      }
    },
    [movies]
  );

  // useEffect(
  //   () => {
  //     const fetchMovies = async () => {
  //       const dataset = await getMoviesFavourites();
  //       setFavouriteMovies(dataset);
  //     }
  //     fetchMovies();
  //   },
  //   []
  // );

  useEffect(
    () => {
      const searchAgain = (searchedValue: string) => {

        // if (namespace === '/comingSoon') {
        let filteredMovie = searchList.filter(item => item.title.toLowerCase().includes(searchedValue.toLowerCase()));
        setMovies(filteredMovie);
        // }
      }
      searchAgain(searchKey);
    },
    [searchKey, searchList]
  );

  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setStatuses('');
    }, 2000);

    return () => {
      clearTimeout(alertTimer);
    };
  });

  // useEffect(
  //   () => {

  //     const matchMoviesFilter = (searchedValue: string) => {

  //       let filteredMovie = searchList.filter(item => item.title.toLowerCase().includes(searchedValue));
  //       setMovies(filteredMovie);
  //     }
  //     matchMoviesFilter(searchKey);
  //   },
  //   [searchList]
  // );

  const handleNavClick = (chosenNamespace: string) => {
    console.log('handleNavClick')
    setNamespace(chosenNamespace);

    const fetchMovies = async () => {

      if (chosenNamespace === '/') {

        const data = await getMoviesInTheatres();
        setOriginalMovies(data);
        setMovies(data);
      }
      else if (chosenNamespace === '/comingSoon') {

        const data = await getMoviesComingSoon();
        setOriginalMovies(data);
        setMovies(data);
      }
      else if (chosenNamespace === '/favouriteMovies') {

        const data = await getMoviesFromFavourites();
        console.log(data)
        setFavouriteMovies(data);
      }

      else if (chosenNamespace === '/topRatedIndian') {

        const data = await getMoviesTopRatedIndian();
        setOriginalMovies(data);
        setMovies(data);
      }
      else if (chosenNamespace === '/topRatedMovies') {

        const data = await getMoviesTopRatedMovies();
        setOriginalMovies(data);
        setMovies(data);
      }
    }
    fetchMovies();
  };

  // const searchUtil = (searchedValue: any) => {

  //   const fetchMovies = async () => {

  //     if (namespace === '/') {
  //       setSearchList(origialMovies);
  //     }

  //     else if (namespace === '/comingSoon') {
  //       console.log(origialMovies)
  //       setSearchList(origialMovies);
  //       console.log('comingSoon')
  //     }

  //     else if (namespace === '/favouriteMovies ') {

  //       const data = await getMoviesFromFavourites();
  //       setSearchList(data);
  //     }

  //     else if (namespace === '/topRatedIndian') {

  //       setSearchList(origialMovies);
  //     }

  //     else if (namespace === '/topRatedMovies') {

  //       setSearchList(origialMovies);
  //     }
  //   }
  //   fetchMovies();
  // }

  const pushToServer = async (sampleMovie: IMovie) => {
    await postMoviesToFavourites(sampleMovie);
  }

  const addToFavourites = (sampleMovie: IMovie) => {

    const matchingMovie = favouriteMovies.find(movie => (movie.id === sampleMovie.id));

    { matchingMovie ? setStatuses('error') : setStatuses('success') }

    if (matchingMovie) {

      console.log('movies already exists');
      const updatedMovies = [...favouriteMovies];

      setFavouriteMovies(updatedMovies);
    }
    else {

      console.log('adding the movie to the favourite-list');
      const updatedMovies: IMovie[] = [...favouriteMovies, sampleMovie];
      pushToServer(sampleMovie);
      setFavouriteMovies(updatedMovies);
    }
  }

  return (
    <div className="App">

      <Menu
        // searchUtil={searchUtil} 
        handleNavClick={handleNavClick}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
      />
      <DisplayAlert namespace={namespace} statuses={statuses} />

      <Container>
        <Routes>
          <Route path='/' element={<MoviesInTheatrePage addToFavourites={addToFavourites} movies={movies} />} />
          <Route path='/comingSoon' element={<ComingSoonPage addToFavourites={addToFavourites} movies={movies} />} />
          <Route path='/favouriteMovies' element={<FavouriteMovies favouriteList={favouriteMovies} />} />
        </Routes>
      </Container>
      {/* <Container>
        <Row xs={1} md={2} lg={4} xl={5}>
          {
            movies.map(movie => (
              <Col className='d-flex my-3'>
                <MovieListItem key={movie.id} movie={movie} localnamespace="comingSoon" addToFavourites={addToFavourites} />
              </Col>
            ))
          }
        </Row>
      </Container> */}

      {/* <Container>
        <Routes>
          <Route path='/' element={<MoviesInTheatrePage addToFavourites={addToFavourites} />} />
          <Route path='/home' element={<Navigate to='/' />} />
          <Route
            path='/comingSoon'
            element={<ComingSoonPage addToFavourites={addToFavourites} />} />
          <Route path='/topRatedIndian' element={<TopRatedIndianPage addToFavourites={addToFavourites} />} />
          <Route path='/topRatedMovies' element={<TopRatedMoviesPage addToFavourites={addToFavourites} />} />
          <Route path='/moviesInTheatres/:id' element={<MovieDetailsPage namespace="moviesInTheatres" />} />
          <Route path='/comingSoon/:id' element={<MovieDetailsPage namespace="comingSoon" />} />
          <Route path='/topRatedIndian/:id' element={<MovieDetailsPage namespace="topRatedIndian" />} />
          <Route path='/topRatedMovies/:id' element={<MovieDetailsPage namespace="topRatedMovies" />} />
          <Route path='/favouriteMovies' element={<FavouriteMovies favouriteList={movies} />} />
        </Routes>
      </Container> */}

    </div>
  );
}

export default App;
