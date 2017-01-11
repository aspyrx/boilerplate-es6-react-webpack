import React from 'react';
import { BrowserRouter, Match } from 'react-router';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';
import pages, { pagesByName } from '~/pages';
import Header from '~/header';

import 'normalize-css/normalize.css';
import styles from './app.less';

class PageContainer extends React.Component {
    static get propTypes() {
        return {
            params: React.PropTypes.shape({
                pagename: React.PropTypes.string
            }).isRequired
        };
    }

    constructor(props) {
        super();

        const { params: { pagename = '' } } = props;
        this.state = {
            linkIncrease: false,
            page: pagesByName['/' + pagename]
        };
    }

    componentWillReceiveProps(props) {
        const { params: { pagename = '' } } = props;
        const page = pagesByName['/' + pagename];
        const { page: currPage } = this.state;

        if (page !== currPage) {
            this.setState({ page });

            if (page.index > currPage.index) {
                this.setState({ linkIncrease: true });
            } else {
                this.setState({ linkIncrease: false });
            }
        }
    }

    render() {
        const { page, linkIncrease } = this.state;
        const replaceClass = classNames(styles.replaceAnimated, {
            [styles.increase]: linkIncrease
        });

        const { Component } = page;

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
                    <div key={page.name}>
                        <Component />
                    </div>
                </ReactCSSTransitionReplace>
            </div>
        </div>;
    }
}

export default function App() {
    return <BrowserRouter>
        <Match pattern="/:pagename*" component={PageContainer} />
    </BrowserRouter>;
}

