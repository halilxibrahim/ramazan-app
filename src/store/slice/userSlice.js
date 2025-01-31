// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    quranProgress: 0, // Örnek alan
    prayerNotificationsEnabled: true,
  },
  reducers: {
    setQuranProgress(state, action) {
      state.quranProgress = action.payload;
    },
    togglePrayerNotifications(state) {
      state.prayerNotificationsEnabled = !state.prayerNotificationsEnabled;
    },
  },
});

export const { setQuranProgress, togglePrayerNotifications } = userSlice.actions;
export default userSlice.reducer;
