import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return `you voted '${action.payload}'`
    },
    hideNotification(state, action) {
      return ''
    },
  },
})

export const { showNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer
