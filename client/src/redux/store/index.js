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

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
)

const store = createStore(
  reducers, 
  enhancer
)

export default store;