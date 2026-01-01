import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  signupUserThunk,
} from "./user.thunk";
import type { AuthUser } from "@/types/type";

interface UserState {
  user: AuthUser | null;
  accessToken: string | null;
  loading: {
    signInLoading: boolean;
    signUpLoading: boolean;
    getPRofileLoading: boolean;
    logoutLoading: boolean;
  };
  error: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  loading: {
    signInLoading: false,
    signUpLoading: false,
    getPRofileLoading: false,
    logoutLoading: false,
  },
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logout(state) {
    //   state.user = null;
    //   state.token = null;
    //   localStorage.removeItem("token");
    // },

    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // SignIn
      .addCase(loginUserThunk.pending, (state) => {
        state.loading.signInLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.loading.signInLoading = false;
        // state.user = action.payload.login;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading.signInLoading = false;
        state.error = (action.payload as string) ?? "SignIn Failed";
      })

      // Signup
      .addCase(signupUserThunk.pending, (state) => {
        state.loading.signUpLoading = true;
        state.error = null;
      })
      .addCase(signupUserThunk.fulfilled, (state) => {
        state.loading.signUpLoading = false;
        // state.user = action.payload.user;
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.loading.signUpLoading = false;
        state.error = (action.payload as string) ?? "Sign up  Failed";
      })

      // get user profile data
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading.getPRofileLoading = true;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading.getPRofileLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state) => {
        state.loading.getPRofileLoading = false;
        state.user = null;
      })

      // logout
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading.logoutLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading.logoutLoading = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.loading.logoutLoading = false;
        state.user = null;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
