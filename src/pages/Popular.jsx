import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import s from "./Home.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllComments, fetchPopulatePosts, fetchPosts, fetchTags} from "../API/post";
import {CommentsBlock, Post, TagsBlock} from "../components";
import Grid from "@mui/material/Grid";



export const Popular = () => {

    const {posts, tags, comments} = useSelector(state => state.posts)
    const userData = useSelector(state => state.auth.data)

    const dispatch = useDispatch()

    const isPostsLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'


    useEffect(() => {
        dispatch(fetchPopulatePosts())
        dispatch(fetchTags())
        dispatch(fetchAllComments())
    }, []);


    return (
        <>
            <div className={s.box1}>
                <Link className={s.link} to="/"><span className={s.but2}>New</span></Link>
                <Link className={s.link} to="/popular"><span className={s.but2 + ' ' + s.botLin}>Popular</span></Link>
            </div>
            <Grid container spacing={4}>
                <Grid xs={8} item>
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
                                    commentsCount={comments?.items}
                                    likeCount={obj.likeCount}
                                    tags={obj.tags}
                                    isEditable={userData?._id === obj?.user?._id}
                                />
                            )))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags?.items} isLoading={isTagsLoading}/>
                    <CommentsBlock isLoading={false} />
                </Grid>
            </Grid>
        </>
        )
}