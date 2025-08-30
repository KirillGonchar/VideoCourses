import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../types/course";
import { getCourses } from "../../api/mockApi";

interface CoursesState {
  allCourses: Course[];
  purchasedCourses: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  allCourses: [],
  purchasedCourses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      return await getCourses();
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch courses");
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    purchaseCourse(state, action: PayloadAction<string>) {
      if (!state.purchasedCourses.includes(action.payload)) {
        state.purchasedCourses.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { purchaseCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
