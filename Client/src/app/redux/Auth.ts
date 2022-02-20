import UserModel from "../models/user.Model";
import {Action} from '@ngrx/store';


export class AuthState {
    public user: UserModel = null;
}

export enum UserActionType {
    userLogin = "userLogin",
    userRegister = "userRegister",
    userLogOut = "userLogOut",
    getUser = "getUser",
}

export interface UserActions  {
    type: UserActionType,
    payload?: any
}


export function userLogin (user: UserModel):UserActions {
    return {type: UserActionType.userLogin ,payload:user}
}

export function userRegister (user: UserModel):UserActions {
    return {type: UserActionType.userRegister ,payload:user}
}

export function userLogOut ():UserActions {
    return { type: UserActionType.userLogOut ,payload:null};
}

export function getUser (user: UserModel):UserActions {
    
    return {type: UserActionType.getUser ,payload:user}
}

export function authReducer (currentState: AuthState = new AuthState, action: UserActions): AuthState {


    const newState = { ...currentState };

    switch(action.type) {
        
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

}

