import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export interface feedState {
    status: string;
    feeds: {userName: string, date: string, post: string}[]
  }

const initialState: feedState = {
  status: 'idel',
  feeds: [],
};

export const fetchAllFeeds = createAsyncThunk(
  'feeds/getAllFeeds',
  async () => {
    const responseData = await axios.get('/api/feeds');
    return responseData.data.data;
  }
);

export const allFeedsSlice = createSlice({
  name: 'allFeeds',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFeeds.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchAllFeeds.rejected, (state, action) => {
      state.status = 'rejected';
    });
    builder.addCase(fetchAllFeeds.fulfilled, (state, action) => {
      state.status = 'success';
      state.feeds = action.payload;
    });
  },
});

export const getAllFeed = (state: RootState) => state.allFeeds;
