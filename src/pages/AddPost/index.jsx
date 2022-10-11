import React, {useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {isAuthSelector} from "../../redux/slices/auth";
import instance from "../../API";

export const AddPost = () => {

    const { id } = useParams()
    const isEditing = Boolean(id)
    const navigate = useNavigate()
    const isAuth = useSelector(isAuthSelector)
    const [isLoading, setLoading] = useState(false)
    const [fields, setFields] = React.useState({
        title: '',
        tags: '',
        text: '',
        imageUrl: ''
    });
    const inputFileRef = useRef(null)

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const {data} = await instance.post('/upload', formData)
            setFields((actual) => {
                return {...actual, imageUrl: data.url}
            })
        } catch (err) {
            console.warn(err)
        }
    };

    const onClickRemoveImage = () => {
        setFields((actual) => {
            return {...actual, imageUrl: ''}
        })
    };

    const onSubmit = async () => {
        setLoading(true)

        const { data } = isEditing
            ? await instance.patch(`/posts/${id}`, fields)
            : await instance.post('/posts', fields)

        const _id = isEditing ? id : data._id
        navigate(`/posts/${_id}`)
    }

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Enter text...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    useEffect(() => {
        instance.get(`/posts/${id}`).then(({ data }) => {
            setFields((actual) => {
                return {...actual,
                    title: data.title,
                    tags: data.tags.join(','),
                    imageUrl: data.imageUrl,
                    text: data.text,
                }
            })
        })
    }, [])

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <Paper style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
                Загрузить превью
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {fields.imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Delete
                    </Button>
                    {/*http://localhost:4444*/}
                    <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${fields.imageUrl}`} alt="Uploaded"/>
                </>
            )}
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                value={fields.title}
                onChange={(e) => {
                    setFields((actual) => {
                        return {...actual, title: e.target.value}
                    })
                }}
                placeholder="Title article..."
                fullWidth
            />
            <TextField classes={{root: styles.tags}} variant="standard" placeholder="Tags"
                       value={fields.tags}
                       onChange={(e) => {
                           setFields((actual) => {
                               return {...actual, tags: e.target.value}
                           })
                       }}
                       fullWidth/>
            <SimpleMDE className={styles.editor} options={options} value={fields.text}
                       onChange={(e) => {
                           setFields((actual) => {
                               return {...actual, text: e}
                           })
                       }}
            />
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    {isEditing ? 'Save' : 'Опубликовать'}
                </Button>
                <Link to="/">
                    <Button size="large">Cancel</Button>
                </Link>
            </div>
        </Paper>
    );
};
