import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import Dropdown from '~/components/dropdown';
import styles from './header.less';

const { string, arrayOf, func, shape, object } = React.PropTypes;
const routeShape = {
    name: string.isRequired,
    title: string,
    routes: arrayOf(object)
};

function Logo() {
    return <div className={styles.logo}>
        <Link to='/' activeOnlyWhenExact activeClassName={styles.active}>
            Hello React!
        </Link>
    </div>;
}

function NavigationLink({ parent, name, title, children, ...props }) {
    const to = `${parent}/${name}`;
    return <Link
        to={to}
        activeOnlyWhenExact
        activeClassName={styles.active}
        {...props}
    >
        {children || title}
    </Link>;
}

NavigationLink.propTypes = {
    parent: string.isRequired,
    name: string.isRequired,
    title: string.isRequired,
    children: func
};

function DropdownButton({ parent, name, title, isOpen }) {
    function Child({ isActive }) {
        const classes = classNames(styles.button, {
            [styles.active]: isActive,
            [styles.open]: isOpen
        });

        const onClick = event => event.preventDefault();

        return <a className={classes} href='' onClick={onClick}>
            {title}
        </a>;
    }

    Child.propTypes = {
        isActive: React.PropTypes.bool
    };

    return <NavigationLink
        parent={parent}
        name={name}
        title={title}
        activeOnlyWhenExact={false}
        children={Child}
    />;
}

DropdownButton.propTypes = {
    parent: string.isRequired,
    name: string.isRequired,
    title: string.isRequired,
    isOpen: React.PropTypes.bool
};

function DropdownMenu({ parent, name, title, routes }) {
    return <div className={styles.menu}>
        <NavigationLink parent={parent} name={name} title={title} />
        {renderRoutes(routes, `${parent}/${name}`)}
    </div>;
}

DropdownMenu.propTypes = {
    parent: string.isRequired,
    name: string.isRequired,
    title: string.isRequired,
    isOpen: React.PropTypes.bool,
    routes: arrayOf(shape(routeShape))
};

function renderRoutes(routes, parent) {
    return routes.filter(route =>
        'title' in route
    ).map(({ routes: subRoutes, title, name }, i) => {
        if (!subRoutes) {
            return <NavigationLink
                key={i}
                parent={parent}
                name={name}
                title={title}
            />;
        }

        const button = <DropdownButton
            parent={parent}
            name={name}
            title={title}
        />;

        const { enter, enterActive, leave, leaveActive } = styles;

        return <Dropdown
            key={i}
            className={styles.dropdown}
            button={button}
            transitionName={{
                enter, enterActive, leave, leaveActive
            }}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
            <DropdownMenu
                parent={parent}
                name={name}
                title={title}
                routes={subRoutes}
            />
        </Dropdown>;
    });
}

export default function Header({ routes }) {
    return <div className={styles.header}>
        <div className={styles.navigation}>
            <Logo />
            {renderRoutes(routes, '')}
        </div>
    </div>;
}

Header.propTypes = {
    routes: arrayOf(shape({
        name: string.isRequired,
        title: string,
        routes: arrayOf(shape(routeShape))
    }))
};

