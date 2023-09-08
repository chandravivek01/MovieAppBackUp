import React from 'react'
import TopRatedMovies from '../../components/TopRatedMovies'
import IMovie from '../../models/IMovie'

type Props = {
  addToFavourites: (sampleMovie : IMovie) => void
}

const TopRatedMoviesPage = ( {addToFavourites } : Props) => {
  return (
    <TopRatedMovies addToFavourites={addToFavourites} />
  )
}

export default TopRatedMoviesPage