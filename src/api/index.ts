import axios from 'axios';
import {Character} from '../interfaces/interfaces';
import {createAsyncThunk} from '@reduxjs/toolkit';

const API_URL = 'https://swapi.py4e.com/api/people/';

export const fetchCharacters = createAsyncThunk(
  'fetchCharacters',
  async (page: number, {rejectWithValue}) => {
    try {
      const {data} = await axios.get<{results: Character[]}>(
        `${API_URL}?page=${page}`,
      );

      return data;
    } catch (e: any) {
      return rejectWithValue(e.response.status);
    }
  },
);
