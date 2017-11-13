import 'isomorphic-fetch'

/* action creators */

const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';

export const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    posts: posts
  }
}

// Async actions - connect to API

const API_URL = process.env.REACT_APP_API_URL;

export const getPosts = () => {
  return dispatch => {
    return fetch(`${API_URL}/posts`, {
      headers: { 'Authorization': 'let-me-in' }
    })
      .then(response => response.json())
      .then(posts => dispatch(getPostsSuccess(posts)))
      .catch(error => console.log(error))
  }
}