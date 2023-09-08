import React from 'react'
import { Alert } from 'react-bootstrap'

type Props = {
  namespace: string,
  statuses: string
}

const DisplayAlert = ({ namespace, statuses }: Props) => {
  return (
    <>
      <div style={{ position: 'fixed', top: '50px', left: '10px', zIndex: 1000, paddingTop: '10px', paddingBottom: '0px' }}>
            {namespace}
            {
              statuses === 'success' && (
                <Alert key='success' variant='success'>
                  The movie has been successfully added to the favourites.
                </Alert>
              )
            }
            {
              statuses === 'error' && (
                <Alert key='danger' variant='danger'>
                  This movie is already in the favourite list.
                </Alert>
              )
            }
      </div>
    </>
  )
}

export default DisplayAlert