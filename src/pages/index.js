import Home from './home';

const pages = [
    [Home, '/home', 'Home']
]

Object.defineProperties(pages, {
    indexPath: {
        value: '/home'
    }
});

export default pages;

