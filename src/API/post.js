import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../API";

// request post

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await instance.get("/posts");
  return data;
});

export const fetchIdPosts = createAsyncThunk("posts/fetchIdPosts", async (id) => {
        const { data } = await instance.get(`/posts/${id}`);
        return data;
    }
);

export const fetchPopulatePosts = createAsyncThunk("posts/fetchPopulatePosts", async () => {
        const { data } = await instance.get("/posts/all/populate");
        return data;
    }
);

export const fetchLikePosts = createAsyncThunk("posts/fetchLikePosts", async ({ id, act, like }) => {
        const { data } = await instance.post(`/posts/like/${id}`, {act: act, like: like,});
        return data;
    }
);

export const fetchDeletePost = createAsyncThunk("posts/fetchDeletePost", async (id) => {
        const { data } = instance.delete(`/posts/${id}`);
        return data;
    }
);


// request comment

export const fetchComment = createAsyncThunk("posts/fetchComment", async ({ text, id }) => {
    const { data } = await instance.post(`/posts/comment/${id}`, {text: text,});
    return data;
  }
);

export const fetchAllComments = createAsyncThunk("posts/fetchAllComments", async () => {
    const { data } = await instance.get("/posts/comments/all");
    return data;
  }
);

export const fetchDeleteComments = createAsyncThunk("posts/fetchDeleteComments", async (id) => {
        const { data } = instance.delete(`/posts/comment/${id}`);
        return data;
    }
);

export const fetchEditeComments = createAsyncThunk("posts/fetchEditeComments", async (editBody) => {
        const { data } = instance.patch(`/posts/comment/${editBody.id}`, {text: editBody.text,});
        return data;
    }
);

// request tags

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await instance.get("/posts/posts/tags");
  return data;
});

export const fetchOneTags = createAsyncThunk("posts/fetchOneTags", async (tags) => {
    const { data } = await instance.get(`/posts/posts/tags/${tags}`);
    return data;
  }
);
