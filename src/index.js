import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById("root");
const ep = window.ep || null;
const ajaxurl = window.ajaxurl || null;

if (ep && ajaxurl) {
	Array.from(document.getElementById("interface-btns-container")
		.getElementsByClassName("submit-button-target"))
		.forEach(i => {
			i.addEventListener("click", e => {
				const type = e.target.getAttribute("data-type");
				const store = ep.stores[e.target.getAttribute("data-store")];
				ReactDOM.render(<App
					type={type}
					handle={store.handle}
					nonce={ep.staff_nonce}
					ajaxurl={ajaxurl}
					/>,
					root);
				root.classList.add("open");
			});
		});
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
