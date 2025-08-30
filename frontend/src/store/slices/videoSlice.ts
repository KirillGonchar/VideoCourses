import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  currentVideoId: string | null;
}

const initialState: VideoState = {
  currentVideoId: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    playVideo(state, action: PayloadAction<string | null>) {
      state.currentVideoId = action.payload;
    },
  },
});

export const { playVideo } = videoSlice.actions;
export default videoSlice.reducer;
