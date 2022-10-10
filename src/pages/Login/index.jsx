import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../../API/auth";
import {useForm} from "react-hook-form";
import {isAuthSelector} from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {

    const isAuth = useSelector(isAuthSelector)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: 'ivan@gmail.com',
            password: '1234'
        },
        model: 'onChange'
    })


    const onSubmit = async (values) => {
        const data = await dispatch(fetchLogin(values))
        if('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if(isAuth){
        return  <Navigate to={'/'}/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Sign in to your account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field} error={Boolean(errors.email?.message)}
                    label="E-Mail" helperText={errors.email?.message}
                    type='email'
                    { ...register('email', { required: 'Entered email' }) }
                    fullWidth
                />
                <TextField className={styles.field} label="Password" fullWidth
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           { ...register('password', { required: 'Entered password' }) } />
                <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth >
                    Log in
                </Button>
            </form>
        </Paper>
    );
};


