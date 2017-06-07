# boilerplate-es6-react-webpack
Boilerplate setup for ES6-React-Webpack projects.

Thanks to `webpack@^2` and friends, this project supports tree shaking, hot
module replacement, dynamic requires, code splitting, and more.

## Usage
1. Clone the repo.
2. Install the dependencies: `npm install`

Several build-related scripts can be run using `npm run <script>`:
- `build`: builds the project and places the bundle into `./dist`
- `dist`: same as above, excepts does production-level optimizations
- `start`: starts a server that serves the built bundle in `./dist`
- `watch`: watches for changes, automatically rebuilding when necessary
- `live`: starts a [webpack-dev-server](https://github.com/webpack/docs/wiki/webpack-dev-server)
    and enables [hot module replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack).
    Access the server at [http://localhost:8080](http://localhost:8080).

## Development

### File manifest

- `src/` (`webpack` alias: `~`): App source files.
    - `index.html`: Top-level app page. App will be injected into this HTML.
    - `index.{js,less}`: App entry point. Creates the container for the app and
      renders the app itself.
    - `base.less`: Contains top-level LESS variable definitions for inclusion
      in other files.
    - `app.{js,less}`: Contains the top-level router (`BrowserRouter` from
      `react-router`) and renders the routes, header, footer, and app styling.
    - `routes/`: Contains all routes. The (static) routes are created
      automatically by recursively locating all `route.json` files. Additional
      (dynamic) routing can be done with typical `react-router` components.
      - `**/route.json`: Contains route configuration data. Fields:
        - `title`: The title for the page, as used in the site navigation.
    - `routeConfig.js`: Implements the static route configuration.
    - `{header,footer}.{js,less}`: Contains header and footer.
    - Several reusable components are implemented in `components/`:
        - `asyncComponent.js`: A higher-order component meant for usage with
          webpack's `bundle-loader`'s `lazy` option.
        - `spinner.{js,less}`: A loading spinner, meant as a placeholder while
          a component is still loading.
        - `NotFound.js`: A generic 404 page.
        - `modal.js`: A generic modal component.
        - `dropdown.js`: A generic dropdown component.
    - `.eslintrc.json`: `eslint` configuration for app source files.
- `dist/`: `webpack` bundle output directory. This directory should be served
  directly (i.e. without `dist/` in the path).
- `public/` (`webpack` alias: `public`): Put all public, static resources here.
  This is meant for large files, such as images or documents, that should NOT
  bundled using `webpack`.  Instead, this directory should be served directly
  (i.e. without `public/` in the path).
- `vendor/` (`webpack` alias: `^`)
    - All vendored assets (fonts, styles, libraries, etc.) go here.
- `loaders/` (`webpack` alias (loaders only): `>`)
    - `markdown-react-loader.js`: Small loader that converts markdown into a
      stateless React component using `marked`.
    - `public-loader.js`: Small loader that replaces `require`s to resources in
      the `publicDir` with a direct path to the resource.
- `build.js`: Script for building the app.
- `server.js`: Script for serving the bundled app.
- `package.json`: Node.js package configuration file.
- `package-lock.json`: NPM package lock file.
- `.babelrc`: `babel` configuration.
- `.eslintrc.json`: Top-level `eslint` configuration.
- `.tern-project`: Tern.js configuration.
- `webpack.config{,.base,.live,.production}.js`: Webpack configuration for
  various environments.
- `.gitignore`: Files to ignore when commiting in `git`.
- `README.md`: You're looking at it.

