import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './component/page/Mainpage';
import Header from './component/Header';
import Searchpage from './component/page/Searchpage';
import getVideo from './utils/getVideos';
import { useDispatch } from 'react-redux';
import {logOut} from './redux/actions/loginRegisterAction';
function App() {
  const [haveVideo, setHaveVideo] = useState(false);
  const [visible, setVisible] = useState(false);//modal是否可见
  const dispatch = useDispatch();
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
  }, [])
  const handleModal = () => {
    setVisible(!visible);
}
  return (
      <Router>
        <div className="App">
          <Header visible={visible} handleModal={handleModal}></Header>
          <Routes>
            <Route path='/' element={haveVideo ? <Mainpage handleModal={handleModal}></Mainpage> : null}></Route>
            <Route path='/search' element={<Searchpage></Searchpage>}></Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
