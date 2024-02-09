// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authreducer from "./authSlice";
// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";

// const rootreducer = combineReducers({ auth: authreducer }); // help for multiple readucers in the same

// const persistConfig = {
//   // the persist will store the data in local storage of the browser when login in
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistreducer = persistReducer(persistConfig, rootreducer);

// const store = configureStore({
//   reducer: {
//     persistreducer,
//   },
// });

// export default store;

// export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ auth: userReducer });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
