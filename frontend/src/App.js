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
function App() {
  const [haveVideo, setHaveVideo] = useState(false);
  const [visible, setVisible] = useState(false);//modal是否可见
  const dispatch = useDispatch();
  const logout = useSelector(state => state?.loginRegister?.logout);
  const [videos, setVideos] = useState(JSON.parse(localStorage.getItem('videos')) ? JSON.parse(localStorage.getItem('videos')) : null);
  const token = useSelector(state => state?.loginRegister?.token);
  useEffect(() => {
    async function get() {
      const latest_time = localStorage.getItem("next_time") || undefined;
      getVideo(latest_time, logout ? undefined : token).then((res) => {//TODO latest_time修改，0为测试
        switch (res.status_code) {
          case 0:
            if(res.video_list==null){
              localStorage.setItem('next_time', res.next_time);
              get();
              break;
            }
            localStorage.setItem('videos', JSON.stringify(res.video_list));
            localStorage.setItem('next_time', res.next_time);
            setVideos(res.video_list);
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
    get();// eslint-disable-next-line
  }, [logout])
  function updateVideos() {//动态增加视频，达到无限下滑的效果
    const latest_time = localStorage.getItem("next_time");
    getVideo(latest_time, token).then((res) => {
      switch (res.status_code) {
        case 0:
          setVideos([...videos, ...res.video_list]);
          localStorage.setItem('videos', JSON.stringify([...videos, ...res.video_list]));
          localStorage.setItem('next_time', res.next_time);
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
  function handleModal() {
    setVisible(!visible);
  }
  function changeVideos(trueIndex, newState, isChild = false, childName = "") {//适用于点赞、关注等操作,先修改本地数据提供反馈
    console.log(trueIndex, newState);
    if (!isChild) {
      const newVideos = videos.map((item, index) => {
        return index === trueIndex ? { ...item, ...newState } : item
      });
      setVideos(newVideos);
    } else {
      const newVideos = videos.map((item, index) => {
        return index === trueIndex ? { ...item, [childName]: { ...item[childName], ...newState } } : item//修改嵌套的数据，如video的author对象，深拷贝
      })
      setVideos(newVideos);
    }

  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Popover: {
            colorBgElevated: "#1A1823",//背景
            colorText: "#C9C9CA",//文本
            colorTextHeading: "#C9C9CA",//标题
          },
          Modal: {
            //TODO 改变modal的样式,使其符合主题
          }
        }
      }}>
      <Router>
        <div className="App">
          <Header visible={visible} handleModal={handleModal}></Header>
          <Routes>
            <Route path='/' element={haveVideo ? <Mainpage handleModal={handleModal} videos={videos} changeVideos={changeVideos} updateVideos={updateVideos}></Mainpage> : null}></Route>
            <Route path='/search' element={<Searchpage></Searchpage>}></Route>
            <Route path='/personal' element={<Personalpage></Personalpage>}></Route>
            <Route path='*' element={<Page404></Page404>}></Route>
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
