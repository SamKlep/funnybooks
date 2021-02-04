import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap'

const ComicScreen = ({ match }) => {
  const [comic, setComic] = useState({})
  const [loading, setLoading] = useState({})

  useEffect(() => {
    setLoading(true)
    const fetchComics = async () => {
      const { data } = await axios.get(`/api/comics/${match.params.id}`)
      setComic(data)
      setLoading(false)
      console.log(data)
    }

    fetchComics()
    // eslint-disable-next-line
  }, [match])

  return (
    <>
      <Link className='char-shadow btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col>
              <Image
                className='char-shadow'
                src={comic.image}
                alt={comic.name}
                fluid
              />
            </Col>
            <Col className='align-self-center'>
              <ListGroup
                className='list-group-hover mx-auto char-shadow'
                variant='flush text-center'>
                <ListGroup.Item>
                  <h2 className='text-info'>{comic.title}</h2>
                </ListGroup.Item>
                {comic.subtitle ? (
                  <ListGroup.Item>
                    <h4 className='text-warning'>{comic.subtitle}</h4>
                  </ListGroup.Item>
                ) : (
                  ''
                )}
                <ListGroup.Item>Issue: {comic.issue}</ListGroup.Item>
                <ListGroup.Item>Year: {comic.year}</ListGroup.Item>
                <ListGroup.Item>Publisher: {comic.publisher}</ListGroup.Item>
                <ListGroup.Item>Writer: {comic.writer}</ListGroup.Item>
                <ListGroup.Item>Artist: {comic.artist}</ListGroup.Item>
                <ListGroup.Item>
                  Price: <span className='text-success'>${comic.price}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Col>Quantity: {comic.countInStock}</Col>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Row className='mt-5'>
              <Col className='mx-auto' md={8}>
                <Card>
                  <ListGroup className='char-shadow' variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>{comic.description}</Col>
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

export default ComicScreen
