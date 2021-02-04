import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
]
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const Character = ({ character }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))
  return (
    <animated.div
      class='card'
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}>
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
    </animated.div>
  )
}

export default Character
