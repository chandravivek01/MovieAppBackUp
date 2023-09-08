import React from 'react'
import MovieDetails from '../../components/MovieDetails'
import { useParams } from 'react-router-dom'

type Props = {
  namespace: string
}

const MovieDetailsPage = ({namespace} : Props) => {

  return (
    <>
      <MovieDetails localnamespace={namespace} />
    </>
    
  )
}

export default MovieDetailsPage