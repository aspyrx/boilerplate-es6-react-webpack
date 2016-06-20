import Home from './home';
import Example from './example';

const pages = [
    [Home, '/home', 'Home'],
    [Example, '/example', 'Example']
]

Object.defineProperties(pages, {
    indexPath: {
        value: '/home'
    }
});

export default pages;

