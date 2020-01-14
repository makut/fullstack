function currentLine(state = null, action) {
    switch (action.type) {
        case "SET": {
            if (state === null || state !== action.lineno) {
                return action.lineno;
            }
            else {
                return null;
            }
        }
        default:
            return state;
    }
}


function loginFormVisible(state = false, action) {
    switch (action.type) {
        case "LOGIN_FORM": {
            return action.show;
        }
        default:
            return state;
    }
}

function authentication(state = {logged_in: false, username: null}, action) {
    switch (action.type) {
        case "LOGIN": {
            return {logged_in: true, username: action.username};
        }
        case "LOGOUT": {
            return {logged_in: false, username: null};
        }
        default:
            return state;
    }
}

export {currentLine, loginFormVisible, authentication};