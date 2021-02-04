import asyncHandler from 'express-async-handler'
import Character from '../models/characterModel.js'

// @desc    Fetch single character
// @route   GET /api/characters
// @access  Public
const getCharacters = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Character.countDocuments({ ...keyword })
  const characters = await Character.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ characters, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single character
// @route   GET /api/characters/:id
// @access  Public
const getCharacterById = asyncHandler(async (req, res) => {
  const character = await Character.findById(req.params.id)

  if (character) {
    res.json(character)
  } else {
    res.status(404)
    throw new Error('Character not found')
  }
})

// @desc    Create a character
// @route   POST /api/characters
// @access  Private/Admin
const createCharacter = asyncHandler(async (req, res) => {
  const character = new Character({
    name: 'Sample name',
    realName: 'Sample real name',
    firstAppearance: 'Sample first',
    user: req.user._id,
    createdBy: 'Sample creator',
    homeUniverse: 'Sample home',
    good: false,
    evil: false,
    status: 'Sample status',
    placeOfBirth: 'Sample birthplace',
    citizenship: 'Sample citizenship',
    base: 'Sample base',
    powers: 'Sample powers',
    bio: 'Sample bio',
    image: '/images/sample.jpg',
    publisher: 'Sample publisher',
  })

  const createdCharacter = await character.save()
  res.status(201).json(createdCharacter)
})

// @desc    Update a character
// @route   PUT /api/characters/:id
// @access  Private/Admin
const updateCharacter = asyncHandler(async (req, res) => {
  const {
    name,
    realName,
    firstAppearance,
    createdBy,
    image,
    homeUniverse,
    good,
    evil,
    status,
    placeOfBirth,
    citizenship,
    base,
    powers,
    bio,
    publisher,
  } = req.body

  const character = await Character.findById(req.params.id)

  if (character) {
    character.name = name
    character.realName = realName
    character.firstAppearance = firstAppearance
    character.createdBy = createdBy
    character.homeUniverse = homeUniverse
    character.good = good
    character.evil = evil
    character.status = status
    character.image = image
    character.placeOfBirth = placeOfBirth
    character.citizenship = citizenship
    character.base = base
    character.powers = powers
    character.bio = bio
    character.publisher = publisher

    const updatedCharacter = await character.save()
    res.json(updatedCharacter)
  } else {
    res.status(404)
    throw new Error('Character not found')
  }
})
// @desc    Delete a character
// @route   DELETE /api/characters/:id
// @access  Private/Admin
const deleteCharacter = asyncHandler(async (req, res) => {
  const character = await Character.findById(req.params.id)

  if (character) {
    await character.remove()
    res.json({ message: 'Character removed' })
  } else {
    res.status(404)
    throw new Error('Character not found')
  }
})

export {
  getCharacters,
  getCharacterById,
  createCharacter,
  deleteCharacter,
  updateCharacter,
}
