import React, {useState} from "react";

import ReactMarkdown from 'react-markdown'
import {Post} from "../components/Post";
import {Index} from "../components/AddComment";
import {CommentsBlock} from "../components/CommentsBlock";
import {useParams} from "react-router-dom";
import {fetchIdPosts} from "../API/post";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export const FullPost = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const [data, setData] = useState()

    const { posts } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(fetchIdPosts(id)).then(res => setData(res.payload))
    }, [])

    const isPostsLoading = posts.status === 'loading'

    return (
        <>
            {
                isPostsLoading ? <Post isLoading={true}/>
                    : <Post
                        _id={data?._id}
                        title={data?.title}
                        // http://localhost:4444
                        // ${process.env.REACT_APP_API_URL}
                        imageUrl={data?.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
                        user={data?.user}
                        createdAt={data?.createdAt}
                        viewsCount={data?.viewsCount}
                        commentsCount={3}
                        tags={data?.tags}
                        isFullPost
                    ><ReactMarkdown children={data?.text} />
                        <p>{ data?.text }</p></Post>
            }
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Вася Пупкин",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
                            fullName: "Иван Иванов",
                            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={isPostsLoading}
            >
                <Index/>
            </CommentsBlock>
        </>
    );
};
