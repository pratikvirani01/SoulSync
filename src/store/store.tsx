import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../helper/userSlice'; 

const store = configureStore({
    reducer: {
        home: homeReducer,
    },
});

export default store;
