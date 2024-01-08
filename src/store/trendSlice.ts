import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export interface trendState {
    status: string;
    trends: {name: string, data: string, post: string}[]
  }

const initialState: trendState = {
  status: 'idel',
  trends: [],
};

export const fetchAlltrend = createAsyncThunk(
  'feeds/getAllFeeds',
  async () => {
    const responseData = await axios.get('http://localhost:5001/application');
    return responseData.data;
  }
);

export const allTrendsSlice = createSlice({
  name: 'allTrends',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlltrend.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchAlltrend.rejected, (state, action) => {
      state.status = 'rejected';
    });
    builder.addCase(fetchAlltrend.fulfilled, (state, action) => {
      state.status = 'success';
      state.trends = action.payload;
    });
  },
});

export const getAllTrendStatus = (state: RootState) => state.allTrends
