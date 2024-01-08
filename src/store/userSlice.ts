import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export interface trendState {
    status: string;
    userName: string,
    email: string,
    phoneNumber: string,
    jwtToken: string,
    loggedIn: boolean
  }

const initialState: trendState = {
  status: 'idel',
  userName: '',
  email: '',
  phoneNumber: '',
  jwtToken: '',
  loggedIn: false
};

export const fetchUser = createAsyncThunk(
  'profile/user',
  async () => {
    const responseData = await axios.get('/api/user');
    console.log(responseData.data)
    return responseData.data.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserloadingState(state) {
        state.status = 'loading'
        state.loggedIn = false
    },
    setUserSuccessState(state, action) {
        state.userName = action.payload.userName;
        state.email = action.payload.email;
        state.phoneNumber = action.payload.phoneNumber;
        state.loggedIn = true
        state.jwtToken = action.payload.jwtToken
        state.status = 'idel'
    },
    setUserfailedState(state) {
        state.loggedIn = false,
        state.status = 'idel'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = 'idel';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.userName = action.payload.userName;
        state.email = action.payload.email;
        state.phoneNumber = action.payload.phoneNumber;
        state.loggedIn = true
        state.jwtToken = action.payload.jwtToken
        state.status = 'idel'
    });
}
});

export const {setUserloadingState, setUserSuccessState,setUserfailedState } = userSlice.actions;
export const getUserState = (state: RootState) => state.user;
