import React from 'react';
import Link from 'react-router/lib/Link';

import styles from './header.less';

function Logo() {
    return <div className={styles.logo}>
        <div className={styles.icon}>
            <div className={styles.right}>
                <div className={styles.left}>
                    <div className={styles.middle} />
                </div>
            </div>
        </div>
        <div className={styles.logoText}>
            <span>SPYRX</span>.co
        </div>
    </div>;
}

export default function Header(props) {
    const { pages } = props;
    return <div className={styles.header}>
        <Link to="/home"><Logo /></Link>
        <div className={styles.navigation}>
            {pages.map((module, i) => {
                const { page: { path, title } } = module;
                return <Link key={i}
                    to={path}
                    activeClassName={styles.active}>
                    {title}
                </Link>;
            })}
        </div>
    </div>;
}

const { arrayOf, shape, string } = React.PropTypes;
Header.propTypes = {
    pages: arrayOf(shape({
        module: shape({
            page: shape({
                path: string,
                title: string
            })
        })
    })).isRequired
}

