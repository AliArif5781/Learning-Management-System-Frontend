import { api } from "@/api/axios";
import type { AuthUser, CreateCourse, likeUser } from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCoursesThunk = createAsyncThunk(
  "course/getAllCourses",
  async (
    { limit, offset }: { limit: number; offset: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/courses/getAllCourses", {
        params: { limit, offset },
      });
      console.log(response.data, "getAllCoursesThunk");
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Error while Fetching Courses"
      );
    }
  }
);

export const getCourseByIdThunk = createAsyncThunk(
  "course/id",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      // console.log(response.data, "getCourseByIdThunk");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load course"
      );
    }
  }
);

export const DeleteCourseThunk = createAsyncThunk(
  "delete/id",
  async (courseId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/courses/${courseId}`);
      return courseId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete course"
      );
    }
  }
);

export const createCourseThunk = createAsyncThunk(
  "create/course",
  async (
    {
      name,
      description,
      level,
      price,
      timeToRead,
      mediaUrl,
      mediaType,
      thumbnailUrl,
    }: CreateCourse,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/courses", {
        name,
        description,
        level,
        price,
        timeToRead,
        mediaUrl,
        mediaType,
        thumbnailUrl,
      });
      console.log(response.data, "createCourseThunk");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load course"
      );
    }
  }
);

export const createCommentThunk = createAsyncThunk(
  "course/comment",
  async (
    { id, comment }: { id: string; comment: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/courses/${id}/userComment`, {
        comment,
      });
      console.log(response.data, "createCommentThunk");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add cpmment"
      );
    }
  }
);

export const courseLikeThunk = createAsyncThunk(
  "course/userLike",
  async ({ likeUser, commentId }: likeUser, { rejectWithValue }) => {
    try {
      const response = await api.post(`/courses/userLikes`, {
        likeUser,
        commentId,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to like Post."
      );
    }
  }
);
