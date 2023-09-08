import React from 'react'
import TopRatedIndian from '../../components/TopRatedIndian'
import IMovie from '../../models/IMovie'

type Props = {
  addToFavourites: (sampleMovie : IMovie) => void
}

const TopRatedIndianPage = ( {addToFavourites } :  Props ) => {
  return (
    <TopRatedIndian addToFavourites={addToFavourites} />
  )
}

export default TopRatedIndianPage