import asyncComponent from '~/components/asyncComponent';

const componentCtx = require.context(
    'bundle-loader?lazy!.',
    true,
    /^.+\/index.js$/
);

const pageCtx = require.context('.', true, /^.+\/page.json$/);

class Page {
    constructor(page, exactly) {
        const pattern = exactly
            ? '/'
            : page._moduleName.match(/^\.(\/.*)/)[1];

        Object.assign(this, page, { exactly, pattern });
    }

    get component() {
        const key = this._moduleName + '/index.js';

        return asyncComponent((done) => {
            const loadComponent = componentCtx(key);
            loadComponent(module => done(module.default));
        });
    }
}

const pages = pageCtx.keys()
    .map(key => {
        const page = pageCtx(key);
        return Object.defineProperty(page, '_moduleName', {
            value: key.match(/^(.*)\//)[1],
            enumerable: true
        });
    })
    .sort((a, b) => {
        const { order: aOrd = Infinity } = a;
        const { order: bOrd = Infinity } = b;
        return aOrd - bOrd;
    })
    .map((page, i) => new Page(page, i === 0));

console.log(pages);

export { pages as default };

