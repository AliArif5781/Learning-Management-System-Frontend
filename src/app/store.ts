import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "@/features/courses/course.slice";
import userReducer from "@/features/user/user.slice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist ONLY course data (not loading/errors)
const coursePersistConfig = {
  key: "course",
  storage,
  whitelist: ["item", "pagination", "selectedCourse"],
};

const persistedCourseReducer = persistReducer(
  coursePersistConfig,
  courseReducer
);

export const store = configureStore({
  reducer: {
    course: persistedCourseReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
