/*
 * home.js - Home page for the app.
 */

import React from 'react';

import styles from './home.less';

export default function Home(props) {
    return <div className={styles.home} {...props}>
        <span>Hello React!</span>
    </div>;
}

export const page = {
    path: '/home',
    title: 'home'
};

