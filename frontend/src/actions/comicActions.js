import axios from 'axios'
import {
  COMIC_LIST_REQUEST,
  COMIC_LIST_SUCCESS,
  COMIC_LIST_FAIL,
  COMIC_DETAILS_REQUEST,
  COMIC_DETAILS_SUCCESS,
  COMIC_DETAILS_FAIL,
  COMIC_DELETE_REQUEST,
  COMIC_DELETE_SUCCESS,
  COMIC_DELETE_FAIL,
  COMIC_CREATE_REQUEST,
  COMIC_CREATE_SUCCESS,
  COMIC_CREATE_FAIL,
  COMIC_UPDATE_REQUEST,
  COMIC_UPDATE_SUCCESS,
  COMIC_UPDATE_FAIL,
} from '../constants/comicConstants'

export const listComics = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: COMIC_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/comics?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({ type: COMIC_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COMIC_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listComicDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMIC_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/comics/${id}`)

    dispatch({ type: COMIC_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COMIC_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteComic = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMIC_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/comics/${id}`, config)

    dispatch({
      type: COMIC_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: COMIC_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createComic = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMIC_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/comics`, {}, config)

    dispatch({
      type: COMIC_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COMIC_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateComic = (comic) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMIC_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/comics/${comic._id}`, comic, config)

    dispatch({
      type: COMIC_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COMIC_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
