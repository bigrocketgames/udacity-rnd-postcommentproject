export default (state = [], action) => {
  switch(action.type) {
    case 'GET_COMMENTS_SUCCESS':
      return action.comments;
      
    default:
      return state;
  }
}