import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCharacters} from '../api';
import {Character} from '../interfaces/interfaces';

interface CharactersState {
  characters: Character[];
  status: 'loading' | 'succeeded' | 'failed';
  error: string;
  page: number;
}

const initialState: CharactersState = {
  characters: [],
  status: 'loading',
  error: '',
  page: 1,
};

const characters = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    resetState(state) {
      state.characters = [];
      state.status = 'loading';
      state.error = '';
    },
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCharacters.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = [...state.characters, ...action.payload.results];
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const {resetState, setCharacters, setPage} = characters.actions;
export const charactersSlice = characters.reducer;
