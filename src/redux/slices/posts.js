import { createSlice } from '@reduxjs/toolkit'
import {
    fetchAllComments, fetchDeleteComments,
    fetchDeletePost,
    fetchOneTags,
    fetchPopulatePosts,
    fetchPosts,
    fetchTags,
    fetchIdPosts
} from "../../API/post";

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        tagsOne: '',
        status: 'loading'
    },
    comments: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },
        [fetchAllComments.pending]: (state) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchAllComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded'
        },
        [fetchAllComments.rejected]: (state) => {
            state.comments.items = []
            state.comments.status = 'error'
        },
        [fetchPopulatePosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPopulatePosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPopulatePosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'error'
        },
        [fetchOneTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchOneTags.fulfilled]: (state, action) => {
            state.posts.items = action.payload.ass
            state.tags.tagsOne = action.payload.tagsOne
            state.tags.status = 'loaded'
        },
        [fetchOneTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'error'
        },
        [fetchIdPosts.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchIdPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchIdPosts.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'error'
        },
        [fetchDeletePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
        [fetchDeleteComments.pending]: (state, action) => {
            state.comments.items = state.comments.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})


export const postsReducer = postsSlice.reducer