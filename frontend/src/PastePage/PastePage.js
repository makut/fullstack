import React, {Component} from 'react';
import {CodeWriter} from '../CodeWriter/CodeWriter';
import {Inputter} from "../Inputter/Inputter";
import './PastePage.css';

class PastePage extends Component {
    constructor(props) {
        super(props);
        this.writer = React.createRef();
    }

    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <div className="Column">
                        <Inputter submitCode={text => this.writer.current.setText(text)}/>
                    </div>
                    <div className="Column">
                        <div style={{"textAlign": "center"}}>Preview:</div>
                        <CodeWriter ref={this.writer}/>
                    </div>
                </div>
            </div>
        );
    }
}

export {PastePage};
