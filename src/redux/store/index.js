import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import posts from '../modules/posts/reducer';
import comments from '../modules/comments/reducer';
import categories from '../modules/categories/reducer';

const reducers = combineReducers({
  posts,
  comments,
  categories
})

const middleware = [thunk]

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;