import { createStore, applyMiddleware } from "redux";
import reducers from "./ducks";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["navigation"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(persistedReducer, applyMiddleware(logger));
let persistor = persistStore(store);

export { store, persistor };
