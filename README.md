# boilerplate-es6-react-webpack
Boilerplate setup for ES6-React-Webpack projects.

## Usage
1. Clone the repo.
2. Install the dependencies: `npm install`
    - Or with [ied](https://github.com/alexanderGugel/ied): `ied install`

A basic [react-router](https://github.com/reactjs/react-router) project is
included, as well as several build-related scripts that can be run using
`npm run <script>` (or `ied run <script>`, if you prefer):

- `build`: builds the project and places the bundle into `./dist`
- `watch`: watches for changes, automatically rebuilding when necessary
- `live`: starts a [webpack-dev-server](https://github.com/webpack/docs/wiki/webpack-dev-server)
    and enables [hot module replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack).
    Access the server at [http://localhost:8080](http://localhost:8080).


