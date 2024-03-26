import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
/**
 * 根元素
 * @typedef {Object} Root
 * @property {function} render - 渲染函数
 */
/**
 * 创建根元素
 * @function
 * @param {HTMLElement} container - 包含根元素的容器
 * @returns {Root} - 根元素对象
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    <Analytics />
  </Provider>
);

reportWebVitals();
