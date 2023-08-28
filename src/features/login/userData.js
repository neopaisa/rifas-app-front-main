import { createSlice } from '@reduxjs/toolkit';

export const userData = createSlice({
  name: 'user',
  initialState: {
    value: {},
  },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload; // Actualiza la información del usuario en el estado
    },
  },
});

export const { setUserData } = userData.actions;
export default userData.reducer;
