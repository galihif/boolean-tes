import rootReducer from './reducer'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer, Persistor} from 'redux-persist'
import { createStore } from 'redux'

const persistedReducer = persistReducer({key: 'root', storage}, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)