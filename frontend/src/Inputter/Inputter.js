import React, { Component } from 'react';
import './Inputter.css';
import {postCode} from "../Helpers/DataOperations";
import {connect} from "react-redux";

class Inputter extends Component {
    constructor(props) {
        super(props);

        this.state = {value: '', title: '', error_message: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    successCallback = () => {
        this.setState({value: '', title: '', error_message: false});
    }

    failCallback = (err) => {
        if (err.response && err.response.status === 403) {
            this.props.logout();
        }

        this.setState({error_message: true});
    };

    async sendToServer(event) {
        await postCode(this.state.value, this.state.title, this.successCallback, this.failCallback);
    }

    handleKeyDown(event) {
        if (event.keyCode === 9) {
            event.preventDefault();
            let curr_str = this.state.value;
            let start = event.target.selectionStart;
            let end = event.target.selectionEnd;
            this.setState({
                value: curr_str.substring(0, start) +
                       ' '.repeat(4) +
                       curr_str.substring(end)
            },
            () => {
                this.input.selectionStart = this.input.selectionEnd = start + 4;
            });
        }

        if (event.keyCode === 13 && event.ctrlKey) {
            event.preventDefault();
            this.props.submitCode(this.state.value);
        }
    }

    componentDidMount() {
        this.input.focus();
    }

    render() {
        return (
            <div>
                <div className="PasteSign">Paste code:</div>
                <textarea className="CodeInput" spellCheck="false"
                          value={this.state.value} onChange={this.handleChange}
                          onKeyDown={this.handleKeyDown}
                          ref={(input) => {this.input = input;}}
                />
                <label style={{'fontSize': '1.7ex', 'marginLeft': '2.5vw'}}>
                    Title:
                    <input className="NameInput" spellCheck="false"
                           value={this.state.title} onChange={this.handleTitleChange}
                    />
                </label>
                <div className="Buttons">
                    <button className="Button" onClick={this.sendToServer}>
                        Submit
                    </button>
                    <button className="Button"
                            onClick={() => this.props.submitCode(this.state.value)}>
                        Preview
                    </button>
                </div>

                {this.state.error_message &&
                <div style={{color: 'red'}}>You are not logged in or some error occurred.</div>}
            </div>
        )
    }
}

Inputter = connect(
    (state) => ({}),
    (dispatch) => ({
        logout: () => dispatch({type: "LOGOUT"}),
    }),
)(Inputter);

export {Inputter};