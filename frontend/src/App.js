import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './component/page/Mainpage';
import Header from './component/Header';
import Searchpage from './component/page/Searchpage';
import getVideo from './utils/getVideos';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { logOut } from './redux/actions/loginRegisterAction';
import { ConfigProvider } from 'antd';
import Page404 from './component/page/Page404';
import Personalpage from './component/page/Personalpage';

/**
 * 应用程序入口组件
 * @returns {JSX.Element} 应用程序组件
 */
function App() {
  const [haveVideo, setHaveVideo] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  /**
   * 是否已经登出
   * @type {boolean}
   */
  const logout = useSelector(state => state?.loginRegister?.logout);
  const [videos, setVideos] = useState(JSON.parse(localStorage.getItem('videos')) ? JSON.parse(localStorage.getItem('videos')) : null);
  /**
   * 用户token
   * @type {string}
   */
  const token = useSelector(state => state?.loginRegister?.token);
  /**
   * 选择的主页分类类别
   * @type {Array} 状态钩子
   */
  const [chooseClass, setChooseClass] = useState(0);
  /**
   * 视频类别列表
   * @type {Array}
   */
  const videoClass=["","体育","游戏","音乐"];
  /**
   * 获取视频列表
   */
  useEffect(() => {
    /**
     * 获取视频列表
     */
    function get() {
      const latest_time = localStorage.getItem(`next_time${chooseClass}`) || undefined;
      getVideo(latest_time, logout ? undefined : token,videoClass[chooseClass]).then((res) => {
        switch (res.status_code) {
          case 0:
            if (res.video_list == null) {
              localStorage.setItem(`next_time${chooseClass}`, res.next_time);
              get();//当前类别没有更多的视频，重新请求之后后端从头开始返回
              break;
            }
            localStorage.setItem('videos', JSON.stringify(res.video_list));
            localStorage.setItem(`next_time${chooseClass}`, res.next_time);
            setVideos(res.video_list);
            setHaveVideo(true);
            break;
          case -1:
            console.log(res.status_msg);
            dispatch(logOut());//token过期，踢出重新登录
            break;
          default:
            break;
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    get();// eslint-disable-next-line
  }, [logout,chooseClass])//登录状态改变、视频类别改变时重新获取视频
  /**
   * 更新视频列表
   */
  function updateVideos() {
    const latest_time = localStorage.getItem(`next_time${chooseClass}`) || undefined;
    getVideo(latest_time, token,videoClass[chooseClass]).then((res) => {
      switch (res.status_code) {
        case 0:
          setVideos([...videos, ...res.video_list]);
          localStorage.setItem('videos', JSON.stringify([...videos, ...res.video_list]));
          localStorage.setItem(`next_time${chooseClass}`, res.next_time);
          setHaveVideo(true);
          break;
        case -1:
          console.log(res.status_msg);
          dispatch(logOut());
          break;
        default:
          break;
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  /**
   * 处理modal的显示/隐藏
   */
  function handleModal() {
    setVisible(!visible);
  }
  /**
   * 修改本地视频列表中的数据
   * @param {number} trueIndex 视频的真实索引
   * @param {object} newState 新状态
   * @param {boolean} isChild 是否是嵌套数据
   * @param {string} childName 嵌套数据的名称
   */
  function changeVideos(trueIndex, newState, isChild = false, childName = "") {
    if (!isChild) {
      const newVideos = videos.map((item, index) => {
        return index === trueIndex ? { ...item, ...newState } : item
      });
      setVideos(newVideos);
    } else {
      const newVideos = videos.map((item, index) => {
        return index === trueIndex ? { ...item, [childName]: { ...item[childName], ...newState } } : item
      })
      setVideos(newVideos);
    }
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Popover: {
            colorBgElevated: "#252632",
            colorText: "#C9C9CA",
            colorTextHeading: "#C9C9CA",
          },
          Modal: {
            colorBgElevated: "#252632",
            colorText: "#C9C9CA",
            colorTextHeading: "#C9C9CA",
          },
          Input: {
            colorBgContainer: "#252632",
            colorText: "rgb(255, 255, 255)",
            colorTextDescription:"#C9C9CA",
            colorTextPlaceholder:"#C9C9CA"
          }
        }
      }}>
      <Router>
        <div className="App">
          <Header visible={visible} handleModal={handleModal} chooseClass={chooseClass} setChooseClass={setChooseClass}></Header>
          <Routes>
            <Route path='/' element={haveVideo ? <Mainpage handleModal={handleModal} videos={videos} changeVideos={changeVideos} updateVideos={updateVideos}></Mainpage> : null}></Route>
            <Route path='/search' element={<Searchpage handleModal={handleModal}></Searchpage>}></Route>
            <Route path='/personal' element={<Personalpage handleModal={handleModal}></Personalpage>}></Route>
            <Route path='*' element={<Page404></Page404>}></Route>
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
