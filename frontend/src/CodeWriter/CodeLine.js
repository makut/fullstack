import React, { Component } from 'react';
import {connect} from 'react-redux';
import './CodeLine.css';

class PureCodeLine extends Component {
    markLine = (event) => {
        this.props.setLineNo(this.props.lineno);
    };

    render() {
        return (
            <div className={this.props.selected_line === this.props.lineno ? "MarkedLine" : null}>
                <span className="LineNum" onClick={this.markLine}>{this.props.lineno}.</span>&nbsp;
                {this.props.parts.map(({type, string}, i) => {
                    return <span key={i} className={"color_type".concat(type)}>
                        {type === 0 && <pre style={{display: "inline"}}>{string}</pre>}
                        {type !== 0 && <span>{string}</span>}
                    </span>
                })}
            </div>
        )
    }
}

PureCodeLine = connect(
    (state) => ({selected_line: state.currentLine}),
    (dispatch) => ({
        setLineNo: (lineno) => (dispatch({type: "SET", lineno: lineno})),
    }),
)(PureCodeLine);

export {PureCodeLine};