export default (state = [], action) => {
  switch(action.type) {
    case 'GET_POSTS_SUCCESS':
      return action.posts;
      
    case 'UPDATE_POST_SUCCESS':
      if (state.length > 0) {
        const index = state.findIndex(post => post.id === action.post.id);
        return [
          ...state.slice(0, index),
          action.post,
          ...state.slice(index+1)
        ];
      } else {
        return action.post;
      }

    case 'ADD_NEW_POST_SUCCES':
      return [
        ...state,
        action.post
      ]

    case 'DELETE_POST_SUCCESS':
      if (state.length > 0) {
        return state.filter(post => post.id !== action.post.id)
      } else {
        return []
      }

    default:
      return state;
  }
}