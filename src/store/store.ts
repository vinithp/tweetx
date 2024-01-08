import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice'
import { allFeedsSlice } from './feedSlice';
import { allTrendsSlice } from './trendSlice';

// const store = configureStore({
//   reducer: {
//     [userSlice.name]: userSlice.reducer,
//   },
// });

// export default store;

export const store = () => {
    return configureStore({
      reducer: {
        [userSlice.name]: userSlice.reducer,
        [allFeedsSlice.name]: allFeedsSlice.reducer,
        [allTrendsSlice.name]: allTrendsSlice.reducer
      }
    })
  }

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']