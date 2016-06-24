import React, {Component} from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';
import pages from '~/pages';
import Header from '~/components/header';

import 'normalize-css/normalize.css';
import styles from './app.less'

export default class App extends Component {
    static get propTypes() {
        return {
            children: React.PropTypes.node,
            location: React.PropTypes.object
        };
    }

    constructor() {
        super();

        this.state = {
            linkIncrease: false
        }

        this.linkOrder = {};
        pages.map(([Page, pathname], i) => this.linkOrder[pathname] = i);
    }

    componentWillReceiveProps(props) {
        const { location: { pathname } } = props;
        const currPathname = this.props.location.pathname;
        if (pathname !== currPathname) {
            if (this.linkOrder[pathname] > this.linkOrder[currPathname]) {
                this.setState({ linkIncrease: true });
            } else {
                this.setState({ linkIncrease: false });
            }
        }
    }

    render() {
        const { location: { pathname }, children } = this.props;
        const { linkIncrease } = this.state;
        const replaceClass = classNames(styles.replaceAnimated, {
            [styles.increase]: linkIncrease
        });

        return <div className={styles.containers}>
            <div className={styles.container}>
                <Header pages={pages} />
            </div>
            <div className={styles.container}>
                <ReactCSSTransitionReplace className={replaceClass}
                    transitionName={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        leave: styles.leave,
                        leaveActive: styles.leaveActive,
                        appear: styles.appear,
                        appearActive: styles.appearActive
                    }}
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={300}
                    overflowHidden={false}>
                    {children
                        ? React.cloneElement(children, { key: pathname })
                        : null
                    }
                </ReactCSSTransitionReplace>
            </div>
        </div>;
    }
}

