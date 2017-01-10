import asyncComponent from '~/components/asyncComponent';

const componentCtx = require.context(
    'bundle-loader?lazy!.',
    true,
    /^.+\/index.js$/
);

const pageCtx = require.context('.', true, /^.+\/page.json$/);

class Page {
    constructor(key, isIndex) {
        const _moduleName = key.match(/^(.*)\//)[1];
        const exactly = isIndex;
        const pattern = isIndex
            ? '/'
            : '/' + _moduleName.match(/^(?:.*-)(.*)/)[1];

        Object.assign(this, pageCtx(key), {
            exactly, key, pattern, _moduleName
        });
    }

    get component() {
        const key = this._moduleName + '/index.js';

        return asyncComponent((done) => {
            const loadComponent = componentCtx(key);
            loadComponent(module => done(module.default));
        });
    }
}

const pages = pageCtx.keys().map((key, i) => new Page(key, i === 0));

export { pages as default };

