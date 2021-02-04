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

const Comic = ({ comic }) => {
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
    </animated.div>
  )
}

export default Comic
