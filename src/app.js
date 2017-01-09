import React, { Component } from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';
import pages from '~/pages';
import Header from '~/header';

import 'normalize-css/normalize.css';
import styles from './app.less';

class PageContainer extends Component {
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
        };

        this.linkOrder = {};
        pages.forEach((page, i) => (this.linkOrder[page.path] = i));
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

export default function App() {
    return <Router history={browserHistory}>
        <Route path="/" component={PageContainer}>
            <IndexRedirect to={pages[0].path} />
            {pages.map((page, i) => {
                const { path, getComponent } = page;
                return <Route key={i}
                    path={path}
                    getComponent={getComponent}
                />;
            })}
        </Route>
    </Router>;
}

