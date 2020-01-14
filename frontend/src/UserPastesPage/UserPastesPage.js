import React, {Component} from 'react';
import Axios from 'axios';
import './UserPastesPage.css';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";

class CurrentUserPastesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true, data: null};
    }

    get_codes = async () => {
        try {
            let response = await Axios.get('http://localhost:8080/user-pastes', {withCredentials: true});
            console.log(response.data);
            this.setState({isLoading: false, data: response.data});
        }
        catch (err) {
            console.log('awdawda');
            if (err.response && err.response.status === 403) {
                this.props.logout();
            }
        }
    };

    delete = async (id) => {
        await Axios.post('http://localhost:8080/delete-code?id=' + id, undefined, {withCredentials: true});
        this.get_codes();
    };

    componentDidMount() {
        this.get_codes();
    }

    render() {
        console.log(this.props.auth);
        console.log(this.state);
        if (!this.props.auth.logged_in) {
            return (
                <Redirect to="/" />
            );
        }

        if (this.state.isLoading) {
            return "Loading...";
        }

        return (
        <div>
        <h2 className='Sign'>MyPastes</h2>
        <ul className='List'>
            {this.state.data.map((elem) => {
                const timest = new Date(elem.added);
                return (
                    <li className="ListElem" style={{display: "flex"}}>
                        <Link to={"code/" + elem.id}  style={{
                            display: 'inline-flex', justifyContent: 'space-between',
                            alignItems: 'center', flexGrow: "1", textDecoration: "none", color: "inherit",
                        }}>
                            <span>{elem.name}</span>
                            <div style={{color: 'grey', fontSize: 16}}>
                                {moment(timest).format("HH:mm DD/MM/YYYY")}
                            </div>
                        </Link>
                        <button style={{color: "white", background: "red", border: "none", borderRadius: "3px", width: "25px", height: "25px", margin: "3px"}}
                                onClick={() => this.delete(elem.id)}>&times;</button>
                    </li>
                );
            })}
        </ul>
        </div>
        )
    }
}

CurrentUserPastesPage = connect(
    (state) => ({auth: state.authentication}),
    (dispatch) => ({logout: () => dispatch({type: "LOGOUT"})}),
)(CurrentUserPastesPage);

export {CurrentUserPastesPage};