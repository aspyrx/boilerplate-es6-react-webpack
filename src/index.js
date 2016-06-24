/*
 * index.js - Entry point for the app.
 */

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';

import App from '~/app';
import pages from '~/pages';

render(<Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to={pages.indexPath} />
        {pages.map(([Page, path], i) => {
            return <Route key={i} path={path} component={Page} />
        })}
    </Route>
</Router>, document.getElementById("app"));

