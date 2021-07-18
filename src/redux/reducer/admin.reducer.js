import {LOGIN, CHECK_AUTH, SET_LOADING} from "../actionTypes";
import SecureLS from "secure-ls";

let ls = new SecureLS({ encodingType: "aes", isCompression: false });
let _admin_token;
let _admin_id;
try {
    _admin_token = ls.get("admin_token");
    _admin_id = ls.get("admin_id");
} catch (error) {}
const initialState = {
    admin: null,
    isAuthenticated:
        _admin_token !== null && _admin_token !== "null" &&_admin_token !== "",
    token: _admin_token || null,
    user_id: _admin_id || null,
    loading: false,
    success: null,
    errors: null
};

export default function admin(state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                admin: action.payload.user,
                success: !!action.payload.success,
                isAuthenticated: !!action.payload.success,
                token: action.payload.success ? action.payload.accessToken : null,
                user_id: action.payload.success ? action.payload.user.id : null,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case CHECK_AUTH: {
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                token: action.payload.accessToken,
                user_id: action.payload.user.id,
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        default:
            return state;
    }
}
