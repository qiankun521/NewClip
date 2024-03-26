import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
//存进state状态
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("rootState", serializedState);
  } catch (e) {
    console.warn(e);
  }
}
//提取state状态
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("rootState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
const preloadedState = loadFromLocalStorage();
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;