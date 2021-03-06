import express from 'express'
const router = express.Router()
import {
  getComics,
  getComicById,
  createComic,
  deleteComic,
  updateComic,
  getTopComics,
} from '../controllers/comicController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getComics).post(protect, admin, createComic)
router.get('/top', getTopComics)

router
  .route('/:id')
  .get(getComicById)
  .delete(protect, admin, deleteComic)
  .put(protect, admin, updateComic)

export default router
