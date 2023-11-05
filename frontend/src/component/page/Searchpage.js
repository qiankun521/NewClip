import { useSearchParams } from "react-router-dom";
import { useEffect,useState } from "react";
import styles from '../../assets/styles/Searchpage.module.css';
import getSearchItem from "../../utils/getSearchItem";
import { useSelector } from "react-redux";
import { message } from 'antd';
import SingleVideo from "../SingleVideo";
function Searchpage() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const token = useSelector(state => state?.loginRegister?.token);
    const [data,setData] =useState(localStorage.getItem(`search_${keyword}`)?JSON.parse(localStorage.getItem(`search_${keyword}`)).video_list:null);
    useEffect(() => {
        message.loading({
            content: '加载中...',
            key: 'search',
            duration: 0,
        });
        getSearchItem(keyword, token).then(data => {
            switch (data.status_code) {
                case 0:
                    localStorage.setItem(`search_${keyword}`, JSON.stringify(data));
                    setData(data.video_list);
                    console.log(data);
                    break;
                default:
                    message.error(data.status_msg);
                    break;
            }
            message.destroy();
        }).catch(err => {
            message.destroy();
            message.error("加载失败");
            console.log(err);
        })
        return () => {
            message.destroy();
        }
    }, [keyword, token])
    return (
        <div className={styles.Searchpage}>
            <div className={styles.search}>
                {
                    data&&data.length!==0 ?
                        data.map((item, index) => {
                            return <SingleVideo key={index} data={item}></SingleVideo>
                        })
                        :
                        <div className={styles.nothing} style={{
                            backgroundImage: `url()`,//TODO 添加搜索无内容的背景图
                            backgroundSize: 'cover',
                        }}>没有找到相关的视频</div>
                }
            </div>
        </div>
    )
}
export default Searchpage;