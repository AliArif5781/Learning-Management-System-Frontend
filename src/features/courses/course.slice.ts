import { createSlice } from "@reduxjs/toolkit";

import type { CourseState, Course } from "@/types/type";
import {
  courseLikeThunk,
  createCommentThunk,
  DeleteCourseThunk,
  getAllCoursesThunk,
  getCourseByIdThunk,
} from "./course.thunk";

const initialState: CourseState = {
  item: [],
  selectedCourse: null,
  pagination: {
    limit: 5,
    offset: 0,
    total: 0,
    hasMore: true,
  },
  deleteCourse: null,
  loading: {
    titleLoading: false,
    descriptionLoading: false,
    priceLoading: false,
    levelLoading: false,
    loadingSelectedCourse: false,
    deleteLoading: false,
    commentLoading: false,
    likeLoading: false,
  },
  error: {
    error: null,
    errorSelectedCourse: null,
    errorDeletedCourse: null,
    commentError: null,
    likeError: null,
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourses(state) {
      state.item = [];
      state.pagination.offset = 0;
      state.pagination.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllCourses
      .addCase(getAllCoursesThunk.pending, (state) => {
        state.loading.titleLoading = true;
        state.loading.descriptionLoading = true;
        state.loading.priceLoading = true;
        state.loading.levelLoading = true;

        state.error.error = null;
      })
      .addCase(getAllCoursesThunk.fulfilled, (state, action) => {
        state.loading.titleLoading = false;
        state.loading.descriptionLoading = false;
        state.loading.priceLoading = false;
        state.loading.levelLoading = false;

        state.item.push(...action.payload.data);

        state.pagination.total = action.payload.meta.total;
        state.pagination.hasMore = action.payload.meta.hasMore;
        state.pagination.offset += state.pagination.limit;
      })

      .addCase(getAllCoursesThunk.rejected, (state, action) => {
        state.loading.titleLoading = false;
        state.loading.descriptionLoading = false;
        state.loading.priceLoading = false;
        state.loading.levelLoading = false;
        state.error.error =
          (action.payload as string) ?? "Courses Are Not Found";
      })

      //   get click course.
      .addCase(getCourseByIdThunk.pending, (state) => {
        state.loading.loadingSelectedCourse = true;
        state.error.errorSelectedCourse = null;
      })
      .addCase(getCourseByIdThunk.fulfilled, (state, action) => {
        state.loading.loadingSelectedCourse = false;
        state.selectedCourse = action.payload;
        // console.log(action.payload, "GET SELECTED COURSE");
      })
      .addCase(getCourseByIdThunk.rejected, (state, action) => {
        state.loading.loadingSelectedCourse = false;
        state.error.errorSelectedCourse =
          (action.payload as string) ?? "Failed to load course";
      })

      // delete course
      .addCase(DeleteCourseThunk.pending, (state) => {
        state.loading.deleteLoading = true;
        state.error.errorDeletedCourse = null;
      })
      .addCase(DeleteCourseThunk.fulfilled, (state, action) => {
        state.loading.deleteLoading = false;
        const deleteId = action.payload;
        state.item = state.item.filter((course) => course._id !== deleteId);

        // console.log(action.payload, "GET SELECTED COURSE");
      })
      .addCase(DeleteCourseThunk.rejected, (state, action) => {
        state.loading.deleteLoading = false;

        state.error.errorDeletedCourse =
          (action.payload as string) ?? "Failed to load course";
      })

      // create user comments on course
      .addCase(createCommentThunk.pending, (state) => {
        state.loading.commentLoading = true;
        state.error.commentError = null;
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.loading.commentLoading = false;
        if (state.selectedCourse) {
          state.selectedCourse.comment = [
            ...(state.selectedCourse.comment || []),
            action.payload,
          ];
        }
      })
      .addCase(createCommentThunk.rejected, (state, action) => {
        state.loading.commentLoading = false;

        state.error.commentError =
          (action.payload as string) ?? "Failed to send comment";
      })

      // user like comments on course
      .addCase(courseLikeThunk.pending, (state) => {
        state.loading.likeLoading = true;
        state.error.commentError = null;
      })
      .addCase(courseLikeThunk.fulfilled, (state, action) => {
        const updatedComment = action.payload.commentLike;

        if (state.selectedCourse && state.selectedCourse.comment) {
          state.selectedCourse.comment = state.selectedCourse.comment.map((c) =>
            c._id === updatedComment._id ? updatedComment : c
          );
        }
      })

      .addCase(courseLikeThunk.rejected, (state, action) => {
        state.loading.likeLoading = false;

        state.error.likeError =
          (action.payload as string) ?? "Failed to like comment";
      });
  },
});

export const { resetCourses } = courseSlice.actions;
export default courseSlice.reducer;
