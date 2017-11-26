export default (state = [], action) => {
  switch(action.type) {
    case 'GET_COMMENTS_SUCCESS':
      return action.comments;
      
    case 'UPDATE_COMMENT_SUCCESS':
      const index = state.findIndex(comment => comment.id === action.comment.id);
      return [
        ...state.slice(0, index),
        action.comment,
        ...state.slice(index+1)
      ];

    case 'ADD_COMMENT_SUCCESS':
      if (state.length > 0) {
        return [
          ...state,
          action.comment
        ]
      } else {
        return state.concat(action.comment);
      }

    case 'DELETE_COMMENT_SUCCESS':
      if (state.length > 0) {
        return state.filter(comment => comment.id !== action.comment.id)
      } else {
        return []
      }

    default:
      return state;
  }
}