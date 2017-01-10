import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';
import pages from '~/pages';
import Header from '~/header';

import 'normalize-css/normalize.css';
import styles from './app.less';

class PageContainer extends Component {
    static get propTypes() {
        return {
            pathname: React.PropTypes.string.isRequired
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
        const { pathname } = props;
        const { pathname: currPathname } = this.props;
        if (pathname !== currPathname) {
            if (this.linkOrder[pathname] > this.linkOrder[currPathname]) {
                this.setState({ linkIncrease: true });
            } else {
                this.setState({ linkIncrease: false });
            }
        }
    }

    render() {
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
                </ReactCSSTransitionReplace>
                {pages.map((page, i) => {
                    const { pattern, exactly, component } = page;
                    return <Match
                        key={i}
                        exactly={exactly}
                        pattern={pattern}
                        component={component}
                    />;
                })}
            </div>
        </div>;
    }
}

export default function App() {
    return <BrowserRouter>
        <Match pattern="/" component={PageContainer} />
    </BrowserRouter>;
}

