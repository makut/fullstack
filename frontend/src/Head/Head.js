import React, {Component} from 'react';
import './Head.css';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {logout} from "../Helpers/LoginManager";

class LoginStateShower extends Component {
    loginButton = (event) => {
        this.props.showLoginForm();
    };

    onSubmit = () => {
        logout().then(r => {
            this.props.onLogout();
        });
    };

    render() {
        const is_logged_in = this.props.auth.logged_in;
        const username = this.props.auth.username;

        return (
            <div>
            {is_logged_in ? (
                <span>
                    <Link to={"/pastes"} className="MyPastesButton">{username}'s pastes</Link>
                    <button className="LogoutButton" onClick={this.onSubmit}>Logout</button>
                </span>
            ) : (
            <button className="LoginFormButton" onClick={this.loginButton}>Authorization</button>
            )}
            </div>
        )
    }

}

LoginStateShower = connect(
    (state) => ({auth: state.authentication}),
    (dispatch) => ({
        showLoginForm: () => (dispatch({type: "LOGIN_FORM", show: true})),
        onLogout: () => dispatch({type: "LOGOUT"}),
    }),
)(LoginStateShower);

class Head extends Component {
    render() {
        return (
            <div className="Head">
                <Link to="/" className="MainPageLink"><h2>PasteMax</h2></Link>
                <LoginStateShower />
            </div>
        )
    }
}

export {Head};