import { configureStore } from '@reduxjs/toolkit'
import userData from '../features/login/userData'

export default 
configureStore({
  reducer: {
    user: userData 
  },
})