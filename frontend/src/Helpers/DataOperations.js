import Axios from "axios";

const postCode = async (code, title, success_callback, fail_callback) => {
    const curr_time = Date.now();
    try {
        await Axios.post(
            'http://localhost:8080/add-code',
            {code: code, name: title, added: curr_time},
            {withCredentials: true},
        );
    }
    catch (err) {
        fail_callback(err);
        return;
    }
    success_callback();
};

const getCode = async (code_id) => {
    return (await Axios.get(
        'http://localhost:8080/get-code',
        {
            withCredentials: true,
            params: {id: code_id},
        },
    )).data;
};

export {postCode, getCode};
