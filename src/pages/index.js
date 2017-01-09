const componentCtx = require.context(
    'bundle-loader?lazy!.',
    true,
    /^.+\/index.js$/
);

const pageCtx = require.context('.', true, /^.+\/page.json$/);

function Page(key) {
    Object.assign(this, pageCtx(key), { key });
}

Object.defineProperty(Page.prototype, 'getComponent', {
    get: function() {
        const key = this.key.match(/^(.*)\/page.json$/)[1]
            + '/index.js';

        return function getComponent(partialNextState, done) {
            try {
                const loadComponent = componentCtx(key);
                loadComponent(module => done(null, module.default));
            } catch (err) {
                return done(err, null);
            }
        };
    }
});

const pages = pageCtx.keys().map(key => new Page(key));

export { pages as default };

