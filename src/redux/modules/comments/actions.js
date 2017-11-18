import 'isomorphic-fetch'

/* action creators */

const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';

export const getCommentsSuccess = (comments) => {
  return {
    type: GET_COMMENTS_SUCCESS,
    comments: comments
  }
}

// Async actions - connect to API

const API_URL = process.env.REACT_APP_API_URL;

export const getComments = (postId) => {
  return dispatch => {
    return fetch(`${API_URL}/posts/${postId}/comments`, {
      headers: { 'Authorization': 'let-me-in'}
    })
      .then(response => response.json())
      .then(comments => dispatch(getCommentsSuccess(comments)))
      .catch(error => console.log(error))
  }
}