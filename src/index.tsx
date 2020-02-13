import React from 'react';
import ReactDOM from 'react-dom';

import './index.sass';
import * as serviceWorker from './serviceWorker';
import Routes from './config/Routes';
import StoreProvider from "./store";

ReactDOM.render(<StoreProvider><Routes /></StoreProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
