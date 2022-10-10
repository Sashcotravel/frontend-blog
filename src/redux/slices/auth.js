import { createSlice } from '@reduxjs/toolkit'
import {fetchAuthMe, fetchLogin} from "../../API/auth";

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchLogin.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },[fetchAuthMe.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
    }
})

export const isAuthSelector = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions