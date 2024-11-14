import { configureStore } from '@reduxjs/toolkit'
import snippetsReducer from './snippets/snippetsSlice'
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  snippets: snippetsReducer
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;