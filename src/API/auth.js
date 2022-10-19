import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from "../API";


export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await instance.post('/auth/register', params)
    return data
})

export const fetchLike = createAsyncThunk('auth/fetchLike', async ({ id, postId, like }) => {
    const { data } = await instance.post('/auth/like', {userId: id, postId: postId, itLike: like})
    return data
})

export const fetchLikeToggle = createAsyncThunk('auth/fetchLikeToggle', async ({ id, postId, like }) => {
    const { data } = await instance.patch('/auth/like-toggle', {userId: id, postId: postId, itLike: like})
    return data
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
    const { data } = await instance.post('/auth/login', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await instance.get('/auth/me')
    return data
})



