/*
 * home.js - Home page for the app.
 */

import React from 'react';

import styles from './home.less';

export default function Home(props) {
    return <div className={styles.home} {...props}>
        <h1>Hello React!</h1>
    </div>;
}

