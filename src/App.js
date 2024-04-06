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
    function refreshVideos() {
      console.log(chooseClass, nextTime[chooseClass]);
      const latest_time = nextTime[chooseClass] || undefined;
      getVideo(latest_time, token, videoClass[chooseClass])
        .then((res) => {
          switch (res.status_code) {
            case 0:
              if (!res.video_list || res.video_list.length === 0) {
                dispatch(changeNextTime(res.next_time));
                setTimeout(() => refreshVideos(), 10); //当前类别没有更多的视频，重新请求之后后端从头开始返回
                break;
              }
              dispatch(resetVideos(res.video_list));
              dispatch(changeNextTime(res.next_time));
              break;
            case -1:
              message.error(res.status_msg);
              dispatch(logOut()); //token过期，踢出重新登录
              dispatch(hideAll());
              dispatch(showLogin());
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    refreshVideos(); // eslint-disable-next-line
  }, [logout, chooseClass]); //登录状态改变、视频类别改变时重新获取视频

  function updateVideos() {
    const latest_time = nextTime[chooseClass] || undefined; //更新视频列表
    getVideo(latest_time, token, videoClass[chooseClass])
      .then((res) => {
        switch (res.status_code) {
          case 0:
            if (!res.video_list || res.video_list.length === 0) {
              dispatch(changeNextTime(res.next_time));
              updateVideos();
              break;
            }
            dispatch(updateVideos(res.video_list));
            dispatch(changeNextTime(res.next_time));
            break;
          case -1:
            message.error(res.status_msg);
            dispatch(logOut());
            dispatch(hideAll());
            dispatch(showLogin());
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
