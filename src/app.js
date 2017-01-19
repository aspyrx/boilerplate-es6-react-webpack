import React from 'react';
import { BrowserRouter, Miss, Match } from 'react-router';

import asyncComponent from '~/components/asyncComponent';
import Spinner from '~/components/spinner';
import NotFound from 'bundle-loader?lazy!~/components/NotFound';
import Header from '~/header';
import Footer from '~/footer';
import styles from './app.less';
import routes, { routesFlat } from '~/routes';

const routesCtx = require.context(
    'bundle-loader?lazy!./routes',
    true,
    /\.(js|md)$/
);

const matches = routesFlat.map((route, i) => {
    const { path, pattern, ...props } = route;
    const loadModule = routesCtx(path);
    const component = asyncComponent(loadModule, Spinner);
    return <Match
        {...props}
        key={i}
        exactly pattern={pattern}
        component={component}
    />;
});

export default function App() {
    return <BrowserRouter>
        <div>
            <Header routes={routes} />
            <div className={styles.container}>
                { matches }
                <Miss component={asyncComponent(NotFound)} />
            </div>
            <Footer routes={routes} />
        </div>
    </BrowserRouter>;
}

