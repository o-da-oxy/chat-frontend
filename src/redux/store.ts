import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import appApi from './appApi';
import user from './userSlice';

// reducers
const reducer = combineReducers({
  user,
  [appApi.reducerPath]: appApi.reducer, // for async request
});

const persistConfig = {
  key: 'root',
  storage,
  blackList: [appApi.reducerPath],
};

// persist store
const persistedReducer = persistReducer(persistConfig, reducer);

// create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware],
});

export default store;
