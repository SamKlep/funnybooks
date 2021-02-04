import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Character = ({ character }) => {
  return (
    <Card className='my-3 p-3 rounded text-center char-shadow'>
      <Link to={`/characters/${character._id}`}>
        <Card.Img src={character.image}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/characters/${character._id}`}>
          <Card.Title as='h2'>
            <strong>{character.name}</strong>
          </Card.Title>
          <Card.Title as='div'>
            <strong>
              {character.realName ? (
                <h4 className='text-light'>{character.realName}</h4>
              ) : (
                ''
              )}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>
          {character.good ? (
            <Badge variant='success' pill>
              Hero
            </Badge>
          ) : (
            <Badge className='villain-color' pill>
              VIllain
            </Badge>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Character
