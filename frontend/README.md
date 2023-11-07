# 项目名称

NewClip

## 项目概述

本项目是一个基于React的Web端短视频应用，提供了一站式的短视频观看和分享体验。用户可以在这个平台上浏览各种类型的短视频，包括音乐、体育、游戏等多个频道。我们的视频播放器支持播放、暂停、进度条拖拽和音量控制等功能，用户可以通过键盘上下键、鼠标滑动或手指滑动来切换视频。

此外，我们还提供了完善的账户系统，用户可以注册登录，点赞视频、关注其他用户、搜索视频等。我们的私信功能允许用户与互相关注的好友聊天，分享视频，甚至内置了一个语言大模型好友，为用户提供更丰富的互动体验。

用户还可以自由上传视频，自定义视频的标题和分类，分享自己的创作。我们的评论功能允许用户在视频下方自由回复，与其他用户交流观点。用户主页功能可以让用户查看自己发布和点赞的视频，展示自己。

最后，我们的搜索功能允许用户通过关键词搜索视频，快速找到自己感兴趣的内容。我们致力于提供一个用户友好、功能全面的短视频平台，让每个人都可以在这里发现、分享和创作。

## 安装和设置

首先，你需要安装Node.js和npm。你可以从[Node.js官网](https://nodejs.org/)下载最新的稳定版本。安装Node.js后，npm也会自动安装。

然后，你可以克隆这个仓库，然后在项目目录中运行以下命令来安装依赖：

```bash
npm install
```

然后，你可以运行以下命令来启动开发服务器：

```bash
npm start
```

这将在你的默认浏览器中打开应用。默认的开发服务器地址是`http://localhost:3000`。

## 代码结构

项目的主要代码文件和目录如下：

- `public/`：包含公共资源，如HTML文件和图标。
- `src/`：包含所有的源代码。
  - `assets/`：包含静态资源，如图片和样式文件。
  - `components/`：包含所有的React组件。
    - `page/`：包含页面级别的React组件。
  - `redux/`：包含Redux相关的文件。
    - `actions/`：包含所有的Redux action。
    - `reducers/`：包含所有的Redux reducer。
  - `utils/`：包含实用函数和工具。

## API文档

## Modules

<dl>
<dt><a href="#module_CommentArea">CommentArea</a></dt>
<dd><p>评论区组件</p>
</dd>
<dt><a href="#module_Controls">Controls</a></dt>
<dd><p>视频播放器组件</p>
</dd>
<dt><a href="#module_Describe">Describe</a></dt>
<dd><p>视频描述组件</p>
</dd>
<dt><a href="#module_FollowPopover">FollowPopover</a></dt>
<dd><p>用于展示关注以及粉丝列表的组件</p>
</dd>
<dt><a href="#module_Header">Header</a></dt>
<dd><p>Header组件，包含导航栏，搜索框，上传，私信，登录按钮或个人信息头像</p>
</dd>
<dt><a href="#module_MessagePopover">MessagePopover</a></dt>
<dd><p>消息弹窗组件</p>
</dd>
<dt><a href="#module_Mainpage">Mainpage</a></dt>
<dd><p>Mainpage.js是一个React组件，用于渲染主页。它包含了三个视频swiper，可以通过滑动或按键来切换视频swiper，通过更改swiper实际加载的视频达到改变视频的效果。同时，它还提供了音量控制、静音、评论区等功能。</p>
</dd>
<dt><a href="#module_Page404">Page404</a></dt>
<dd><p>页面404组件</p>
</dd>
<dt><a href="#module_Personalpage">Personalpage</a></dt>
<dd><p>个人主页及用户主页组件</p>
</dd>
<dt><a href="#module_Searchpage">Searchpage</a></dt>
<dd><p>搜索页面组件</p>
</dd>
<dt><a href="#module_PersonalPopover">PersonalPopover</a></dt>
<dd><p>个人弹出框组件</p>
</dd>
<dt><a href="#module_SharePopover">SharePopover</a></dt>
<dd><p>分享弹窗组件</p>
</dd>
<dt><a href="#module_Sidebar">Sidebar</a></dt>
<dd><p>侧边栏组件</p>
</dd>
<dt><a href="#module_SingleComment">SingleComment</a></dt>
<dd><p>单个评论组件</p>
</dd>
<dt><a href="#module_SingleVideo">SingleVideo</a></dt>
<dd><p>单个视频组件</p>
</dd>
<dt><a href="#module_UploadPopover">UploadPopover</a></dt>
<dd><p>上传弹出框组件</p>
</dd>
<dt><a href="#module_Video">Video</a></dt>
<dd><p>视频组件</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#loginRequest">loginRequest</a> ⇒ <code>Object</code></dt>
<dd><p>登录请求的动作创建器</p>
</dd>
<dt><a href="#loginSuccess">loginSuccess</a> ⇒ <code>Object</code></dt>
<dd><p>登录成功的动作创建器</p>
</dd>
<dt><a href="#loginFailure">loginFailure</a> ⇒ <code>Object</code></dt>
<dd><p>登录失败的动作创建器</p>
</dd>
<dt><a href="#logOut">logOut</a> ⇒ <code>Object</code></dt>
<dd><p>注销的动作创建器</p>
</dd>
<dt><a href="#registerRequest">registerRequest</a> ⇒ <code>Object</code></dt>
<dd><p>注册请求的动作创建器</p>
</dd>
<dt><a href="#registerSuccess">registerSuccess</a> ⇒ <code>Object</code></dt>
<dd><p>注册成功的动作创建器</p>
</dd>
<dt><a href="#registerFailure">registerFailure</a> ⇒ <code>Object</code></dt>
<dd><p>注册失败的动作创建器</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#App">App()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>应用程序入口组件</p>
</dd>
<dt><a href="#root">root(container)</a> ⇒ <code><a href="#Root">Root</a></code></dt>
<dd><p>创建根元素</p>
</dd>
<dt><a href="#loginRegisterReducer">loginRegisterReducer(state, action)</a> ⇒ <code>Object</code></dt>
<dd><p>处理登录和注册的 reducer 函数</p>
</dd>
<dt><a href="#formatSeconds">formatSeconds(seconds)</a> ⇒ <code>string</code></dt>
<dd><p>将秒数格式化为 mm:ss 的形式</p>
</dd>
<dt><a href="#getComments">getComments(id, [token])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>从服务器获取指定视频的评论列表</p>
</dd>
<dt><a href="#getFollow">getFollow(id, [token])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>从服务器获取用户关注列表</p>
</dd>
<dt><a href="#getFollower">getFollower(id, [token])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>获取用户的粉丝列表</p>
</dd>
<dt><a href="#getFriendList">getFriendList(user_id, token)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>获取好友列表</p>
</dd>
<dt><a href="#getMessages">getMessages(token, to_user_id, [pre_msg_time])</a> ⇒ <code>Promise</code></dt>
<dd><p>从服务器获取聊天消息</p>
</dd>
<dt><a href="#sendMessage">sendMessage(token, to_user_id, content, [action_type])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>发送消息</p>
</dd>
<dt><a href="#getPersonalInfo">getPersonalInfo(user_id, [token])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>获取用户个人信息</p>
</dd>
<dt><a href="#getSearchItem">getSearchItem(keyword, [token])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>从服务器获取包含指定关键字的视频列表</p>
</dd>
<dt><a href="#login">login(username, password)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>登录函数</p>
</dd>
<dt><a href="#register">register(username, password)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>注册用户</p>
</dd>
<dt><a href="#postComment">postComment(token, id, action_type, text)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>向服务器发送评论请求</p>
</dd>
<dt><a href="#postFollow">postFollow(id, [token])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>发送关注请求</p>
</dd>
<dt><a href="#postCancelFollow">postCancelFollow(id, [token])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>发送取消关注请求</p>
</dd>
<dt><a href="#postLike">postLike(video_id, [token])</a> ⇒ <code>Promise</code></dt>
<dd><p>向服务器发送点赞请求</p>
</dd>
<dt><a href="#postCancelLike">postCancelLike(video_id, [token])</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>取消点赞视频</p>
</dd>
<dt><a href="#transformTime">transformTime(timestamp)</a> ⇒ <code>string</code></dt>
<dd><p>将时间戳转换为格式化的时间字符串</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Root">Root</a> : <code>Object</code></dt>
<dd><p>根元素</p>
</dd>
</dl>

<a name="module_CommentArea"></a>

## CommentArea
评论区组件


* [CommentArea](#module_CommentArea)
    * [~CommentArea(props)](#module_CommentArea..CommentArea) ⇒ <code>JSX.Element</code>
        * [~handleSendMessage()](#module_CommentArea..CommentArea..handleSendMessage)

<a name="module_CommentArea..CommentArea"></a>

### CommentArea~CommentArea(props) ⇒ <code>JSX.Element</code>
评论区组件

**Kind**: inner method of [<code>CommentArea</code>](#module_CommentArea)  
**Returns**: <code>JSX.Element</code> - - 评论区组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.haveComments | <code>boolean</code> | 是否获取到评论 |
| props.comments | <code>Array</code> | 评论列表 |
| props.video | <code>Object</code> | 视频信息 |
| props.handleComments | <code>function</code> | 关闭评论区的回调函数 |
| props.update | <code>function</code> | 更新评论列表的回调函数 |
| props.handleModal | <code>function</code> | 打开登录/注册模态框的回调函数 |

<a name="module_CommentArea..CommentArea..handleSendMessage"></a>

#### CommentArea~handleSendMessage()
发送评论的回调函数

**Kind**: inner method of [<code>CommentArea</code>](#module_CommentArea..CommentArea)  
<a name="module_Controls"></a>

## Controls
视频播放器组件

<a name="module_Controls..Controls"></a>

### Controls~Controls(props) ⇒ <code>JSX.Element</code>
控制视频播放的组件

**Kind**: inner method of [<code>Controls</code>](#module_Controls)  
**Returns**: <code>JSX.Element</code> - 控制视频播放的组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件的属性 |
| props.videoRef | <code>Object</code> | 正在播放的视频的引用 |
| props.isPlaying | <code>boolean</code> | 视频是否正在播放 |
| props.handlePlaying | <code>function</code> | 处理视频播放/暂停的函数 |
| props.played | <code>number</code> | 视频已播放的进度 |
| props.handlePlayed | <code>function</code> | 处理视频播放进度的函数 |
| props.playedSeconds | <code>number</code> | 视频已播放的秒数 |
| props.ismuted | <code>boolean</code> | 视频是否静音 |
| props.handleMuted | <code>function</code> | 处理视频静音/取消静音的函数 |
| props.volume | <code>number</code> | 视频的音量 |
| props.handleVolume | <code>function</code> | 处理视频音量的函数 |

<a name="module_Describe"></a>

## Describe
视频描述组件

<a name="module_Describe..Describe"></a>

### Describe~Describe(props) ⇒ <code>JSX.Element</code>
视频描述组件，用于展示用户名称和视频标题

**Kind**: inner method of [<code>Describe</code>](#module_Describe)  
**Returns**: <code>JSX.Element</code> - 描述组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.name | <code>string</code> | 用户名 |
| props.title | <code>string</code> | 标题 |

<a name="module_FollowPopover"></a>

## FollowPopover
用于展示关注以及粉丝列表的组件

<a name="module_FollowPopover..FollowPopover"></a>

### FollowPopover~FollowPopover(props) ⇒ <code>JSX.Element</code>
FollowPopover组件

**Kind**: inner method of [<code>FollowPopover</code>](#module_FollowPopover)  
**Returns**: <code>JSX.Element</code> - FollowPopover组件的React元素  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.info | <code>Array</code> | 关注或者粉丝列表信息 |

<a name="module_Header"></a>

## Header
Header组件，包含导航栏，搜索框，上传，私信，登录按钮或个人信息头像


* [Header](#module_Header)
    * [~Header(props)](#module_Header..Header) ⇒ <code>JSX.Element</code>
        * [~logout](#module_Header..Header..logout) : <code>boolean</code>
        * [~loginWaiting](#module_Header..Header..loginWaiting) : <code>boolean</code>
        * [~registerWaiting](#module_Header..Header..registerWaiting) : <code>boolean</code>
        * [~id](#module_Header..Header..id) : <code>string</code>
        * [~token](#module_Header..Header..token) : <code>string</code>
        * [~navigate](#module_Header..Header..navigate) : <code>function</code>
        * [~dispatch](#module_Header..Header..dispatch) : <code>function</code>
        * [~onFinishLogin(values)](#module_Header..Header..onFinishLogin)
        * [~onFinishRegister(values)](#module_Header..Header..onFinishRegister)

<a name="module_Header..Header"></a>

### Header~Header(props) ⇒ <code>JSX.Element</code>
Header组件

**Kind**: inner method of [<code>Header</code>](#module_Header)  
**Returns**: <code>JSX.Element</code> - Header组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.visible | <code>boolean</code> | 登录modal是否可见 |
| props.handleModal | <code>function</code> | 登录modal的显示/隐藏函数 |
| props.setChooseClass | <code>function</code> | 设置主页视频的类别 |
| props.chooseClass | <code>string</code> | 视频选择的类别 |


* [~Header(props)](#module_Header..Header) ⇒ <code>JSX.Element</code>
    * [~logout](#module_Header..Header..logout) : <code>boolean</code>
    * [~loginWaiting](#module_Header..Header..loginWaiting) : <code>boolean</code>
    * [~registerWaiting](#module_Header..Header..registerWaiting) : <code>boolean</code>
    * [~id](#module_Header..Header..id) : <code>string</code>
    * [~token](#module_Header..Header..token) : <code>string</code>
    * [~navigate](#module_Header..Header..navigate) : <code>function</code>
    * [~dispatch](#module_Header..Header..dispatch) : <code>function</code>
    * [~onFinishLogin(values)](#module_Header..Header..onFinishLogin)
    * [~onFinishRegister(values)](#module_Header..Header..onFinishRegister)

<a name="module_Header..Header..logout"></a>

#### Header~logout : <code>boolean</code>
是否登出

**Kind**: inner constant of [<code>Header</code>](#module_Header..Header)  
<a name="module_Header..Header..loginWaiting"></a>

#### Header~loginWaiting : <code>boolean</code>
是否正在登录

**Kind**: inner constant of [<code>Header</code>](#module_Header..Header)  
<a name="module_Header..Header..registerWaiting"></a>

#### Header~registerWaiting : <code>boolean</code>
是否正在注册

**Kind**: inner constant of [<code>Header</code>](#module_Header..Header)  
<a name="module_Header..Header..id"></a>

#### Header~id : <code>string</code>
用户id

**Kind**: inner constant of [<code>Header</code>](#module_Header..Header)  
<a name="module_Header..Header..token"></a>

#### Header~token : <code>string</code>
用户token

**Kind**: inner constant of [<code>Header</code>](#module_Header..Header)  
<a name="module_Header..Header..navigate"></a>

#### Header~navigate : <code>function</code>
路由导航

**Kind**: inner constant of [<code>Header</code>](#module_Header..Header)  
<a name="module_Header..Header..dispatch"></a>

#### Header~dispatch : <code>function</code>
redux dispatch函数

**Kind**: inner constant of [<code>Header</code>](#module_Header..Header)  
<a name="module_Header..Header..onFinishLogin"></a>

#### Header~onFinishLogin(values)
登录表单提交函数

**Kind**: inner method of [<code>Header</code>](#module_Header..Header)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object</code> | 表单值 |
| values.username | <code>string</code> | 用户名 |
| values.password | <code>string</code> | 密码 |

<a name="module_Header..Header..onFinishRegister"></a>

#### Header~onFinishRegister(values)
注册表单提交函数

**Kind**: inner method of [<code>Header</code>](#module_Header..Header)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object</code> | 表单值 |
| values.username | <code>string</code> | 用户名 |
| values.password | <code>string</code> | 密码 |

<a name="module_MessagePopover"></a>

## MessagePopover
消息弹窗组件


* [MessagePopover](#module_MessagePopover)
    * [~MessagePopover(props)](#module_MessagePopover..MessagePopover) ⇒ <code>JSX.Element</code>
        * [~token](#module_MessagePopover..MessagePopover..token) : <code>string</code>
        * [~user_id](#module_MessagePopover..MessagePopover..user_id) : <code>string</code>
        * [~info](#module_MessagePopover..MessagePopover..info) : <code>Object</code> \| <code>undefined</code>
        * [~scrollRef](#module_MessagePopover..MessagePopover..scrollRef) : <code>Object</code>
        * [~handleSendMessage()](#module_MessagePopover..MessagePopover..handleSendMessage)

<a name="module_MessagePopover..MessagePopover"></a>

### MessagePopover~MessagePopover(props) ⇒ <code>JSX.Element</code>
消息弹窗组件

**Kind**: inner method of [<code>MessagePopover</code>](#module_MessagePopover)  
**Returns**: <code>JSX.Element</code> - 消息弹窗组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.handleMessage | <code>function</code> | 关闭消息弹窗的回调函数 |


* [~MessagePopover(props)](#module_MessagePopover..MessagePopover) ⇒ <code>JSX.Element</code>
    * [~token](#module_MessagePopover..MessagePopover..token) : <code>string</code>
    * [~user_id](#module_MessagePopover..MessagePopover..user_id) : <code>string</code>
    * [~info](#module_MessagePopover..MessagePopover..info) : <code>Object</code> \| <code>undefined</code>
    * [~scrollRef](#module_MessagePopover..MessagePopover..scrollRef) : <code>Object</code>
    * [~handleSendMessage()](#module_MessagePopover..MessagePopover..handleSendMessage)

<a name="module_MessagePopover..MessagePopover..token"></a>

#### MessagePopover~token : <code>string</code>
用户登录token

**Kind**: inner constant of [<code>MessagePopover</code>](#module_MessagePopover..MessagePopover)  
<a name="module_MessagePopover..MessagePopover..user_id"></a>

#### MessagePopover~user\_id : <code>string</code>
用户id

**Kind**: inner constant of [<code>MessagePopover</code>](#module_MessagePopover..MessagePopover)  
<a name="module_MessagePopover..MessagePopover..info"></a>

#### MessagePopover~info : <code>Object</code> \| <code>undefined</code>
用户信息

**Kind**: inner constant of [<code>MessagePopover</code>](#module_MessagePopover..MessagePopover)  
<a name="module_MessagePopover..MessagePopover..scrollRef"></a>

#### MessagePopover~scrollRef : <code>Object</code>
消息列表的滚动条

**Kind**: inner constant of [<code>MessagePopover</code>](#module_MessagePopover..MessagePopover)  
<a name="module_MessagePopover..MessagePopover..handleSendMessage"></a>

#### MessagePopover~handleSendMessage()
处理发送消息的函数

**Kind**: inner method of [<code>MessagePopover</code>](#module_MessagePopover..MessagePopover)  
<a name="module_Mainpage"></a>

## Mainpage
Mainpage.js是一个React组件，用于渲染主页。它包含了三个视频swiper，可以通过滑动或按键来切换视频swiper，通过更改swiper实际加载的视频达到改变视频的效果。同时，它还提供了音量控制、静音、评论区等功能。


* [Mainpage](#module_Mainpage)
    * [~Mainpage(props)](#module_Mainpage..Mainpage) ⇒ <code>JSX.Element</code>
        * [~realPrevIndex](#module_Mainpage..Mainpage..realPrevIndex) : <code>Object</code>
        * [~swiperRef](#module_Mainpage..Mainpage..swiperRef) : <code>Object</code>
        * [~trueIndex](#module_Mainpage..Mainpage..trueIndex) : <code>Object</code>
        * [~handleSlideChange(swiper)](#module_Mainpage..Mainpage..handleSlideChange)
        * [~handlePlaying()](#module_Mainpage..Mainpage..handlePlaying)
        * [~handleMuted()](#module_Mainpage..Mainpage..handleMuted)
        * [~handleVolume(state)](#module_Mainpage..Mainpage..handleVolume)
        * [~handleComments()](#module_Mainpage..Mainpage..handleComments)

<a name="module_Mainpage..Mainpage"></a>

### Mainpage~Mainpage(props) ⇒ <code>JSX.Element</code>
主页面组件

**Kind**: inner method of [<code>Mainpage</code>](#module_Mainpage)  
**Returns**: <code>JSX.Element</code> - - 返回主页面组件的JSX元素  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.handleModal | <code>function</code> | 处理登录模态框的函数 |
| props.videos | <code>Array</code> | 视频列表 |
| props.changeVideos | <code>function</code> | 改变本地储存的视频信息的函数 |
| props.updateVideos | <code>function</code> | 动态更新主页面播放视频列表的函数 |


* [~Mainpage(props)](#module_Mainpage..Mainpage) ⇒ <code>JSX.Element</code>
    * [~realPrevIndex](#module_Mainpage..Mainpage..realPrevIndex) : <code>Object</code>
    * [~swiperRef](#module_Mainpage..Mainpage..swiperRef) : <code>Object</code>
    * [~trueIndex](#module_Mainpage..Mainpage..trueIndex) : <code>Object</code>
    * [~handleSlideChange(swiper)](#module_Mainpage..Mainpage..handleSlideChange)
    * [~handlePlaying()](#module_Mainpage..Mainpage..handlePlaying)
    * [~handleMuted()](#module_Mainpage..Mainpage..handleMuted)
    * [~handleVolume(state)](#module_Mainpage..Mainpage..handleVolume)
    * [~handleComments()](#module_Mainpage..Mainpage..handleComments)

<a name="module_Mainpage..Mainpage..realPrevIndex"></a>

#### Mainpage~realPrevIndex : <code>Object</code>
上一次播放视频的swiper的真正index

**Kind**: inner constant of [<code>Mainpage</code>](#module_Mainpage..Mainpage)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| current | <code>number</code> | 上一次播放视频的swiper的indexref |

<a name="module_Mainpage..Mainpage..swiperRef"></a>

#### Mainpage~swiperRef : <code>Object</code>
用于获取swiper的ref

**Kind**: inner constant of [<code>Mainpage</code>](#module_Mainpage..Mainpage)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| current | <code>Object</code> | 当前播放视频的swiper的ref |

<a name="module_Mainpage..Mainpage..trueIndex"></a>

#### Mainpage~trueIndex : <code>Object</code>
用于获取当前swiper的真正index

**Kind**: inner constant of [<code>Mainpage</code>](#module_Mainpage..Mainpage)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| current | <code>number</code> | 当前swiper的真正index |

<a name="module_Mainpage..Mainpage..handleSlideChange"></a>

#### Mainpage~handleSlideChange(swiper)
swiper滑动事件处理函数，判断是上滑还是下滑，更新swiper的实际加载的视频

**Kind**: inner method of [<code>Mainpage</code>](#module_Mainpage..Mainpage)  

| Param | Type | Description |
| --- | --- | --- |
| swiper | <code>Object</code> | swiper对象 |

<a name="module_Mainpage..Mainpage..handlePlaying"></a>

#### Mainpage~handlePlaying()
控制视频播放的函数

**Kind**: inner method of [<code>Mainpage</code>](#module_Mainpage..Mainpage)  
<a name="module_Mainpage..Mainpage..handleMuted"></a>

#### Mainpage~handleMuted()
控制静音的函数

**Kind**: inner method of [<code>Mainpage</code>](#module_Mainpage..Mainpage)  
<a name="module_Mainpage..Mainpage..handleVolume"></a>

#### Mainpage~handleVolume(state)
控制音量的函数

**Kind**: inner method of [<code>Mainpage</code>](#module_Mainpage..Mainpage)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>number</code> | 音量值 |

<a name="module_Mainpage..Mainpage..handleComments"></a>

#### Mainpage~handleComments()
控制评论区显示的函数

**Kind**: inner method of [<code>Mainpage</code>](#module_Mainpage..Mainpage)  
<a name="module_Page404"></a>

## Page404
页面404组件

<a name="module_Page404..Page404"></a>

### Page404~Page404() ⇒ <code>JSX.Element</code>
页面404组件

**Kind**: inner method of [<code>Page404</code>](#module_Page404)  
**Returns**: <code>JSX.Element</code> - 页面404组件  
<a name="module_Personalpage"></a>

## Personalpage
个人主页及用户主页组件


* [Personalpage](#module_Personalpage)
    * [~Personalpage(handleModal)](#module_Personalpage..Personalpage) ⇒ <code>JSX.Element</code>
        * [~user_id](#module_Personalpage..Personalpage..user_id)
        * [~id](#module_Personalpage..Personalpage..id)
        * [~trueId](#module_Personalpage..Personalpage..trueId)
        * [~token](#module_Personalpage..Personalpage..token)
        * [~logout](#module_Personalpage..Personalpage..logout)
        * [~navigate](#module_Personalpage..Personalpage..navigate)
        * [~handleFollow()](#module_Personalpage..Personalpage..handleFollow)
        * [~handleMessage()](#module_Personalpage..Personalpage..handleMessage)
        * [~handleClick(trueIndex)](#module_Personalpage..Personalpage..handleClick)
        * [~handleMuted()](#module_Personalpage..Personalpage..handleMuted)
        * [~handleVolume(state)](#module_Personalpage..Personalpage..handleVolume)
        * [~changeVideos0(trueIndex, newState, isChild, childName)](#module_Personalpage..Personalpage..changeVideos0)
        * [~changeVideos1(trueIndex, newState, isChild, childName)](#module_Personalpage..Personalpage..changeVideos1)
        * [~changeVideos(trueIndex, newState, isChild, childName)](#module_Personalpage..Personalpage..changeVideos)

<a name="module_Personalpage..Personalpage"></a>

### Personalpage~Personalpage(handleModal) ⇒ <code>JSX.Element</code>
个人主页及用户主页组件

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage)  
**Returns**: <code>JSX.Element</code> - 个人主页组件  

| Param | Type | Description |
| --- | --- | --- |
| handleModal | <code>Object</code> | 处理登录注册模态框的函数 |


* [~Personalpage(handleModal)](#module_Personalpage..Personalpage) ⇒ <code>JSX.Element</code>
    * [~user_id](#module_Personalpage..Personalpage..user_id)
    * [~id](#module_Personalpage..Personalpage..id)
    * [~trueId](#module_Personalpage..Personalpage..trueId)
    * [~token](#module_Personalpage..Personalpage..token)
    * [~logout](#module_Personalpage..Personalpage..logout)
    * [~navigate](#module_Personalpage..Personalpage..navigate)
    * [~handleFollow()](#module_Personalpage..Personalpage..handleFollow)
    * [~handleMessage()](#module_Personalpage..Personalpage..handleMessage)
    * [~handleClick(trueIndex)](#module_Personalpage..Personalpage..handleClick)
    * [~handleMuted()](#module_Personalpage..Personalpage..handleMuted)
    * [~handleVolume(state)](#module_Personalpage..Personalpage..handleVolume)
    * [~changeVideos0(trueIndex, newState, isChild, childName)](#module_Personalpage..Personalpage..changeVideos0)
    * [~changeVideos1(trueIndex, newState, isChild, childName)](#module_Personalpage..Personalpage..changeVideos1)
    * [~changeVideos(trueIndex, newState, isChild, childName)](#module_Personalpage..Personalpage..changeVideos)

<a name="module_Personalpage..Personalpage..user_id"></a>

#### Personalpage~user\_id
搜索参数用户id

**Kind**: inner constant of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..id"></a>

#### Personalpage~id
用户登录id

**Kind**: inner constant of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..trueId"></a>

#### Personalpage~trueId
下面将要使用的id，判断是否为用户自己的主页，如果是用户主页，使用user_id，否则使用id

**Kind**: inner constant of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..token"></a>

#### Personalpage~token
用户token

**Kind**: inner constant of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..logout"></a>

#### Personalpage~logout
用户是否登出

**Kind**: inner constant of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..navigate"></a>

#### Personalpage~navigate
路由导航

**Kind**: inner constant of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..handleFollow"></a>

#### Personalpage~handleFollow()
处理关注/取消关注

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..handleMessage"></a>

#### Personalpage~handleMessage()
处理私信

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..handleClick"></a>

#### Personalpage~handleClick(trueIndex)
对于个人页点击视频的处理，将视频组件设置为可见，设置视频组件的所需要视频资源的真实下标

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  

| Param | Type | Description |
| --- | --- | --- |
| trueIndex | <code>number</code> | 真实下标 |

<a name="module_Personalpage..Personalpage..handleMuted"></a>

#### Personalpage~handleMuted()
处理静音

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  
<a name="module_Personalpage..Personalpage..handleVolume"></a>

#### Personalpage~handleVolume(state)
处理音量

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>number</code> | 音量值 |

<a name="module_Personalpage..Personalpage..changeVideos0"></a>

#### Personalpage~changeVideos0(trueIndex, newState, isChild, childName)
修改本地个人作品数据work

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| trueIndex | <code>number</code> |  | 真实下标 |
| newState | <code>Object</code> |  | 新状态 |
| isChild | <code>boolean</code> | <code>false</code> | 是否为状态的嵌套子元素 |
| childName | <code>string</code> |  | 嵌套子元素名称 |

<a name="module_Personalpage..Personalpage..changeVideos1"></a>

#### Personalpage~changeVideos1(trueIndex, newState, isChild, childName)
修改本地个人喜欢数据like

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| trueIndex | <code>number</code> |  | 真实下标 |
| newState | <code>Object</code> |  | 新状态 |
| isChild | <code>boolean</code> | <code>false</code> | 是否为嵌套子元素 |
| childName | <code>string</code> |  | 嵌套子元素名称 |

<a name="module_Personalpage..Personalpage..changeVideos"></a>

#### Personalpage~changeVideos(trueIndex, newState, isChild, childName)
判断修改哪个个人主页数据的函数

**Kind**: inner method of [<code>Personalpage</code>](#module_Personalpage..Personalpage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| trueIndex | <code>number</code> |  | 真实下标 |
| newState | <code>Object</code> |  | 新状态 |
| isChild | <code>boolean</code> | <code>false</code> | 是否为嵌套子元素 |
| childName | <code>string</code> |  | 嵌套子元素名称 |

<a name="module_Searchpage"></a>

## Searchpage
搜索页面组件


* [Searchpage](#module_Searchpage)
    * [~Searchpage(handleModal)](#module_Searchpage..Searchpage) ⇒ <code>JSX.Element</code>
        * [~handleClick(trueIndex)](#module_Searchpage..Searchpage..handleClick)
        * [~handleMuted()](#module_Searchpage..Searchpage..handleMuted)
        * [~handleVolume(state)](#module_Searchpage..Searchpage..handleVolume)
        * [~changeVideos(trueIndex, newState, isChild, childName)](#module_Searchpage..Searchpage..changeVideos)

<a name="module_Searchpage..Searchpage"></a>

### Searchpage~Searchpage(handleModal) ⇒ <code>JSX.Element</code>
搜索页面组件

**Kind**: inner method of [<code>Searchpage</code>](#module_Searchpage)  
**Returns**: <code>JSX.Element</code> - 搜索页面组件  

| Param | Type | Description |
| --- | --- | --- |
| handleModal | <code>Object</code> | 处理登录注册模态框的函数 |


* [~Searchpage(handleModal)](#module_Searchpage..Searchpage) ⇒ <code>JSX.Element</code>
    * [~handleClick(trueIndex)](#module_Searchpage..Searchpage..handleClick)
    * [~handleMuted()](#module_Searchpage..Searchpage..handleMuted)
    * [~handleVolume(state)](#module_Searchpage..Searchpage..handleVolume)
    * [~changeVideos(trueIndex, newState, isChild, childName)](#module_Searchpage..Searchpage..changeVideos)

<a name="module_Searchpage..Searchpage..handleClick"></a>

#### Searchpage~handleClick(trueIndex)
处理搜索页的视频点击事件

**Kind**: inner method of [<code>Searchpage</code>](#module_Searchpage..Searchpage)  

| Param | Type | Description |
| --- | --- | --- |
| trueIndex | <code>number</code> | 视频在本次搜索请求得到的数组中的真实下标，传递给video组件 |

<a name="module_Searchpage..Searchpage..handleMuted"></a>

#### Searchpage~handleMuted()
处理静音事件

**Kind**: inner method of [<code>Searchpage</code>](#module_Searchpage..Searchpage)  
<a name="module_Searchpage..Searchpage..handleVolume"></a>

#### Searchpage~handleVolume(state)
处理音量事件

**Kind**: inner method of [<code>Searchpage</code>](#module_Searchpage..Searchpage)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | 音量状态 |

<a name="module_Searchpage..Searchpage..changeVideos"></a>

#### Searchpage~changeVideos(trueIndex, newState, isChild, childName)
修改本次搜索结果的数据

**Kind**: inner method of [<code>Searchpage</code>](#module_Searchpage..Searchpage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| trueIndex | <code>number</code> |  | 视频在本次搜索请求得到的数组中的真实下标 |
| newState | <code>Object</code> |  | 新的状态 |
| isChild | <code>boolean</code> | <code>false</code> | 是否为嵌套数据 |
| childName | <code>string</code> |  | 嵌套数据的名称 |

<a name="module_PersonalPopover"></a>

## PersonalPopover
个人弹出框组件

<a name="module_PersonalPopover..PersonalPopover"></a>

### PersonalPopover~PersonalPopover(info, handleLogout) ⇒ <code>JSX.Element</code>
个人弹出框组件

**Kind**: inner method of [<code>PersonalPopover</code>](#module_PersonalPopover)  
**Returns**: <code>JSX.Element</code> - - 返回个人弹出框组件的JSX元素  

| Param | Type | Description |
| --- | --- | --- |
| info | <code>Object</code> | 个人信息对象，包括name、follower_count、follow_count、favorite_count、work_count等属性 |
| handleLogout | <code>function</code> | 退出登录回调函数 |

<a name="module_SharePopover"></a>

## SharePopover
分享弹窗组件


* [SharePopover](#module_SharePopover)
    * [~SharePopover(props)](#module_SharePopover..SharePopover) ⇒ <code>JSX.Element</code>
        * [~handleShare(token, friendId, inputValue)](#module_SharePopover..SharePopover..handleShare) ⇒ <code>Promise</code>

<a name="module_SharePopover..SharePopover"></a>

### SharePopover~SharePopover(props) ⇒ <code>JSX.Element</code>
分享弹窗组件

**Kind**: inner method of [<code>SharePopover</code>](#module_SharePopover)  
**Returns**: <code>JSX.Element</code> - 分享弹窗组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.video | <code>Object</code> | 视频对象，包含当前播放的视频信息 |

<a name="module_SharePopover..SharePopover..handleShare"></a>

#### SharePopover~handleShare(token, friendId, inputValue) ⇒ <code>Promise</code>
处理分享操作

**Kind**: inner method of [<code>SharePopover</code>](#module_SharePopover..SharePopover)  
**Returns**: <code>Promise</code> - - 返回一个Promise对象，resolve时返回一个对象，包含status_code和status_msg两个属性；reject时返回错误信息  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | 用户令牌 |
| friendId | <code>string</code> | 好友ID |
| inputValue | <code>string</code> | 分享内容 |

<a name="module_Sidebar"></a>

## Sidebar
侧边栏组件


* [Sidebar](#module_Sidebar)
    * _static_
        * [.handleLike()](#module_Sidebar.handleLike) ⇒ <code>void</code>
    * _inner_
        * [~Sidebar(props)](#module_Sidebar..Sidebar) ⇒ <code>JSX.Element</code>
            * [~handleFollow(e)](#module_Sidebar..Sidebar..handleFollow) ⇒ <code>void</code>

<a name="module_Sidebar.handleLike"></a>

### Sidebar.handleLike() ⇒ <code>void</code>
处理点赞事件

**Kind**: static method of [<code>Sidebar</code>](#module_Sidebar)  
<a name="module_Sidebar..Sidebar"></a>

### Sidebar~Sidebar(props) ⇒ <code>JSX.Element</code>
侧边栏组件

**Kind**: inner method of [<code>Sidebar</code>](#module_Sidebar)  
**Returns**: <code>JSX.Element</code> - 侧边栏组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.video | <code>Object</code> | 当前播放的视频信息 |
| props.handleComments | <code>function</code> | 处理评论的函数 |
| props.handleModal | <code>function</code> | 处理登录注册模态框的函数 |
| props.trueIndex | <code>number</code> | 视频在列表中的真实索引 |
| props.changeVideos | <code>function</code> | 改变本地视频信息的函数 |

<a name="module_Sidebar..Sidebar..handleFollow"></a>

#### Sidebar~handleFollow(e) ⇒ <code>void</code>
处理关注/取消关注事件

**Kind**: inner method of [<code>Sidebar</code>](#module_Sidebar..Sidebar)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | 事件对象 |

<a name="module_SingleComment"></a>

## SingleComment
单个评论组件

<a name="module_SingleComment..SingleComment"></a>

### SingleComment~SingleComment(props) ⇒ <code>JSX.Element</code>
单个评论组件

**Kind**: inner method of [<code>SingleComment</code>](#module_SingleComment)  
**Returns**: <code>JSX.Element</code> - 单个评论组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.comment | <code>Object</code> | 评论对象 |
| props.comment.user | <code>Object</code> | 评论用户对象 |
| props.comment.user.avatar | <code>string</code> | 评论用户头像链接 |
| props.comment.user.name | <code>string</code> | 评论用户昵称 |
| props.comment.content | <code>string</code> | 评论内容 |
| props.comment.create_date | <code>string</code> | 评论创建时间 |

<a name="module_SingleVideo"></a>

## SingleVideo
单个视频组件

<a name="module_SingleVideo..SingleVideo"></a>

### SingleVideo~SingleVideo(props) ⇒ <code>JSX.Element</code>
单个视频组件

**Kind**: inner method of [<code>SingleVideo</code>](#module_SingleVideo)  
**Returns**: <code>JSX.Element</code> - 单个视频组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.data | <code>Object</code> | 视频数据 |
| props.handleClick | <code>function</code> | 打开视频的处理函数(搜索页和个人主页) |
| props.trueIndex | <code>number</code> | 打开的视频的真实索引 |

<a name="module_UploadPopover"></a>

## UploadPopover
上传弹出框组件


* [UploadPopover](#module_UploadPopover)
    * [~UploadPopover(props)](#module_UploadPopover..UploadPopover) ⇒ <code>JSX.Element</code>
        * [~token](#module_UploadPopover..UploadPopover..token) : <code>string</code>
        * [~props](#module_UploadPopover..UploadPopover..props) : <code>Object</code>

<a name="module_UploadPopover..UploadPopover"></a>

### UploadPopover~UploadPopover(props) ⇒ <code>JSX.Element</code>
上传弹出框组件

**Kind**: inner method of [<code>UploadPopover</code>](#module_UploadPopover)  
**Returns**: <code>JSX.Element</code> - - 返回上传弹出框组件的 JSX 元素  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.handleUpload | <code>function</code> | 上传成功后的回调函数(关闭上传窗口) |


* [~UploadPopover(props)](#module_UploadPopover..UploadPopover) ⇒ <code>JSX.Element</code>
    * [~token](#module_UploadPopover..UploadPopover..token) : <code>string</code>
    * [~props](#module_UploadPopover..UploadPopover..props) : <code>Object</code>

<a name="module_UploadPopover..UploadPopover..token"></a>

#### UploadPopover~token : <code>string</code>
用户 token

**Kind**: inner constant of [<code>UploadPopover</code>](#module_UploadPopover..UploadPopover)  
<a name="module_UploadPopover..UploadPopover..props"></a>

#### UploadPopover~props : <code>Object</code>
上传组件的属性

**Kind**: inner constant of [<code>UploadPopover</code>](#module_UploadPopover..UploadPopover)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | 发到后端的文件参数名 |
| beforeUpload | <code>function</code> | 上传前的校验函数 |
| data | <code>Object</code> | 发送到后端的额外数据 |
| action | <code>string</code> | 后端的文件上传接口 URL |
| headers | <code>Object</code> | 请求头 |
| onChange | <code>function</code> | 上传状态改变时的回调函数 |
| fileList | <code>Array.&lt;Object&gt;</code> | 上传的文件列表 |

<a name="module_Video"></a>

## Video
视频组件


* [Video](#module_Video)
    * [~Video(props)](#module_Video..Video) ⇒ <code>JSX.Element</code>
        * [~handleProgress(state)](#module_Video..Video..handleProgress)
        * [~handlePlayed(state)](#module_Video..Video..handlePlayed)
        * [~get()](#module_Video..Video..get)

<a name="module_Video..Video"></a>

### Video~Video(props) ⇒ <code>JSX.Element</code>
视频组件

**Kind**: inner method of [<code>Video</code>](#module_Video)  
**Returns**: <code>JSX.Element</code> - 视频组件  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 组件属性 |
| props.video | <code>Object</code> | 视频对象 |
| props.isPlaying | <code>boolean</code> | 是否正在播放 |
| props.handlePlaying | <code>function</code> | 处理播放状态的函数 |
| props.ismuted | <code>boolean</code> | 是否静音 |
| props.handleMuted | <code>function</code> | 处理静音状态的函数 |
| props.volume | <code>number</code> | 音量大小 |
| props.handleVolume | <code>function</code> | 处理音量大小的函数 |
| props.showComments | <code>boolean</code> | 是否显示评论区 |
| props.handleComments | <code>function</code> | 处理评论区显示状态的函数 |
| props.handleModal | <code>function</code> | 处理登录注册模态框显示状态的函数 |
| props.trueIndex | <code>number</code> | 当前视频在视频列表中的真实索引 |
| props.changeVideos | <code>function</code> | 处理本地视频列表数据的函数 |


* [~Video(props)](#module_Video..Video) ⇒ <code>JSX.Element</code>
    * [~handleProgress(state)](#module_Video..Video..handleProgress)
    * [~handlePlayed(state)](#module_Video..Video..handlePlayed)
    * [~get()](#module_Video..Video..get)

<a name="module_Video..Video..handleProgress"></a>

#### Video~handleProgress(state)
处理视频播放进度的函数

**Kind**: inner method of [<code>Video</code>](#module_Video..Video)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | 播放状态对象 |
| state.played | <code>number</code> | 播放进度 |
| state.playedSeconds | <code>number</code> | 播放秒数 |

<a name="module_Video..Video..handlePlayed"></a>

#### Video~handlePlayed(state)
处理视频播放进度的函数

**Kind**: inner method of [<code>Video</code>](#module_Video..Video)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>number</code> | 播放进度 |

<a name="module_Video..Video..get"></a>

#### Video~get()
获取评论的函数，也用于发布评论后刷新评论区

**Kind**: inner method of [<code>Video</code>](#module_Video..Video)  
<a name="loginRequest"></a>

## loginRequest ⇒ <code>Object</code>
登录请求的动作创建器

**Kind**: global constant  
**Returns**: <code>Object</code> - 返回一个动作对象，其类型为"LOGIN_REQUEST"  
<a name="loginSuccess"></a>

## loginSuccess ⇒ <code>Object</code>
登录成功的动作创建器

**Kind**: global constant  
**Returns**: <code>Object</code> - 返回一个动作对象，其类型为"LOGIN_SUCCESS"，并包含用户名、令牌、成功消息和用户ID  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | 用户名 |
| token | <code>string</code> | 用户的认证令牌 |
| success | <code>boolean</code> | 登录是否成功 |
| user_id | <code>string</code> | 用户的ID |

<a name="loginFailure"></a>

## loginFailure ⇒ <code>Object</code>
登录失败的动作创建器

**Kind**: global constant  
**Returns**: <code>Object</code> - 返回一个动作对象，其类型为"LOGIN_FAILURE"，并包含错误信息  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>string</code> | 错误信息 |

<a name="logOut"></a>

## logOut ⇒ <code>Object</code>
注销的动作创建器

**Kind**: global constant  
**Returns**: <code>Object</code> - 返回一个动作对象，其类型为"LOGOUT"  
<a name="registerRequest"></a>

## registerRequest ⇒ <code>Object</code>
注册请求的动作创建器

**Kind**: global constant  
**Returns**: <code>Object</code> - 返回一个动作对象，其类型为"REGISTER_REQUEST"  
<a name="registerSuccess"></a>

## registerSuccess ⇒ <code>Object</code>
注册成功的动作创建器

**Kind**: global constant  
**Returns**: <code>Object</code> - 返回一个动作对象，其类型为"REGISTER_SUCCESS"，并包含成功消息  

| Param | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code> | 注册是否成功 |

<a name="registerFailure"></a>

## registerFailure ⇒ <code>Object</code>
注册失败的动作创建器

**Kind**: global constant  
**Returns**: <code>Object</code> - 返回一个动作对象，其类型为"REGISTER_FAILURE"，并包含错误信息  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>string</code> | 错误信息 |

<a name="App"></a>

## App() ⇒ <code>JSX.Element</code>
应用程序入口组件

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - 应用程序组件  

* [App()](#App) ⇒ <code>JSX.Element</code>
    * [~logout](#App..logout) : <code>boolean</code>
    * [~token](#App..token) : <code>string</code>
    * [~videoClass](#App..videoClass) : <code>Array</code>
    * [~updateVideos()](#App..updateVideos)
    * [~handleModal()](#App..handleModal)
    * [~changeVideos(trueIndex, newState, isChild, childName)](#App..changeVideos)

<a name="App..logout"></a>

### App~logout : <code>boolean</code>
是否已经登出

**Kind**: inner constant of [<code>App</code>](#App)  
<a name="App..token"></a>

### App~token : <code>string</code>
用户token

**Kind**: inner constant of [<code>App</code>](#App)  
<a name="App..videoClass"></a>

### App~videoClass : <code>Array</code>
视频类别列表

**Kind**: inner constant of [<code>App</code>](#App)  
<a name="App..updateVideos"></a>

### App~updateVideos()
更新视频列表

**Kind**: inner method of [<code>App</code>](#App)  
<a name="App..handleModal"></a>

### App~handleModal()
处理modal的显示/隐藏

**Kind**: inner method of [<code>App</code>](#App)  
<a name="App..changeVideos"></a>

### App~changeVideos(trueIndex, newState, isChild, childName)
修改本地视频列表中的数据

**Kind**: inner method of [<code>App</code>](#App)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| trueIndex | <code>number</code> |  | 视频的真实索引 |
| newState | <code>object</code> |  | 新状态 |
| isChild | <code>boolean</code> | <code>false</code> | 是否是嵌套数据 |
| childName | <code>string</code> |  | 嵌套数据的名称 |

<a name="root"></a>

## root(container) ⇒ [<code>Root</code>](#Root)
创建根元素

**Kind**: global function  
**Returns**: [<code>Root</code>](#Root) - - 根元素对象  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> | 包含根元素的容器 |

<a name="loginRegisterReducer"></a>

## loginRegisterReducer(state, action) ⇒ <code>Object</code>
处理登录和注册的 reducer 函数

**Kind**: global function  
**Returns**: <code>Object</code> - 新的状态  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | 当前状态 |
| action | <code>Object</code> | 分发的 action |
| action.type | <code>string</code> | action 类型 |
| action.username | <code>string</code> | 用户名 |
| action.token | <code>string</code> | 用户 token |
| action.success | <code>string</code> | 成功信息 |
| action.error | <code>string</code> | 错误信息 |
| action.user_id | <code>string</code> | 用户 ID |

<a name="formatSeconds"></a>

## formatSeconds(seconds) ⇒ <code>string</code>
将秒数格式化为 mm:ss 的形式

**Kind**: global function  
**Returns**: <code>string</code> - 格式化后的时间字符串mm:ss  

| Param | Type | Description |
| --- | --- | --- |
| seconds | <code>number</code> | 需要格式化的秒数 |

<a name="getComments"></a>

## getComments(id, [token]) ⇒ <code>Promise.&lt;Array&gt;</code>
从服务器获取指定视频的评论列表

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - 包含评论对象的数组  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | 视频ID |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户令牌 |

<a name="getFollow"></a>

## getFollow(id, [token]) ⇒ <code>Promise.&lt;Array&gt;</code>
从服务器获取用户关注列表

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - - 包含关注列表的Promise对象  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | 用户ID |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户token |

<a name="getFollower"></a>

## getFollower(id, [token]) ⇒ <code>Promise.&lt;Array&gt;</code>
获取用户的粉丝列表

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - - 包含粉丝信息的数组  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | 用户ID |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户token |

<a name="getFriendList"></a>

## getFriendList(user_id, token) ⇒ <code>Promise.&lt;Object&gt;</code>
获取好友列表

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - 包含好友列表的对象  

| Param | Type | Description |
| --- | --- | --- |
| user_id | <code>string</code> | 用户ID |
| token | <code>string</code> | 用户token |

<a name="getMessages"></a>

## getMessages(token, to_user_id, [pre_msg_time]) ⇒ <code>Promise</code>
从服务器获取聊天消息

**Kind**: global function  
**Returns**: <code>Promise</code> - 包含聊天消息的Promise对象  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>string</code> |  | 用户登录凭证 |
| to_user_id | <code>string</code> |  | 聊天的用户ID |
| [pre_msg_time] | <code>number</code> | <code>0</code> | 获取此时间戳之前的消息，默认为0 |

<a name="sendMessage"></a>

## sendMessage(token, to_user_id, content, [action_type]) ⇒ <code>Promise.&lt;Object&gt;</code>
发送消息

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - 包含响应数据的Promise对象  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>string</code> |  | 用户令牌 |
| to_user_id | <code>string</code> |  | 接收消息的用户ID |
| content | <code>string</code> |  | 消息内容 |
| [action_type] | <code>number</code> | <code>1</code> | 操作类型，默认为1 |

<a name="getPersonalInfo"></a>

## getPersonalInfo(user_id, [token]) ⇒ <code>Promise.&lt;Object&gt;</code>
获取用户个人信息

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - 包含用户个人信息的对象  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| user_id | <code>string</code> |  | 用户ID |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户token |

<a name="getSearchItem"></a>

## getSearchItem(keyword, [token]) ⇒ <code>Promise.&lt;Array&gt;</code>
从服务器获取包含指定关键字的视频列表

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - 包含指定关键字的视频列表  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| keyword | <code>string</code> |  | 搜索关键字 |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户令牌 |

<a name="login"></a>

## login(username, password) ⇒ <code>Promise.&lt;Object&gt;</code>
登录函数

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - 包含用户信息的对象  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | 用户名 |
| password | <code>string</code> | 密码 |

<a name="register"></a>

## register(username, password) ⇒ <code>Promise.&lt;Object&gt;</code>
注册用户

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - 包含注册结果的 Promise 对象  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | 用户名 |
| password | <code>string</code> | 密码 |

<a name="postComment"></a>

## postComment(token, id, action_type, text) ⇒ <code>Promise.&lt;Object&gt;</code>
向服务器发送评论请求

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - 包含评论信息的对象  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | 用户的身份令牌 |
| id | <code>string</code> | 视频的ID |
| action_type | <code>string</code> | 评论的类型(1：发送，2：删除) |
| text | <code>string</code> | 评论的内容 |

<a name="postFollow"></a>

## postFollow(id, [token]) ⇒ <code>Promise.&lt;Object&gt;</code>
发送关注请求

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - 包含关注请求结果的Promise对象  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | 被关注用户的ID |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户的token |

<a name="postCancelFollow"></a>

## postCancelFollow(id, [token]) ⇒ <code>Promise.&lt;Object&gt;</code>
发送取消关注请求

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - 包含响应数据的Promise对象  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | 用户ID |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户令牌 |

<a name="postLike"></a>

## postLike(video_id, [token]) ⇒ <code>Promise</code>
向服务器发送点赞请求

**Kind**: global function  
**Returns**: <code>Promise</code> - - 返回一个Promise对象，包含服务器返回的数据  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| video_id | <code>string</code> |  | 视频ID |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户token |

<a name="postCancelLike"></a>

## postCancelLike(video_id, [token]) ⇒ <code>Promise.&lt;Object&gt;</code>
取消点赞视频

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - 包含取消点赞结果的Promise对象  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| video_id | <code>string</code> |  | 视频ID |
| [token] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | 用户token |

<a name="transformTime"></a>

## transformTime(timestamp) ⇒ <code>string</code>
将时间戳转换为格式化的时间字符串

**Kind**: global function  
**Returns**: <code>string</code> - 格式化的时间字符串，格式为：yyyy-MM-dd HH:mm:ss  

| Param | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | 时间戳 |

<a name="Root"></a>

## Root : <code>Object</code>
根元素

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| render | <code>function</code> | 渲染函数 |

