import {Link} from 'react-router-dom';
import styles from '../assets/styles/Header.module.css';

function Header(){
    return (
        <header>
            <div className={styles.headerContainer}>
                    <div className={styles.brand}>
                        <Link className={styles.link} to="/">React Video</Link>
                    </div>
                    <nav className={styles.navlinks}>
                            <Link className={styles.link} to="/">首页</Link>
                            <Link className={styles.link} to="/sports">体育</Link>
                    </nav>
                    <div className={styles.searchInput}>
                        <input type="text" />
                    </div>
                    <div className={styles.personalbar}>
                        <Link className={styles.link} to='/upload'>上传</Link>
                        <Link className={styles.link} to='/personal'>用户</Link>
                    </div>
                </div>
        </header>
    )
}

export default Header;