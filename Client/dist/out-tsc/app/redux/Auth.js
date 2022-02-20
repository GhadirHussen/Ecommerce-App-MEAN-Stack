export class AuthState {
    constructor() {
        this.user = null;
    }
}
export var UserActionType;
(function (UserActionType) {
    UserActionType["userLogin"] = "userLogin";
    UserActionType["userRegister"] = "userRegister";
    UserActionType["userLogOut"] = "userLogOut";
    UserActionType["getUser"] = "getUser";
})(UserActionType || (UserActionType = {}));
export class AUTHACTIONS {
    constructor(payload) {
        this.payload = payload;
    }
}
export function userLogin(user) {
    return { type: UserActionType.userLogin, payload: user };
}
export function userRegister(user) {
    return { type: UserActionType.userRegister, payload: user };
}
export function userLogOut() {
    return { type: UserActionType.userLogOut, payload: null };
}
export function getUser(user) {
    return { type: UserActionType.getUser, payload: user };
}
export function authReducer(currentState = new AuthState, action) {
    const newState = Object.assign({}, currentState);
    switch (action.type) {
        case UserActionType.getUser:
            newState.user = action.payload;
            break;
        case UserActionType.userRegister:
            newState.user = action.payload;
            break;
        case UserActionType.userLogOut:
            newState.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem('MyCart');
            break;
        case UserActionType.getUser:
            newState.user = action.payload;
            break;
    }
    return newState;
    // const newState = { ...currentState };
    // switch(action.type) {
    //     case UserActionType.userLogin:
    //         newState.user = action.payload;
    //         break;
    //     case UserActionType.userRegister:
    //         newState.user = action.payload;
    //         break;
    //     case UserActionType.userLogOut:
    //         newState.user = null;
    //         localStorage.removeItem("user");
    //         break;
    //     case UserActionType.getUser:
    //         newState.user = action.payload;
    //         break;
    // }
    // return newState;
}
//# sourceMappingURL=Auth.js.map