import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import comics from './data/comics.js'
import Comic from './models/comicModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Comic.deleteMany()

    const sampleComics = comics.map((comic) => {
      return { ...comic }
    })

    await Comic.insertMany(sampleComics)

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
