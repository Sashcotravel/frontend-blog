import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import {SideBlock} from "./SideBlock";
import {Link} from "react-router-dom";
import {fetchOneTags, fetchPopulatePosts} from "../API/post";
import {useDispatch} from "react-redux";

export const TagsBlock = ({items, isLoading = true}) => {

    const dispatch = useDispatch()

    const click = (e) => {
        dispatch(fetchOneTags(e.target.outerText))
    }

    return (
        <SideBlock title="Tags">
            <List>
                {(isLoading ? [...Array(5)] : items).map((name, i) => (
                    <>
                        <Link key={i} style={{textDecoration: "none", color: "black"}}
                              to={`/tags`} onClick={click} >
                            <ListItem key={i} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TagIcon/>
                                    </ListItemIcon>
                                    {isLoading ? (
                                        <Skeleton width={100}/>
                                    ) : (
                                        <ListItemText primary={name}/>
                                    )}
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </>
                ))}
            </List>
        </SideBlock>
    );
};
