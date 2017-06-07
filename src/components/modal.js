import React from 'react';
import { string, bool, arrayOf, element } from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

function FirstChild({ children }) {
    return children[0] || null;
}

FirstChild.propTypes = {
    children: arrayOf(element)
};

export default class Modal extends React.Component {
    constructor() {
        super();

        this.state = { isOpen: false };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    addWindowHandler() {
        if (this.props.noWindowHandler) {
            return;
        }

        window.addEventListener('click', this.close);
        this.hasWindowHandler = true;
    }

    removeWindowHandler() {
        if (this.hasWindowHandler) {
            window.removeEventListener('click', this.close);
            delete this.hasWindowHandler;
        }
    }

    open(event) {
        event.stopPropagation();

        this.setState({ isOpen: true }, () => {
            this.addWindowHandler();
        });
    }

    close() {
        this.removeWindowHandler();
        this.setState({ isOpen: false });
    }

    componentWillUnmount() {
        this.removeWindowHandler();
    }

    render() {
        const { isOpen } = this.state;
        const { className, button, children, ...rest } = this.props;

        const modal = isOpen
            ? React.cloneElement(children, { isOpen, close: this.close })
            : null;

        return <span className={className}>
            {React.cloneElement(button, { isOpen, open: this.open })}
            <CSSTransitionGroup
                component={FirstChild}
                {...rest}
            >
                {modal}
            </CSSTransitionGroup>
        </span>;
    }
}

Modal.propTypes = {
    className: string,
    button: element.isRequired,
    children: element.isRequired,
    noWindowHandler: bool
};

