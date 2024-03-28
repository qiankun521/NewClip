import "./App.scss";
import { useState, useEffect } from "react";
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
import { changeNextTime, resetVideos } from "./redux/actions/videosAction";
function App() {
  const dispatch = useDispatch();
  const logout = useSelector((state) => state?.loginRegister?.logout); // 是否已经登出
  const token = useSelector((state) => state?.loginRegister?.token); //用户token
  const nextTime = useSelector((state) => state?.videos?.nextTime);
  const chooseClass = useSelector((state) => state?.videos?.chooseClass);
  const videoClass = ["不选择任何类别", "", "体育", "游戏", "音乐"]; // 视频类别列表

  useEffect(() => {
    function refreshVideos() {
      const latest_time = nextTime[chooseClass] || undefined;
      getVideo(latest_time, token, videoClass[chooseClass])
        .then((res) => {
          switch (res.status_code) {
            case 0:
              if (!res.video_list) {
                dispatch(changeNextTime(res.next_time));
                refreshVideos(); //当前类别没有更多的视频，重新请求之后后端从头开始返回
                break;
              }
              dispatch(resetVideos(res.video_list));
              dispatch(changeNextTime(res.next_time));
              break;
            case -1:
              message.error(res.status_msg);
              dispatch(logOut()); //token过期，踢出重新登录
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
            dispatch(updateVideos(res.video_list));
            dispatch(changeNextTime(res.next_time));
            break;
          case -1:
            message.error(res.status_msg);
            dispatch(logOut());
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
          Modal: {
            colorBgElevated: "#252632",
            colorText: "#C9C9CA",
            colorTextHeading: "#C9C9CA",
          },
          Input: {
            colorBgContainer: "#252632",
            colorText: "rgb(255, 255, 255)",
            colorTextDescription: "#C9C9CA",
            colorTextPlaceholder: "#C9C9CA",
          },
        },
      }}>
      <Router>
        <div className="App">
          <Header></Header>
          <Routes>
            <Route
              path="/"
              element={
                <Mainpage
                  updateVideos={updateVideos}></Mainpage>
              }></Route>
            <Route path="/search" element={<Searchpage></Searchpage>}></Route>
            <Route path="/personal" element={<Personalpage></Personalpage>}></Route>
            <Route path="*" element={<Page404></Page404>}></Route>
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
