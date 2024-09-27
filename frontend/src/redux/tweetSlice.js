import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: 'tweet',
    initialState: {
        allTweets: null,
        isActive: true,
        refresh: false
    },
    reducers: {
        getAllTweets:(state,action) => {
            state.allTweets = action.payload;
        },
        getIsActive:(state,action) => {
            state.isActive = action.payload;
        },
        getRefresh:(state) => {
            state.refresh = !state.refresh;
        }
    }
});

export const {getAllTweets,getRefresh,getIsActive} = tweetSlice.actions;
export default tweetSlice.reducer;