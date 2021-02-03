import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listComics, deleteComic, createComic } from '../actions/comicActions'
import { COMIC_CREATE_RESET } from '../constants/comicConstants'

const ComicListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const comicList = useSelector((state) => state.comicList)
  const { loading, error, comics, pages, page } = comicList

  const comicDelete = useSelector((state) => state.comicDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = comicDelete

  const comicCreate = useSelector((state) => state.comicCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    comic: createdComic,
  } = comicCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: COMIC_CREATE_RESET })
    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/comics/${createdComic._id}/edit`)
    } else {
      dispatch(listComics('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdComic,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteComic(id))
    }
  }

  const createComicHandler = () => {
    dispatch(createComic())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Comics</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createComicHandler}>
            <i className='fas fa-plus'></i> Create Comic
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>SUBTITLE</th>
                <th>PRICE</th>
                <th>ISSUE</th>
                <th>YEAR</th>
                <th>AGE</th>
                <th>WRITER</th>
                <th>ARTIST</th>
                <th>CHARACTER</th>
                <th>PUBLISHER</th>
                <th>CONDITTION</th>
                <th>COUNT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {comics.map((comic) => (
                <tr key={comic._id}>
                  <td>{comic._id}</td>
                  <td>{comic.title}</td>
                  <td>{comic.subtitle}</td>
                  <td>$ {comic.price}</td>
                  <td>{comic.issue}</td>
                  <td>{comic.year}</td>
                  <td>{comic.age}</td>
                  <td>{comic.writer}</td>
                  <td>{comic.artist}</td>
                  <td>{comic.character}</td>
                  <td>{comic.publisher}</td>
                  <td>{comic.condition}</td>
                  <td>{comic.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/comics/${comic._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className=' fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(comic._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ComicListScreen
