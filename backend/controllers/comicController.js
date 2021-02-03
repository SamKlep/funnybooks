import asyncHandler from 'express-async-handler'
import Comic from '../models/comicModel.js'

// @desc    Fetch single comic
// @route   GET /api/comics
// @access  Public
const getComics = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Comic.countDocuments({ ...keyword })
  const comics = await Comic.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ comics, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single comic
// @route   GET /api/comics/:id
// @access  Public
const getComicById = asyncHandler(async (req, res) => {
  const comic = await Comic.findById(req.params.id)

  if (comic) {
    res.json(comic)
  } else {
    res.status(404)
    throw new Error('Comic not found')
  }
})

// @desc    Create a comic
// @route   POST /api/comics
// @access  Private/Admin
// const createComic = asyncHandler(async (req, res) => {
//   const comic = await Comic.create(req.body)

//   const createdComic = await comic.save()
//   res.status(201).json(createdComic)
// })

// @desc    Create a comic
// @route   POST /api/comics
// @access  Private/Admin
const createComic = asyncHandler(async (req, res) => {
  const comic = new Comic({
    title: 'Sample title',
    subtitle: 'Sample subtitle',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    publisher: 'Sample publisher',
    issue: 0,
    year: 0,
    age: 'Sample publisher',
    writer: 'Sample publisher',
    artist: 'Sample publisher',
    character: 'Sample publisher',
    category: 'Sample category',
    countInStock: 0,
    condition: 0,
    description: 'Sample description',
  })

  const createdComic = await comic.save()
  res.status(201).json(createdComic)
})

// @desc    Update a comic
// @route   PUT /api/comics/:id
// @access  Private/Admin
const updateComic = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    publisher,
    description,
    image,
    issue,
    year,
    age,
    writer,
    artist,
    character,
    category,
    condition,
    price,
    countInStock,
  } = req.body

  const comic = await Comic.findById(req.params.id)

  if (comic) {
    comic.title = title
    comic.subtitle = subtitle
    comic.publisher = publisher
    comic.issue = issue
    comic.year = year
    comic.price = price
    comic.description = description
    comic.image = image
    comic.age = age
    comic.character = character
    comic.condition = condition
    comic.writer = writer
    comic.artist = artist
    comic.category = category
    comic.countInStock = countInStock

    const updatedComic = await comic.save()
    res.json(updatedComic)
  } else {
    res.status(404)
    throw new Error('Comic not found')
  }
})
// @desc    Delete a comic
// @route   DELETE /api/comics/:id
// @access  Private/Admin
const deleteComic = asyncHandler(async (req, res) => {
  const comic = await Comic.findById(req.params.id)

  if (comic) {
    await comic.remove()
    res.json({ message: 'Comic removed' })
  } else {
    res.status(404)
    throw new Error('Comic not found')
  }
})

export { getComics, getComicById, createComic, deleteComic, updateComic }
