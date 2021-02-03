import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import comics from './data/comics.js'
import users from './data/users.js'
import Comic from './models/comicModel.js'
import characters from './data/characters.js'
import Character from './models/characterModel.js'
import User from './models/userModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Comic.deleteMany()
    await User.deleteMany()
    await Character.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleComics = comics.map((comic) => {
      return { ...comic, user: adminUser }
    })
    const sampleCharacters = characters.map((character) => {
      return { ...character, user: adminUser }
    })

    await Comic.insertMany(sampleComics)
    await Character.insertMany(sampleCharacters)

    console.log('Data imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Comic.deleteMany()
    await User.deleteMany()
    await Character.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
