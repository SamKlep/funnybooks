import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import { Col, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useDispatch, useSelector } from 'react-redux'
import { listCharacters } from '../actions/characterActions'
import Character from '../components/Character'

const CharactersScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const characterList = useSelector((state) => state.characterList)
  const { loading, error, characters, page, pages } = characterList
  // console.log(characters)
  useEffect(() => {
    dispatch(listCharacters(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h1>Characters</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {characters.map((character) => (
              <Col key={character._id} sm={12} md={6} lg={4} xl={3}>
                <Character character={character} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default CharactersScreen
