/* eslint-disable eqeqeq */
import {LOGIN, CHECK_AUTH, GET_BOOKS, GET_BOOKS_BY_TITLE, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK} from '../actionTypes'
import { setLoading } from "./commonAction";
import axios from "axios";

//-----------------------------------------
const url = process.env.REACT_APP_BASE_URL;

export const login = async (dispatch, user, setToken, setAdminId) => {
    setLoading(dispatch, true);
    try{
        const response = await axios({
            method: "POST",
            url: `${url}/admin/login`,
            headers: {
                "Content-Type": " application/json"
            },
            data: {
                email: user.email,
                password: user.password
            }
        });
        setToken(
            response.data.accessToken
        );
        setAdminId(
            response.data.user.id
        );
        dispatch({
            type: LOGIN,
            payload: {
                adminId: response.data.user.id,
                adminToken: response.data.accessToken,
                success: response.data.user.enabled,
                errors: response.data.errors,
            }
        });
        setLoading(dispatch, false);
    }
    catch(e){
        
    }
};
//-----------------------------------------

export let checkAuth;
checkAuth = async (dispatch, _token, _admin_id) => {
    let admin_token = _token;
    let admin_id = _admin_id;
    admin_token != null && admin_token !== "null" && admin_token !== ""
        ? await dispatch({
            type: CHECK_AUTH,
            payload: {
                isAuthenticated: true,
                admin_id,
                admin_token,
            }
        })
        : await dispatch({
            type: CHECK_AUTH,
            payload: {
                isAuthenticated: false,
                admin_id: null,
                admin_token: null,
            }
        });
};


//-----------------------------------------
export const getBooks = async (dispatch, page, size) => {
    setLoading(dispatch, true);
    try{
        const response = await axios(`${url}/books?page=${page}&size=${size}`)
        dispatch({
            type: GET_BOOKS,
            payload:{
                books : response.data.data,
                pagination: {
                    currentPage: response.data.currentPage,
                    totalItems: response.data.totalItems,
                    totalPages: response.data.totalPages,
                }
            } 
        })
        setLoading(dispatch, false);
    }catch(e){
        
    }
}


//-----------------------------------------
export const createBook = async (dispatch, book, token) => {
    setLoading(dispatch, true);
    try{
        const response = await axios({
            method: "POST",
            url: `${url}/admin/books/add`,
            data: {
                title: book.title,
                author: book.author,
                bookGenre: book.bookGenre,
                price: book.price,
                score: book.score,
                thumbnail: book.thumbnail,
                description: book.description,
                releaseDate: book.releaseDate
            },
            headers: {
                "Content-Type": " application/json",
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({
            type: CREATE_BOOK,
            payload: response.data
        })
        setLoading(dispatch, false);
    }catch(e){
        setLoading(dispatch, false);
        dispatch({
            type: CREATE_BOOK,
            payload: {
                errors: e.response.data.message
            }
        });
    }
}

//-----------------------------------------
export const updateBook = async (dispatch, book, token, id) => {
    setLoading(dispatch, true);
    try{
        const response = await axios({
            method: "PUT",
            url: `${url}/admin/books/update/${id}`,
            data: {
                title: book.title,
                author: book.author,
                bookGenre: book.bookGenre,
                price: book.price,
                score: book.score,
                thumbnail: book.thumbnail,
                description: book.description,
                releaseDate: book.releaseDate
            },
            headers: {
                "Content-Type": " application/json",
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({
            type: UPDATE_BOOK,
            payload: response.data
        })
        setLoading(dispatch, false);
    }catch(e){
        setLoading(dispatch, false);
        dispatch({
            type: UPDATE_BOOK,
            payload: {
                errors: e.response.data.message
            }
        });
    }
}

//-----------------------------------------
export const deleteBook = async (dispatch, token, id) => {
    setLoading(dispatch, true);
    try{
        const response = await axios({
            method: "DELETE",
            url: `${url}/admin/books/delete/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        dispatch({
            type: DELETE_BOOK,
            payload: response.data
        })
        setLoading(dispatch, false);
    }catch(e){
        setLoading(dispatch, false);
        dispatch({
            type: DELETE_BOOK,
            payload: {
                errors: e.response.data.message
            }
        });
    }
}

//----------------------------------------------------
export const getBooksByTitle = async (dispatch, title) => {
    setLoading(dispatch, true);
    try{
        const res = await axios({
            method: "GET",
            url: `${url}/books/search?t=${title}`
        })
        dispatch({
            type: GET_BOOKS_BY_TITLE,
            payload: res.data,
        })
        setLoading(dispatch, false);
    }catch(e) {
        console.log(e)
    }
}