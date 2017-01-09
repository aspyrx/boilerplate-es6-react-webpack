/*
 * index.js - Entry point for the app.
 */

import React from 'react';
import { render } from 'react-dom';
import App from '~/app';

const appDiv = document.createElement('div');
appDiv.id = 'app';
document.body.appendChild(appDiv);
render(<App />, appDiv);

if (module.hot) {
    module.hot.accept('~/app', () =>
        render(<App />, appDiv)
    );

    module.hot.dispose(() =>
        document.body.removeChild(appDiv)
    );
}
