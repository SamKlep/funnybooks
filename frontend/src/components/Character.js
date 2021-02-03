import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Character = ({ character }) => {
  return (
    <Card className='my-3 p-3 rounded text-center'>
      <Link to={`/characters/${character._id}`}>
        <Card.Img src={character.image}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/characters/${character._id}`}>
          <Card.Title as='div'>
            <strong>{character.name}</strong>
          </Card.Title>
          <Card.Title as='div'>
            <strong>
              {character.realName ? <h5>{character.realName}</h5> : ''}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>
          <Badge variant='info' pill>
            # {character.alignments}
          </Badge>
        </Card.Text>
        <Card.Text as='h5'>{character.firstAppearance}</Card.Text>
        <Card.Text as='h5'>{character.publisher}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Character
