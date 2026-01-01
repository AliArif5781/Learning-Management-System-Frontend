import { api } from "@/api/axios";
import type { AuthUser, Login, Signup, TokenResponse } from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const signupUserThunk = createAsyncThunk(
  "auth/signup",
  async (
    {
      firstName,
      lastName,
      email,
      password,
      mediaType,
      mediaUrl,
      thumbnailUrl,
    }: Signup,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        mediaType,
        mediaUrl,
        thumbnailUrl,
      });

      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });

      console.log(response.data, "REGISTER USER");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/signin",
  async ({ email, password }: Login, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

export const fetchProfileThunk = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch user");
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/auth/logout");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Logout Failed");
    }
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async (
    {
      firstName,
      lastName,
      email,
      profession,
      Education,
      techStack,
      country,
    }: AuthUser,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch("/user/updateProfile", {
        firstName,
        lastName,
        email,
        profession,
        Education,
        techStack,
        country,
      });
      toast.success("User Profile Updated Successfully", {
        duration: 2000,
        position: "top-center",
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);
