import React from 'react';
import { Link } from 'react-router';

import styles from './header.less';

function Logo() {
    return <div className={styles.logo}>
        <span>Hello React!</span>
    </div>;
}

export default function Header(props) {
    const { pages } = props;
    return <div className={styles.header}>
        <Link to='/'><Logo /></Link>
        <div className={styles.navigation}>
            {pages.map((page, i) => {
                const { exactly, pattern, title } = page;
                return <Link
                    key={i}
                    to={pattern}
                    activeOnlyWhenExact={exactly}
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
};

