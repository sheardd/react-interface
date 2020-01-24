import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {ep, ajaxurl} from './constants';

ReactDOM.render(<App
	type="ki"
	handle={ep.stores.testing.handle}
	nonce={ep.staff_nonce}
	wait_time={ep.stores.testing.wait_time}
	wt_updated={ep.stores.testing.wt_updated}
	/>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
