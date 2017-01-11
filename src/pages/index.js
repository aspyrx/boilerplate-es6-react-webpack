import asyncComponent from '~/components/asyncComponent';

const componentCtx = require.context(
    'bundle-loader?lazy!.',
    true,
    /^.+\/index.js$/
);

const pageCtx = require.context('.', true, /^.+\/page.json$/);

class Page {
    constructor(page, index) {
        const name = index === 0
            ? '/'
            : page.moduleName.match(/^\.(.*)/)[1];

        Object.assign(this, page, { index, name });
    }

    get Component() {
        const key = this.moduleName + '/index.js';

        return asyncComponent((done) => {
            const loadComponent = componentCtx(key);
            loadComponent(module => done(module.default));
        });
    }
}

const pagesByName = Object.create(null);
const pages = pageCtx.keys()
    .map(key => {
        const page = pageCtx(key);
        page.moduleName = key.match(/^(.*)\//)[1];
        return page;
    })
    .sort((a, b) => {
        const { order: aOrder = Infinity } = a;
        const { order: bOrder = Infinity } = b;
        return aOrder - bOrder;
    })
    .map((page, i) => {
        const p = new Page(page, i);
        pagesByName[p.name] = p;
        return p;
    });


export { pages as default, pagesByName };

