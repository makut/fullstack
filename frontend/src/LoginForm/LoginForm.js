import React, {Component} from 'react';
import './LoginForm.css';
import {connect} from "react-redux";
import {login, register} from "../Helpers/LoginManager";

class InputField extends React.Component {
    render() {
        return (
            <div className="InputField">
                <span className="FieldName">{this.props.field_name}</span>
                <input className="Input"
                    type={this.props.input_type} placeholder={this.props.field_name}
                       onChange={e => this.props.onChange(e.target.value)}
                />
            </div>
        )
    }
}

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    setUsername = username => this.setState({username});
    setPassword = password => this.setState({password});

    submitLogin = (ev) => {
        ev.preventDefault();
        this.props.onSubmit && this.props.onSubmit(this.state.username, this.state.password);
    };

    render() {
        return (
            <form className="inner-container">
                <div>
                    Login
                </div>
                <div>
                    <InputField field_name="Username" input_type="text" onChange={this.setUsername}/>
                    <InputField field_name="Password" input_type="password" onChange={this.setPassword}/>

                    <button className="Button"
                        type="submit"
                        onClick={this.submitLogin}>Login</button>
                </div>
            </form>
        );
    }
}

class RegisterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    setUsername = username => this.setState({username});
    setPassword = password => this.setState({password});

    submitLogin = (ev) => {
        ev.preventDefault();
        this.props.onSubmit && this.props.onSubmit(this.state.username, this.state.password);
    };

    render() {
        return (
            <form className="inner-container">
                <div>
                    Registration
                </div>
                <div>
                    <InputField field_name="Username" input_type="text" onChange={this.setUsername}/>
                    <InputField field_name="Password" input_type="password" onChange={this.setPassword}/>

                    <button className="Button"
                            type="submit"
                            onClick={this.submitLogin}>Sign up</button>
                </div>
            </form>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {fault_message: false, curr_wind: 'login'};
    }

    closePopup = (event) => {
        this.setState({fault_message: false});
        this.props.hideLoginForm();
    };

    onSubmit = (username, password) => {
        login(username, password).then(r => {
            this.props.onLogin(username);
            this.props.hideLoginForm();
        }).catch(err => {
            this.setState({fault_message: true});
        });
    };

    registerSubmit = async (username, password) => {
        console.log("r");
        try {
            await register(username, password);
            console.log("2");
            await login(username, password);
            console.log("3");
        } catch (e) {
            this.setState({fault_message: true});
            throw e;
        }

        this.props.onLogin(username);
        this.props.hideLoginForm();
    };

    render() {
        const getClass = (filter) => "SwitchButton" + (this.state.curr_wind === filter ? " Active" : "");

        return (
            !this.props.is_visible ? null :
            <div className="LoginForm">
                <div className="LoginFormInner">
                    <audio autoPlay src="https://krolik.sunproxy.net/listen/bHdKTHNZWUZjejNjbkFaWEtjbmV0a0t6TlphalVKbXB5aWFYUUIrc09tcC8yUHhoUlREL3NHZDJDZE9WYmVzZk5uY3pScVJuQVMvTEFVMG1mUEI1UThObHFWTmxVUEI0dXcxQStmekNZOVU9/aleksandr-pistoletov-iz-rossii-v-ukrainu_(Krolik.biz).mp3">www</audio>
                    <button onClick={() => this.setState({curr_wind: 'login', fault_message: false})}
                            className={getClass("login") + " ru"}>
                    Login
                    </button>
                    <button onClick={() => this.setState({curr_wind: 'register', fault_message: false})}
                            className={getClass("register") + " ua"}>
                        Register
                    </button>
                    <button className="CloseButton" onClick={this.closePopup}>
                        &times;
                    </button>
                    {this.state.curr_wind === 'login' ?
                        <LoginBox onSubmit={this.onSubmit}/> :
                        <RegisterBox onSubmit={this.registerSubmit} />}

                    {this.state.fault_message && <div className="UnableSign">
                        {this.state.curr_wind === "login" ?
                            "Unable to log in. Check login/password." :
                            "Unable to register"}
                    </div>}
                </div>
            </div>
        )
    }
}

LoginForm = connect(
    (state) => ({is_visible: state.loginFormVisible}),
    (dispatch) => ({
        hideLoginForm: () => (dispatch({type: "LOGIN_FORM", show: false})),
        onLogin: (username) => dispatch({type: "LOGIN", username}),
    }),
)(LoginForm);

export {LoginForm};