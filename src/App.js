import "./App.scss";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mainpage from "./component/page/Mainpage";
import Header from "./component/Header";
import Searchpage from "./component/page/Searchpage";
import getVideo from "./utils/getVideos";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { logOut } from "./redux/actions/loginRegisterAction";
import { ConfigProvider, message } from "antd";
import Page404 from "./component/page/Page404";
import Personalpage from "./component/page/Personalpage";
import { changeMute, changeNextTime, changeSpeed, resetVideos } from "./redux/actions/videosAction";
import { hideAll, showLogin } from "./redux/actions/popoverAction";
function App() {
  const dispatch = useDispatch();
  const logout = useSelector((state) => state?.loginRegister?.logout); // 是否已经登出
  const token = useSelector((state) => state?.loginRegister?.token); //用户token
  const nextTime = useSelector((state) => state?.videos?.nextTime);
  const chooseClass = useSelector((state) => state?.videos?.chooseClass);
  const videoClass = ["不选择任何类别", "", "体育", "游戏", "音乐"]; // 视频类别列表

  useEffect(() => {
    dispatch(changeMute(true)); //每次刷新页面都将视频静音
    dispatch(hideAll()); //每次刷新页面都将所有弹窗隐藏
    dispatch(changeSpeed("1"))
    async function refreshVideos() {
      const latest_time = nextTime[chooseClass] || undefined;
      const res = await getVideo(latest_time, token, videoClass[chooseClass])
      if (!res.video_list || res.video_list.length === 0) {
        dispatch(changeNextTime(res.next_time));
        refreshVideos();
        return;
      }
      dispatch(resetVideos(res.video_list));
    }
    refreshVideos(); // eslint-disable-next-line
  }, [logout, chooseClass]); //登录状态改变、视频类别改变时重新获取视频

  async function updateVideos() {
    const latest_time = nextTime[chooseClass] || undefined; //更新视频列表
    const res = await getVideo(latest_time, token, videoClass[chooseClass])
    if (!res.video_list || res.video_list.length === 0) {
      dispatch(changeNextTime(res.next_time));
      updateVideos();
      return;
    }
    dispatch(updateVideos(res.video_list));
    dispatch(changeNextTime(res.next_time));
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
          Slider: {
            handleActiveColor: "#fe2c55",
            handleColor: "#fe2c55",
            dotActiveBorderColor: "#fe2c55",
            trackBg: "#fe2c55",
            trackHoverBg: "#fe2c55",
          }
        },
      }}>
      <Router>
        <Routes>
          <Route path="/" element={<Header></Header>}>
            <Route index element={<Mainpage updateVideos={updateVideos}></Mainpage>}></Route>
            <Route path="search" element={<Searchpage></Searchpage>}></Route>
            <Route path="personal" element={<Personalpage></Personalpage>}></Route>
          </Route>
          <Route path="*" element={<Page404></Page404>}></Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
