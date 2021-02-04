import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Comic = ({ comic }) => {
  return (
    <Card className='my-3 p-3 rounded text-center char-shadow'>
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
          <Badge variant='info' pill>
            # {comic.issue}
          </Badge>
        </Card.Text>
        <Card.Text as='h5'>{comic.year}</Card.Text>
        <Card.Text as='h5'>{comic.publisher}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Comic
