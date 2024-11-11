import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from '../redux/slices/userSlice';
import signupSlice from '../redux/slices/signupSlice';
import authSlice from '../redux/slices/authSlice';


const persistConfig = {
  key: "root",
  storage,
};

const rootReducers = combineReducers({
    user: userSlice,   
    signup: signupSlice,
    auth: authSlice,

});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);


