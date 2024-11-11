import { configureStore } from '@reduxjs/toolkit'
import snippetsReducer from './snippets/snippetsSlice'

export const store = configureStore({
  reducer: {
    snippets: snippetsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})


export type RootState = ReturnType<typeof store.getState>;