import 'isomorphic-fetch'

/* action creators */

const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';

export const getCategoriesSuccess = ({categories}) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories: categories
  }
}

// Async actions - connect to API

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = () => {
  return dispatch => {
    return fetch(`${API_URL}/categories`, {
      headers: { 'Authorization': 'let-me-in' }
    })
      .then(response => response.json())
      .then(categories => dispatch(getCategoriesSuccess(categories)))
      .catch(error => console.log(error))
  }
}