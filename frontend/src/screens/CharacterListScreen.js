import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listCharacters,
  deleteCharacter,
  createCharacter,
} from '../actions/characterActions'
import { CHARACTER_CREATE_RESET } from '../constants/characterConstants'

const CharacterListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const characterList = useSelector((state) => state.characterList)
  const { loading, error, characters, pages, page } = characterList

  const characterDelete = useSelector((state) => state.characterDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = characterDelete

  const characterCreate = useSelector((state) => state.characterCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    character: createdCharacter,
  } = characterCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: CHARACTER_CREATE_RESET })
    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/characters/${createdCharacter._id}/edit`)
    } else {
      dispatch(listCharacters('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCharacter,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCharacter(id))
    }
  }

  const createCharacterHandler = () => {
    dispatch(createCharacter())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Characters</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCharacterHandler}>
            <i className='fas fa-plus'></i> Create Character
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
                <th>NAME</th>
                <th>REAL NAME</th>
                <th>FIRST APPEARANCE</th>
                <th>CREATED BY</th>
                <th>PUBLISHER</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character) => (
                <tr key={character._id}>
                  <td>{character._id}</td>
                  <td>{character.name}</td>
                  <td>{character.realName}</td>
                  <td className='text-info'> {character.firstAppearance}</td>
                  <td>{character.createdBy}</td>
                  <td>{character.publisher}</td>

                  <td>
                    <LinkContainer to={`/admin/comics/${character._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className=' fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(character._id)}>
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

export default CharacterListScreen
