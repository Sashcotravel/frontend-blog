import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from "../API";


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await instance.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await instance.get('/posts/posts/tags')
    return data
})

export const fetchIdPosts = createAsyncThunk('posts/fetchIdPosts', async (id) => {
    const { data } = await instance.get(`/posts/${id}`)
    return data
})

export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost', async (id) => {
    const { data } = instance.delete(`/posts/${id}`)
    return data
})


