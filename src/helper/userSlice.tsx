import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchHomeData = createAsyncThunk('home/fetchHomeData', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
});

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        data: [] as any[],  
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        error: null as string | null, 
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchHomeData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchHomeData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchHomeData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error?.message || 'Unknown error';  
        });
    },
});

export default homeSlice.reducer;
