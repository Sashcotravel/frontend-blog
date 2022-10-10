import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from "../API";


export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await instance.post('/auth/register', params)
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



