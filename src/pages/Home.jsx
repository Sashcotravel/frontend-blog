import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import s from './Home.module.css'
import {Post} from '../components/Post';
import {TagsBlock} from '../components/TagsBlock';
import {CommentsBlock} from '../components/CommentsBlock';
import {useEffect} from "react";
import {fetchOneTags, fetchPosts, fetchTags} from "../API/post";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

export const Home = () => {

    const userData = useSelector(state => state.auth.data)
    const dispatch = useDispatch()
    const {posts, tags} = useSelector(state => state.posts)

    const isPostsLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])


    return (
        <>
            {/*<Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">*/}
            {/*    <Tab label="New" />*/}
            {/*    <Tab label="Популярные" />*/}
            {/*</Tabs>*/}
            <div className={s.box1}>
                <Link className={s.link} to="/"><span className={s.but2 + ' ' + s.botLin}>New</span></Link>
                <Link className={s.link} to="/popular"><span className={s.but2}>Popular</span></Link>
            </div>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostsLoading ? [...Array(5)] : posts?.items).map((obj, index) => (
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
                                commentsCount={3}
                                tags={obj.tags}
                                isEditable={userData?._id === obj.user._id}
                            />
                        )))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags?.items} isLoading={isTagsLoading}/>
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
