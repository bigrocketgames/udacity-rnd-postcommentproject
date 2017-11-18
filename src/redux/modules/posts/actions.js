import 'isomorphic-fetch'

/* action creators */

const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const UPDATE_POST_SUCCESS ='UPDATE_POST_SUCCESS';

export const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    posts: posts
  }
}

export const updatePostSuccess = (post) => {
  return {
    type: UPDATE_POST_SUCCESS,
    post: post
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

export const getSinglePost = (postId) => {
  return dispatch => {
    return fetch(`${API_URL}/posts/${postId}`, {
      headers: { 'Authorization': 'let-me-in' }
    })
      .then(response => response.json())
      .then(post => dispatch(getPostsSuccess(post)))
      .catch(error => console.log(error))
  }
}

export const postVote = (id, vote) => {
  return dispatch => {
    return fetch(`${API_URL}/posts/${id}`, {
      method: 'POST',
      headers: { 
        'Authorization': 'let-me-in',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {option: `${vote}`} )
    })
      .then(response => response.json())
      .then(post => dispatch(updatePostSuccess(post)))
      .catch(error => console.log(error))
  }
}