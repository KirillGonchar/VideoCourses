import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice.ts";
import videoReducer from "./slices/videoSlice.ts";
import userReducer from "./slices/userSlice.ts";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    video: videoReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
