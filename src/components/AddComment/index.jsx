import React, {useState, useRef} from "react";
import s from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import {fetchAllComments, fetchComment, fetchDeleteComments, fetchEditeComments} from "../../API/post";
import {useDispatch, useSelector} from "react-redux";
import imageU from './../../image/pen-solid.svg'


export const Index = () => {

    const {id} = useParams()
    const [comment, setComment] = useState()
    const [isEditing, setEditing] = useState(false)
    const [titleID, setTitleID] = useState('')
    const [body, setToBody] = useState({
        text: comment,
        id: id
    })
    const dispatch = useDispatch()

    const {comments} = useSelector(state => state.posts)
    const {data} = useSelector(state => state.auth)
    const idUser = useSelector(state => state.auth.data?._id)

    const onSubmit = async () => {
        if (isEditing) {
            let body = {
                id: titleID,
                text: comment
            }
            dispatch(fetchEditeComments(body))
            dispatch(fetchAllComments())
            setComment('')
            return setEditing(false)
        }
        if(!isEditing){
            dispatch(fetchComment({text: comment, id: id}))
            dispatch(fetchAllComments())
            setComment('')
        }
        dispatch(fetchAllComments())
    }

    const deleteComment = async (e) => {
        let title = e.target.title.split(',')
        const {data} = await title[1] === idUser
            ? dispatch(fetchDeleteComments(title[0]))
            : ''
    }

    const editComment = async (e) => {
        let title = e.target.title.split(',')
        if (title[1] === idUser) {
            setTitleID(title[0])
            setEditing(true)
            setComment(title[2])
        }
    }

    return (
        <>
            <div>
                {
                    comments?.items?.map((obj, index) => obj.postId === id ? (<div key={index} className={s.box1}>
                            <div className={s.box2}>
                                <img className={s.img}
                                     src={obj?.user?.avatarUrl ? obj.user.avatarUrl : 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='}/>
                                <div className={s.name}>
                                    <span>{obj?.user?.fullName}</span>
                                    <p className={s.text}>{obj.text}</p>
                                </div>
                            </div>
                            <div>
                                <span><img onClick={editComment} title={`${obj?._id},${obj?.user?._id},${obj?.text}`}
                                           className={s.edit} src={imageU}/></span>
                                <span className={s.delete} onClick={deleteComment}
                                      title={`${obj?._id},${obj?.user?._id}`}>X</span>
                                <span
                                    className={s.spanClock + ' ' + s.spanClockSize}>{obj.updatedAt.substring(0, 10)}</span>
                                <span className={s.spanClockSize}>{obj.updatedAt.substring(11, 19)}</span>
                            </div>
                        </div>)
                        : '')
                }
            </div>
            <div className={s.root}>
                <Avatar
                    classes={{root: s.avatar}}
                    src={data?.avatarUrl ? data.avatarUrl : "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="}
                />
                <div className={s.form}>
                    <TextField label={isEditing ? '' : "Write comment"} variant="outlined"
                               maxRows={10} multiline value={comment} onChange={(e) => setComment(e.target.value)}
                               fullWidth
                    />
                    <Button onClick={onSubmit} variant="contained">{isEditing ? 'Edit' : 'Send'}</Button>
                </div>
            </div>
        </>
    );
};
