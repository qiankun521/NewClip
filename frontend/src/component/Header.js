import { Link } from 'react-router-dom';
import styles from '../assets/styles/Header.module.css';
import { BsUpload } from 'react-icons/bs';
function Header() {
    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <div className={styles.brand}>
                        <Link className={styles.link} to="/">NewClip</Link>
                    </div>
                    <nav className={styles.navlinks}>
                        <Link className={styles.link} to="/">首页</Link>
                        <Link className={styles.link} to="/hot">热门视频</Link>
                        <Link className={styles.link} to="/sports">体育频道</Link>
                    </nav>
                    <div className={styles.searchInput}>
                        <input type="text" placeholder="请输入你想搜索的关键词"/>
                    </div>
                    <div className={styles.personalbar}>
                        <div className={styles.upload}>
                            <BsUpload></BsUpload>
                            <Link className={styles.link} to='/upload'>上传</Link>
                        </div>
                        <div className={styles.personal}>
                            <div className={styles.login}>登录</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;