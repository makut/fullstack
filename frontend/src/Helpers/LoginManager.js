import Axios from "axios";

const login = async (username, password) => {
    const data = new FormData();
    data.set('username', username);
    data.set('password', password);
    await Axios.post('http://localhost:8080/login', data, {
        withCredentials: true,
    });
};

const register = async (username, password) => {
    await Axios.post('http://localhost:8080/register', {username, password}, {
        withCredentials: true,
    });
};


const logout = async () => {
    await Axios.post('http://localhost:8080/logout', {}, {
        withCredentials: true,
    });
};

export {login, logout, register};