import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopComics } from '../actions/comicActions'

const ComicSpring = () => {
  const dispatch = useDispatch()

  const comicTopRated = useSelector((state) => state.comicTopRated)
  const { loading, error, comics } = comicTopRated

  useEffect(() => {
    dispatch(listTopComics())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel className='bg-secondary'>
      {comics.map((comic) => (
        <Carousel.Item key={comic._id}>
          <Link to={`/comics/${comic._id}`}>
            <Image
              className='align-self-center'
              src={comic.image}
              alt={comic.name}
              fluid
            />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {comic.name} (${comic.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ComicSpring
