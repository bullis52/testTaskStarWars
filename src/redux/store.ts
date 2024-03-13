import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {charactersSlice} from './charactersSlice';

const rootReducer = combineReducers({
  characters: charactersSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
