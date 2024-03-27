# NewClip

## 项目概述

NewClip 是一款基于七牛云存储和七牛相关视频产品（如视频截帧等）开发的优质短视频网站。我们提供一站式的短视频上传、观看和分享体验。

[在线接口文档](https://apifox.com/apidoc/shared-20684cbc-1443-4521-b7cf-10aa0d1b8b23)：https://apifox.com/apidoc/shared-20684cbc-1443-4521-b7cf-10aa0d1b8b23/

[项目线上地址](https://www.newclip.cn/)：https://www.newclip.cn/

[后端作者主页](https://github.com/chenxi393/)：https://github.com/chenxi393/

[后端仓库地址](https://github.com/chenxi393/DikTok/)：https://github.com/chenxi393/DikTok/

## 前端安装和运行

首先，你需要在本地安装 Node.js (v16.x 或更高版本)和相应的 npm 包管理工具。你可以在[Node.js 官网](https://nodejs.org/) 找到相关安装软件。

一旦 Node.js 和 npm 安装完毕，通过以下步骤启动我们的项目：

1. 克隆本仓库到你的本地存储位置。
2. 在项目文件夹以管理员权限运行终端，输入以下命令安装所需依赖：

```bash
npm install
```

3. 输入以下命令启动开发环境：

```bash
npm start
```

接下来，网页会自动导向`http://localhost:3000`，你可以在上面看到我们的网页应用。

## 前端代码结构

以下是我们前端项目的核心文件和文件夹：

- `public/`：公共资源，如 HTML 文件和图标。
- `src/`：所有源代码均在此文件夹内。
  - `assets/`：包括我们的图像，样式表等静态资源文件。
  - `components/`：此文件夹收纳我们所有的 React 组件。
    - `page/`：页面级别的 React 组件。
  - `redux/`：Redux 相关文件归类于此。
    - `actions/`：所有 Redux 动作（action）。
    - `reducers/`：所有 Redux 规则（reducer）。
  - `utils/`：此处有我们所有的工具文件和请求接口文件，这些文件被其他组件及函数广泛调用。

## 开发文档

详情请见：[前端开发文档](Docs/前端开发文档.md)

## 贡献指南

我们欢迎各种形式的贡献。如果你在使用过程中遇到问题，或者你有优化的建议，欢迎通过 Issue 方式告知我们。或者，你也可以通过 Pull Request 向我们提交你的代码。

## 团队与分工

- qiankun51：负责了整个前端界面的开发工作。
- [chenxi393](https://github.com/chenxi393/)：全权负责了后端相关的开发工作。