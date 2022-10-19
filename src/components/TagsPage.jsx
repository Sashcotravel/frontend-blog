import React, {useEffect} from 'react'
import Grid from "@mui/material/Grid";
import {Post} from "./Post";
import {useSelector} from "react-redux";
import s from './TagsPage.module.css'

export const TagsPage = () => {

    let count = []
    const {comments} = useSelector(state => state.posts)
    const userData = useSelector(state => state.auth.data)
    const {posts, tags} = useSelector(state => state.posts)
    const {data} = useSelector(state => state.auth)

    const isPostsLoading = posts.status === 'loading'
    
    return (
        <>

            <Grid container spacing={5}>
                <Grid xs={10} item>
                    <h1 className={s.tags}>#{!isPostsLoading ? tags.tagsOne : 'Tags'}</h1>
                    {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => (
                        isPostsLoading ? (<Post key={index} isLoading={true}/>)
                            : (
                                <Post
                                    key={index}
                                    _id={obj._id}
                                    title={obj.title}
                                    // http://localhost:4444
                                    // ${process.env.REACT_APP_API_URL}
                                    imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                                    user={obj.user}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={comments?.items.map(obj => obj.postId === data?._id ? count.push(obj.postId) : 0) && count?.length}
                                    likeCount={obj.likeCount}
                                    tags={obj.tags}
                                    isEditable={userData?._id === obj?.user?._id}
                                />
                            )))}
                </Grid>
            </Grid>
        </>
    )
}