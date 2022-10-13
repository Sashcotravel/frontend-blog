import React, {useEffect} from 'react'
import Grid from "@mui/material/Grid";
import {Post} from "./Post";
import {useDispatch, useSelector} from "react-redux";
import s from './TagsPage.module.css'

export const TagsPage = () => {

    const dispatch = useDispatch()

    const userData = useSelector(state => state.auth.data)
    const {posts, tags} = useSelector(state => state.posts)

    const isPostsLoading = posts.status === 'loading'

    // useEffect(() => {
    //     dispatch(fetchOneTags(tags.items[0]))
    // }, [])

    return (
        <>

            <Grid container spacing={5}>
                <Grid xs={10} item>
                    <h1 className={s.tags}>#Tags</h1>
                    {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => (
                        isPostsLoading ? (<Post key={index} isLoading={true}/>)
                            : (
                                <Post
                                    key={index}
                                    _id={obj._id}
                                    title={obj.title}
                                    // http://localhost:4444
                                    // ${process.env.REACT_APP_API_URL}
                                    imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                                    user={obj.user}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={3}
                                    tags={obj.tags}
                                    isEditable={userData?._id === obj.user._id}
                                />
                            )))}
                </Grid>
            </Grid>
        </>
    )
}