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

