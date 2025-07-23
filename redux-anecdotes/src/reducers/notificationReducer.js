import { createSlice } from '@reduxjs/toolkit'

const initialState = 'This is a NOTIFICATION'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
})

export default notificationSlice.reducer
