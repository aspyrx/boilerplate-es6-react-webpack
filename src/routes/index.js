const routes = [{
    name: '',
    path: './home.js'
}, {
    name: 'foo',
    path: './foo/index.js',
    title: 'Foo',
    routes: [{
        name: 'bar',
        path: './foo/bar.js',
        title: 'Bar'
    }]
}];

function routesReducer(parent) {
    return (arr, route) => arr.concat(flattenRoute(route, parent));
}

function flattenRoute({ routes: subRoutes, name, ...route }, parent) {
    route.pattern = `${parent}/${name}`;

    return subRoutes
        ? subRoutes.reduce(routesReducer(route.pattern), [route])
        : route;
}

const routesFlat = routes.reduce(routesReducer(''), []);

export { routes as default, routesFlat };

