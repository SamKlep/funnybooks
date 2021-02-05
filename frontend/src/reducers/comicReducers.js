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
  COMIC_CREATE_RESET,
  COMIC_UPDATE_REQUEST,
  COMIC_UPDATE_SUCCESS,
  COMIC_UPDATE_FAIL,
  COMIC_UPDATE_RESET,
  COMIC_TOP_REQUEST,
  COMIC_TOP_SUCCESS,
  COMIC_TOP_FAIL,
} from '../constants/comicConstants'

export const comicListReducer = (state = { comics: [] }, action) => {
  switch (action.type) {
    case COMIC_LIST_REQUEST:
      return { loading: true, comics: [] }
    case COMIC_LIST_SUCCESS:
      return {
        loading: false,
        comics: action.payload.comics,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case COMIC_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const comicDetailsReducer = (
  state = { comic: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case COMIC_DETAILS_REQUEST:
      return { loading: true, ...state }
    case COMIC_DETAILS_SUCCESS:
      return { loading: false, comic: action.payload }
    case COMIC_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const comicDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMIC_DELETE_REQUEST:
      return { loading: true }
    case COMIC_DELETE_SUCCESS:
      return { loading: false, success: true }
    case COMIC_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const comicCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMIC_CREATE_REQUEST:
      return { loading: true }
    case COMIC_CREATE_SUCCESS:
      return { loading: false, success: true, comic: action.payload }
    case COMIC_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case COMIC_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const comicUpdateReducer = (state = { comic: {} }, action) => {
  switch (action.type) {
    case COMIC_UPDATE_REQUEST:
      return { loading: true }
    case COMIC_UPDATE_SUCCESS:
      return { loading: false, success: true, comic: action.payload }
    case COMIC_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case COMIC_UPDATE_RESET:
      return { comic: {} }
    default:
      return state
  }
}

export const comicTopRatedReducer = (state = { comics: [] }, action) => {
  switch (action.type) {
    case COMIC_TOP_REQUEST:
      return { loading: true, comics: [] }
    case COMIC_TOP_SUCCESS:
      return { loading: false, comics: action.payload }
    case COMIC_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
