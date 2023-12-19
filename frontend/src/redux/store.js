import {configureStore} from '@reduxjs/toolkit';
import rootReducer from "./reducers";
import {persistoreReducer,persistStore} from 'redux-persist';

const persistConfig = {
    key: "storeState",
    storage: localStorage
};
const persisitReducer=persistoreReducer(persistConfig,rootReducer);
const store = configureStore({
    reducer: persisitReducer,
});
const persistor=persistStore(store);
export {store,persistor};