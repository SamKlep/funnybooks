import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap'

const CharacterScreen = ({ match }) => {
  const [character, setCharacter] = useState({})
  const [loading, setLoading] = useState({})

  useEffect(() => {
    setLoading(true)
    const fetchCharacters = async () => {
      const { data } = await axios.get(`/api/characters/${match.params.id}`)
      setCharacter(data)
      setLoading(false)
      console.log(data)
    }

    fetchCharacters()
    // eslint-disable-next-line
  }, [match])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={character.image} alt={character.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush text-center'>
                <ListGroup.Item>
                  <h3>{character.title}</h3>
                </ListGroup.Item>
                {character.subtitle ? (
                  <ListGroup.Item>
                    <h5>{character.subtitle}</h5>
                  </ListGroup.Item>
                ) : (
                  ''
                )}
                <ListGroup.Item>Issue: {character.issue}</ListGroup.Item>
                <ListGroup.Item>Year: {character.year}</ListGroup.Item>
                <ListGroup.Item>
                  Publisher: {character.publisher}
                </ListGroup.Item>
                <ListGroup.Item>Writer: {character.writer}</ListGroup.Item>
                <ListGroup.Item>Artist: {character.artist}</ListGroup.Item>
                <ListGroup.Item>Price: ${character.price}</ListGroup.Item>
                <ListGroup.Item>
                  <Col>Quantity:{character.countInStock}</Col>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>{character.description}</Col>
                    </Row>
                  </ListGroup.Item>

                  {/* <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item> */}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default CharacterScreen
