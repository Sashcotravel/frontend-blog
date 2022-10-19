import React, {useState} from "react";

import ReactMarkdown from 'react-markdown'
import {Post} from "../components/Post";
import {Index} from "../components/AddComment";
import {CommentsBlock} from "../components/CommentsBlock";
import {useParams} from "react-router-dom";
import {fetchAllComments, fetchIdPosts, fetchPosts, fetchTags} from "../API/post";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export const FullPost = () => {

    let count = []
    const dispatch = useDispatch()
    const {id} = useParams()
    const {comments} = useSelector(state => state.posts)

    const {posts} = useSelector(state => state.posts)


    useEffect( () => {
        dispatch(fetchIdPosts(id))
        dispatch(fetchAllComments())

        return () => {
            dispatch(fetchPosts())
            dispatch(fetchTags())
            dispatch(fetchAllComments())
        };
    }, [])



    const isPostsLoading = posts.status === 'loading'

    return (
        <>
            {
                // isPostsLoading ? <Post isLoading={!posts.items ? true : false}/>
                //     :
                <Post
                        _id={posts?.items?._id}
                        title={posts?.items?.title}
                        // http://localhost:4444
                        // ${process.env.REACT_APP_API_URL}
                        imageUrl={posts?.items?.imageUrl ? `${process.env.REACT_APP_API_URL}${posts.items?.imageUrl}` : ''}
                        user={posts?.items?.user}
                        createdAt={posts?.items?.createdAt}
                        viewsCount={posts?.items?.viewsCount}
                        commentsCount={comments?.items.map(obj => obj.postId === posts?.items?._id ? count.push(obj.postId) : 0) && count?.length}
                        // likeCount={posts?.items?.likeCount}
                        tags={posts?.items?.tags}
                        isFullPost
                    ><ReactMarkdown children={posts?.items?.text}/>
                        {/*<p>{data?.text}</p>*/}
                </Post>
            }
            {/*<CommentsBlock isLoading={false} />*/}
            <Index/>
        </>
    );
};
