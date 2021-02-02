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
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={comic.image} alt={comic.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush text-center'>
                <ListGroup.Item>
                  <h3>{comic.title}</h3>
                </ListGroup.Item>
                {comic.subtitle ? (
                  <ListGroup.Item>
                    <h5>{comic.subtitle}</h5>
                  </ListGroup.Item>
                ) : (
                  ''
                )}
                <ListGroup.Item>Issue: {comic.issue}</ListGroup.Item>
                <ListGroup.Item>Year: {comic.year}</ListGroup.Item>
                <ListGroup.Item>Publisher: {comic.publisher}</ListGroup.Item>
                <ListGroup.Item>Writer: {comic.writer}</ListGroup.Item>
                <ListGroup.Item>Artist: {comic.artist}</ListGroup.Item>
                <ListGroup.Item>Price: ${comic.price}</ListGroup.Item>
                <ListGroup.Item>
                  <Col>Quantity:{comic.countInStock}</Col>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
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
        </>
      )}
    </>
  )
}

export default ComicScreen
