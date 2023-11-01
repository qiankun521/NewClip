import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './component/page/Mainpage';
import Header from './component/Header';
import getVideo from './utils/getVideos';
function App() {
  const [haveVideo, setHaveVideo] = useState(false);
  useEffect(() => {
    async function get() {
      getVideo().then((res) => {
        switch (res.status_code) {
          case 0:
            localStorage.setItem('videos', JSON.stringify(res.video_list));
            localStorage.setItem('next_time', res.next_time);
            setHaveVideo(true);
            break;
          case -1:
            console.log(res.status_msg);
            break;//TODO token过期
          default:
            break;
        }

      }).catch((err) => {
        console.log(err);
      })
    }
    get();// eslint-disable-next-line
  }, [])
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path='/' element={haveVideo ? <Mainpage ></Mainpage> : null}></Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
