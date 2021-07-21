import {LOGIN, CHECK_AUTH, SET_LOADING, GET_BOOKS, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK, SET_ERROR} from "../actionTypes";
import SecureLS from "secure-ls";

let ls = new SecureLS({ encodingType: "aes", isCompression: false });
let _admin_token;
let _admin_id;
try {
    _admin_token = ls.get("admin_token");
    _admin_id = ls.get("admin_id");
} catch (error) {}
const initialState = {
    books: null,
    createdBook: null,
    pagination: {
        currentPage: null,
        totalItems: null,
        totalPages: null,
    },
    isAuthenticated:
        _admin_token !== null && _admin_token !== "null" &&_admin_token !== "",
    token: _admin_token || null,
    admin_id: _admin_id || null,
    loading: false,
    success: null,
    errors: null
};

export default function admin(state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                success: !!action.payload.success,
                isAuthenticated: !!action.payload.success,
                token: action.payload.success ? action.payload.adminToken : null,
                admin_id: action.payload.success ? action.payload.adminId : null,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case CHECK_AUTH: {
            return {
                ...state,
                isAuthenticated: action.payload.success,
                token: action.payload.adminToken,
                admin_id: action.payload.adminId,
            };
        }
        case GET_BOOKS: {
            return {
                ...state,
                books: action.payload.books,
                pagination: {
                    currentPage: action.payload.pagination.currentPage,
                    totalItems: action.payload.pagination.totalItems,
                    totalPages: action.payload.pagination.totalPages,
                }
            }
        }
        case CREATE_BOOK: {
            return{
                ...state,
                errors: action.payload.errors,
            }
        }
        case UPDATE_BOOK: {
            return{
                ...state,
                errors: action.payload.errors,
            }
        }
        case DELETE_BOOK: {
            return{
                ...state,
                errors: action.payload.errors,
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                errors: action.payload,
            }
        }
        default:
            return state;
    }
}
