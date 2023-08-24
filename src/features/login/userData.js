import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
  name: 'user',
  initialState: {
    value: {},
  },
})

export default userData.reducer