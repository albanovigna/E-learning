import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { reduxBatch } from "@manaflair/redux-batch";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: false,
  enhancers: [reduxBatch],
});

const persistor = persistStore(store);

export { store, persistor };