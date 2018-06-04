import 'babel-polyfill';
import React from 'react';
import Loadable from 'react-loadable';
import createHistory from 'history/createBrowserHistory';

import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import './styles/main.scss';
import routes from './routes';
import { configureStore } from './store/configureStore';

let preloadedState = {};
if (!window.__PRELOADED_STATE__.STATE_NOT_LOADED) {
    preloadedState = JSON.parse(window.atob(window.__PRELOADED_STATE__));
}
delete window.__PRELOADED_STATE__;

const history = createHistory();
const store = configureStore(preloadedState, history);

window.onload = () => {
    Loadable.preloadReady().then(() => (
        hydrate(
            <Provider store={store}>
                <Router history={history}>
                    {routes}
                </Router>
            </Provider>,
            document.getElementById('root')
        )
    ));
};
