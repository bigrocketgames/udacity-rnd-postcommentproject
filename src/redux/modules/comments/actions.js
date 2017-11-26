import 'isomorphic-fetch'

/* action creators */

const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
const UPDATE_COMMENT_SUCCESS ='UPDATE_COMMENT_SUCCESS';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';

export const getCommentsSuccess = (comments) => {
  return {
    type: GET_COMMENTS_SUCCESS,
    comments: comments
  }
}

export const addCommentSuccess = (comment) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    comment: comment
  }
}

export const updateCommentSuccess = (comment) => {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    comment: comment
  }
}

export const removeCommentSuccess = (comment) => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    comment: comment
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

export const addComment = (commentDetails) => {
  return dispatch => {
    return fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': 'let-me-in',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentDetails)
    })
      .then(response => response.json())
      .then(comment => dispatch(addCommentSuccess(comment)))
      .catch(error => console.log(error))
  }
}

export const commentDelete = (comment_id) => {
  return dispatch => {
    return fetch(`${API_URL}/comments/${comment_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'let-me-in'
      }
    })
      .then(response => response.json())
      .then(comment => dispatch(removeCommentSuccess(comment)))
      .catch(error => console.log(error))
  }
}

export const commentUpdate = (commentDetails, router) => {
  return dispatch => {
    return fetch(`${API_URL}/comments/${commentDetails.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'let-me-in',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( commentDetails )
    })
      .then(response => response.json())
      .then(comment => dispatch(updateCommentSuccess(comment)))
      .catch(error => console.log(error))
  }
}

export const commentVote = (id, vote) => {
  return dispatch => {
    return fetch(`${API_URL}/comments/${id}`, {
      method: 'POST',
      headers: { 
        'Authorization': 'let-me-in',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {option: `${vote}`} )
    })
      .then(response => response.json())
      .then(comment => dispatch(updateCommentSuccess(comment)))
      .catch(error => console.log(error))
  }
}