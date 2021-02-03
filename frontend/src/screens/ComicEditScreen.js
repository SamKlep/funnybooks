import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listComicDetails, updateComic } from '../actions/comicActions'
import { COMIC_UPDATE_RESET } from '../constants/comicConstants'

const ComicEditScreen = ({ match, history }) => {
  const comicId = match.params.id

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [issue, setIssue] = useState('')
  const [year, setYear] = useState('')
  const [age, setAge] = useState('')
  const [writer, setWriter] = useState('')
  const [artist, setArtist] = useState('')
  const [character, setCharacter] = useState('')
  const [publisher, setPublisher] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const comicDetails = useSelector((state) => state.comicDetails)
  const { loading, error, comic } = comicDetails

  const comicUpdate = useSelector((state) => state.comicUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = comicUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COMIC_UPDATE_RESET })
      history.push('/admin/comiclist')
    } else {
      if (!comic.name || comic._id !== comicId) {
        dispatch(listComicDetails(comicId))
      } else {
        setTitle(comic.title)
        setSubtitle(comic.subtitle)
        setIssue(comic.issue)
        setYear(comic.year)
        setAge(comic.age)
        setWriter(comic.writer)
        setArtist(comic.artist)
        setCharacter(comic.character)
        setCondition(comic.condition)
        setPrice(comic.price)
        setImage(comic.image)
        setPublisher(comic.publisher)
        setCategory(comic.category)
        setCountInStock(comic.countInSock)
        setDescription(comic.description)
      }
    }
  }, [dispatch, history, comicId, comic, successUpdate])

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
      updateComic({
        _id: comicId,
        title,
        subtitle,
        price,
        image,
        issue,
        year,
        age,
        writer,
        artist,
        character,
        condition,
        publisher,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/comiclist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Comic</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='subtitle'>
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter subtitle'
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
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
            <Form.Group controlId='issue'>
              <Form.Label>Issue</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter issue'
                value={issue}
                onChange={(e) => setIssue(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='publisher'>
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter publisher'
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='year'>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter year'
                value={year}
                onChange={(e) => setYear(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='age'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter age'
                value={age}
                onChange={(e) => setAge(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='writer'>
              <Form.Label>Writer</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter writer'
                value={writer}
                onChange={(e) => setWriter(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='artist'>
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter artist'
                value={artist}
                onChange={(e) => setArtist(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='character'>
              <Form.Label>Character</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter character'
                value={character}
                onChange={(e) => setCharacter(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(e.target.value)
                }></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='condition'>
              <Form.Label>Condition</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter condition'
                value={condition}
                onChange={(e) => setCondition(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
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

export default ComicEditScreen
