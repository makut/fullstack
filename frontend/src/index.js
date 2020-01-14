import React from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {authentication, currentLine, loginFormVisible} from "./reducers";
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {PastePage} from "./PastePage/PastePage";
import './index.css';
import {Head} from "./Head/Head";
import {CurrentUserPastesPage} from './UserPastesPage/UserPastesPage';
import {LoginForm} from "./LoginForm/LoginForm";
import {loadStorage, saveState} from "./Helpers/LocalStorage";
import {CodeWatcherPage} from "./CodeWatcherPage/CodeWatcherPage";

const persistedState = loadStorage();
const reducer = combineReducers({
    currentLine,
    loginFormVisible,
    authentication,
});

let store = createStore(reducer, persistedState);
store.subscribe(() => {
    saveState({authentication: store.getState().authentication});
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Head />
            <LoginForm />
            <Route exact path="/" component={PastePage} />
            <Route path="/pastes" component={CurrentUserPastesPage} />
            <Route path="/code/:codeId" component={CodeWatcherPage} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);