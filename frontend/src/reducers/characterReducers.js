import {
  CHARACTER_LIST_REQUEST,
  CHARACTER_LIST_SUCCESS,
  CHARACTER_LIST_FAIL,
  CHARACTER_DETAILS_REQUEST,
  CHARACTER_DETAILS_SUCCESS,
  CHARACTER_DETAILS_FAIL,
  CHARACTER_DELETE_REQUEST,
  CHARACTER_DELETE_SUCCESS,
  CHARACTER_DELETE_FAIL,
  CHARACTER_CREATE_REQUEST,
  CHARACTER_CREATE_SUCCESS,
  CHARACTER_CREATE_FAIL,
  CHARACTER_CREATE_RESET,
  CHARACTER_UPDATE_REQUEST,
  CHARACTER_UPDATE_SUCCESS,
  CHARACTER_UPDATE_FAIL,
  CHARACTER_UPDATE_RESET,
} from '../constants/characterConstants'

export const characterListReducer = (state = { characters: [] }, action) => {
  switch (action.type) {
    case CHARACTER_LIST_REQUEST:
      return { loading: true, characters: [] }
    case CHARACTER_LIST_SUCCESS:
      return {
        loading: false,
        characters: action.payload.characters,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case CHARACTER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const characterDetailsReducer = (state = { character: {} }, action) => {
  switch (action.type) {
    case CHARACTER_DETAILS_REQUEST:
      return { loading: true, ...state }
    case CHARACTER_DETAILS_SUCCESS:
      return { loading: false, character: action.payload }
    case CHARACTER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const characterDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CHARACTER_DELETE_REQUEST:
      return { loading: true }
    case CHARACTER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CHARACTER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const characterCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHARACTER_CREATE_REQUEST:
      return { loading: true }
    case CHARACTER_CREATE_SUCCESS:
      return { loading: false, success: true, character: action.payload }
    case CHARACTER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CHARACTER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const characterUpdateReducer = (state = { character: {} }, action) => {
  switch (action.type) {
    case CHARACTER_UPDATE_REQUEST:
      return { loading: true }
    case CHARACTER_UPDATE_SUCCESS:
      return { loading: false, success: true, character: action.payload }
    case CHARACTER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CHARACTER_UPDATE_RESET:
      return { comic: {} }
    default:
      return state
  }
}
