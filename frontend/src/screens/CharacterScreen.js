import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Badge } from 'react-bootstrap'

const CharacterScreen = ({ match }) => {
  const [character, setCharacter] = useState({})
  const [loading, setLoading] = useState({})

  useEffect(() => {
    setLoading(true)
    const fetchCharacters = async () => {
      const { data } = await axios.get(`/api/characters/${match.params.id}`)
      setCharacter(data)
      setLoading(false)
      // console.log(data)
    }

    fetchCharacters()
    // eslint-disable-next-line
  }, [match])

  return (
    <>
      <Link className='btn btn-light my-3' to='/characters'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col>
              <Image
                className='character-img char-shadow'
                src={character.image}
                alt={character.name}
                fluid
              />
            </Col>
            <Col>
              <ListGroup
                className='list-group-hover char-shadow'
                variant='flush text-center'>
                <ListGroup.Item>
                  <h2 className='text-info'>{character.name}</h2>
                </ListGroup.Item>
                {character.realName ? (
                  <ListGroup.Item>
                    <h4 className='text-warning'>{character.realName}</h4>
                  </ListGroup.Item>
                ) : (
                  ''
                )}
                <ListGroup.Item>
                  {character.good ? (
                    <Badge variant='success' pill>
                      Hero
                    </Badge>
                  ) : (
                    <Badge className='villain-color' pill>
                      Villain
                    </Badge>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  First Appearance: {character.firstAppearance}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created By: {character.createdBy}
                </ListGroup.Item>
                <ListGroup.Item>
                  Publisher: {character.publisher}
                </ListGroup.Item>
                <ListGroup.Item>
                  Home Universe: {character.homeUniverse}
                </ListGroup.Item>

                <ListGroup.Item></ListGroup.Item>
                <ListGroup.Item>Status: {character.status}</ListGroup.Item>
                <ListGroup.Item>
                  Citizenship: {character.citizenship}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Col>Birthplace:{character.placeOfBirth}</Col>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Col>Base:{character.base}</Col>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Row>
              <Col className='mt-5 mx-auto' lg={8}>
                <Card>
                  <ListGroup className='char-shadow' variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Powers: {character.powers}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>{character.bio}</Col>
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
          </Row>
        </>
      )}
    </>
  )
}

export default CharacterScreen
