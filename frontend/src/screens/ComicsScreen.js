import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import { Col, Row, DropdownButton, Dropdown, Container } from 'react-bootstrap'
import Comic from '../components/Comic'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useDispatch, useSelector } from 'react-redux'
import { listComics } from '../actions/comicActions'

const ComicsScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const comicList = useSelector((state) => state.comicList)
  const { loading, error, comics, page, pages } = comicList

  useEffect(() => {
    dispatch(listComics(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h1>Comics</h1>
      <Container>
        <Row className='filter-div'>
          <Col className='text-center'>
            <DropdownButton
              variant='info'
              id='dropdown-basic-button'
              title='Filter'>
              <Dropdown.Item href='#/action-1'>Spectacular</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>Amazing</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>Superior</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {comics.map((comic) => (
              <Col key={comic._id} sm={12} md={6} lg={4} xl={3}>
                <Comic comic={comic} />
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

export default ComicsScreen
