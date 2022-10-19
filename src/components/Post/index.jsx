import React, {useEffect} from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import {UserInfo} from '../UserInfo';
import {PostSkeleton} from './Skeleton';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchDeletePost, fetchLikePosts, fetchPosts} from "../../API/post";
import imageU from './../../image/heart-regular.svg'
import s from "../AddComment/AddComment.module.scss";
import {fetchAuthMe, fetchLike, fetchLikeToggle} from "../../API/auth";

export const Post = ({
                         _id, title, createdAt, imageUrl, user, viewsCount, likeCount,
                         commentsCount, tags, children, isFullPost, isLoading, isEditable
                     }) => {

    const idUser = useSelector(state => state.auth.data)
    const dispatch = useDispatch()

    if (isLoading) {
        return <PostSkeleton/>;
    }

    const onClickRemove = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(fetchDeletePost(_id))
        }
    };

    const like = async () => {

        let res = idUser.postLike.filter(obj => obj.postId === _id ? obj : false)
        if (res.length !== 0) { // якщо not пустий
            if (res[0].like) {
                await dispatch(fetchLikeToggle({id: idUser.email, postId: _id, like: false}))
                await dispatch(fetchAuthMe())
                await dispatch(fetchLikePosts({id: _id, act: false, like: likeCount}))
            } else {
                await dispatch(fetchLikeToggle({id: idUser.email, postId: _id, like: true}))
                await dispatch(fetchAuthMe())
                await dispatch(fetchLikePosts({id: _id, act: true, like: likeCount}))
            }
        } else {
            await dispatch(fetchLike({id: idUser.email, postId: _id, like: true}))
            await dispatch(fetchAuthMe())
            dispatch(fetchLikePosts({id: _id, act: true, like: likeCount}))
        }

        dispatch(fetchPosts())
    }

    let count = []
    count = (commentsCount.length === undefined) ? commentsCount : commentsCount?.map(obj => obj.postId === _id ? count.push(+1) : 0) && count.length

    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${_id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    className={clsx(styles.image, {[styles.imageFull]: isFullPost})}
                    src={imageUrl}
                    alt={title}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo {...user} additionalText={createdAt}/>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: isFullPost})}>
                        {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
                    </h2>
                    <ul className={styles.tags}>
                        {tags?.map((name) => (
                            <li key={name}>
                                <Link to={`/tags`}>#{name}</Link>
                            </li>
                        ))}
                    </ul>
                    {children && <div className={styles.content}>{children}</div>}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon/>
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon/>
                            <span>{count}</span>
                        </li>
                        <li>
                            {
                                likeCount === undefined
                                    ?
                                    <>
                                        <span></span>
                                    </>
                                    : <>
                                        <span><img className={s.edit} src={imageU} onClick={like}/></span>
                                        <span style={{marginBottom: '8px'}}>{likeCount === 0 ? '' : likeCount}</span>
                                    </>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
