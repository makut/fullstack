import React, {Component} from 'react';
import {CodeWriter} from "../CodeWriter/CodeWriter";
import {getCode} from "../Helpers/DataOperations";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import './CodeWatcher.css';

class CodeWatcherPage extends Component {
    constructor(props) {
        super(props);
        this.state = {codeinfo: null};
    }

    componentDidMount() {
        const id = this.props.match.params.codeId;
        getCode(id).then(result => {this.setState({codeinfo: result})});
    }

    render() {
        if (!this.props.auth.logged_in) {
            return (
                <Redirect to="/" />
            );
        }

        if (this.state.codeinfo === null) {
            return "Loading......";
        } else {
            return <div className="CodeWatcher">
                <h2 className="Title">{this.state.codeinfo.name}</h2>
                <CodeWriter initialCode={this.state.codeinfo.code} />
            </div>
        }
    }
}

CodeWatcherPage = connect(
    (state) => ({auth: state.authentication}),
    (dispatch) => ({}),
)(CodeWatcherPage);

export {CodeWatcherPage};