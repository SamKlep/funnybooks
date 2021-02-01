import express from 'express'
const router = express.Router()
import {
  getComics,
  getComicById,
  createComic,
  deleteComic,
  updateComic,
} from '../controllers/comicController.js'

router.route('/').get(getComics).post(createComic)

router.route('/:id').get(getComicById).delete(deleteComic).put(updateComic)

export default router
