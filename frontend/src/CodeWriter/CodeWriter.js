import React, { Component } from  'react';
import './CodeWriter.css';
import {PureCodeLine} from "./CodeLine";
import {divideToComponents} from "../PythonParser";

class CodeWriter extends Component {
    constructor(props) {
        super(props);
        if ('initialCode' in props) {
            this.state = {text: props.initialCode};
        }
        else {
            this.state = {text: ""};
        }
    }

    setText(text) {
        this.setState({text: text});
    }

    render() {
        console.log(this.state.text);
        let parsed = divideToComponents(this.state.text);
        let lines = [[]];
        parsed.forEach((element) => {
            if (element.type === 0 && element.string === '\n') {
                lines.push([]);
            }
            else {
                lines[lines.length - 1].push(element);
            }
        });
        lines.pop();
        return (
            <div className="Box">
                {lines.map((line, i) => {
                    return <PureCodeLine key={i} lineno={i + 1} parts={line} />
                })}
            </div>
            );
    }
}

export {CodeWriter};