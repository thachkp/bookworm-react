import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware} from "redux";
import decode from "jwt-decode";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import { userloggedIn } from './actions/auth';



const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.bookwormJWT) {
    const payload = decode(localStorage.bookwormJWT);

    const user = { 
        token: localStorage.bookwormJWT, 
        email: payload.email, 
        confirmed: payload.confirm 
    };
    store.dispatch(userloggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
