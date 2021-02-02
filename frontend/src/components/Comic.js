import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

const Comic = ({ comic }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Card className='my-3 p-3 rounded text-center'>
      <Link to={`/comics/${comic._id}`}>
        <Card.Img src={comic.image}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/comics/${comic._id}`}>
          <Card.Title as='div'>
            <strong>{comic.title}</strong>
          </Card.Title>
          <Card.Title as='div'>
            <strong>{comic.subtitle ? <h5>{comic.subtitle}</h5> : ''}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>
          <strong># {comic.issue}</strong>
        </Card.Text>
        <Card.Text as='h5'>{comic.year}</Card.Text>
        <Card.Text as='h5'>{comic.publisher}</Card.Text>
      </Card.Body>
      {userInfo && userInfo.isAdmin && (
        <>
          <Button variant='outline-success' className='my-2 btn'>
            Edit
          </Button>

          <Button variant='outline-danger' className='btn '>
            x
          </Button>
        </>
      )}
    </Card>
  )
}

export default Comic
