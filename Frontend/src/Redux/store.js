import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './userSlice'
import adminReducer from './adminSlice'

const persist={
    key:'root',
    version:1,
    storage
}
const rootReducer=combineReducers({
    user:persistReducer(persist,userReducer),
    admin:persistReducer(persist,adminReducer)
})
const persistedReducer=persistReducer(persist,rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})

const persistor = persistStore(store);

export { store, persistor };