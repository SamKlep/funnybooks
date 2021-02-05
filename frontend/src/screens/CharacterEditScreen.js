import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  listCharacterDetails,
  updateCharacter,
} from '../actions/characterActions'
import { CHARACTER_UPDATE_RESET } from '../constants/characterConstants'

const CharacterEditScreen = ({ match, history }) => {
  const characterId = match.params.id
  const [name, setName] = useState('')
  const [realName, setRealName] = useState('')
  const [firstAppearance, setFirstAppearance] = useState(0)
  const [image, setImage] = useState('')
  const [createdBy, setCreatedBy] = useState('')
  const [publisher, setPublisher] = useState('')
  const [status, setStatus] = useState('')
  const [placeOfBirth, setPlaceOfBirth] = useState('')
  const [citizenship, setCitizenship] = useState('')
  const [homeUniverse, setHomeUniverse] = useState('')
  const [base, setBase] = useState('')
  const [powers, setPowers] = useState('')
  const [bio, setBio] = useState('')
  const [good, setGood] = useState(false)
  const [evil, setEvil] = useState(false)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const characterDetails = useSelector((state) => state.characterDetails)
  const { loading, error, character } = characterDetails

  const characterUpdate = useSelector((state) => state.characterUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = characterUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CHARACTER_UPDATE_RESET })
      history.push('/admin/characterlist')
    } else {
      if (!character.name || character._id !== characterId) {
        dispatch(listCharacterDetails(characterId))
      } else {
        setName(character.name)
        setRealName(character.realName)
        setFirstAppearance(character.firstAppearance)
        setCreatedBy(character.createdBy)
        setStatus(character.status)
        setPlaceOfBirth(character.placeOfBirth)
        setCitizenship(character.citizenship)
        setHomeUniverse(character.homeUniverse)
        setBase(character.base)
        setPowers(character.powers)
        setImage(character.image)
        setPublisher(character.publisher)
        setBio(character.bio)
        setGood(character.good)
        setEvil(character.evil)
      }
    }
  }, [dispatch, history, characterId, character, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCharacter({
        _id: characterId,
        name,
        realName,
        firstAppearance,
        image,
        createdBy,
        status,
        placeOfBirth,
        citizenship,
        homeUniverse,
        base,
        publisher,
        powers,
        bio,
        good,
        evil,
      })
    )
  }

  return (
    <>
      <Link to='/admin/characterlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Character</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='realName'>
              <Form.Label>Real Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter real name'
                value={realName}
                onChange={(e) => setRealName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='firstAppearance'>
              <Form.Label>First Appearance</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first appearance'
                value={firstAppearance}
                onChange={(e) =>
                  setFirstAppearance(e.target.value)
                }></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}>
                {uploading && <Loader />}
              </Form.File>
            </Form.Group>

            <Form.Group controlId='createdBy'>
              <Form.Label>Created By</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter creators'
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='placeOfBirth'>
              <Form.Label>Place of Birth</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter place of birth'
                value={placeOfBirth}
                onChange={(e) =>
                  setPlaceOfBirth(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId='citizenship'>
              <Form.Label>Citizenship</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Citizenship'
                value={citizenship}
                onChange={(e) => setCitizenship(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='homeUniverse'>
              <Form.Label>Home Universe</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter home universe'
                value={homeUniverse}
                onChange={(e) =>
                  setHomeUniverse(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId='base'>
              <Form.Label>Base</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter base'
                value={base}
                onChange={(e) => setBase(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='publisher'>
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter publisher'
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='powers'>
              <Form.Label>Powers</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter powers'
                value={powers}
                onChange={(e) => setPowers(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='bio'>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='good'>
              <Form.Label>Good</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter good'
                value={good}
                onChange={(e) => setGood(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='evil'>
              <Form.Label>Evil</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter evil'
                value={evil}
                onChange={(e) => setEvil(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CharacterEditScreen
