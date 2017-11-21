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

    default:
      return state;
  }
}