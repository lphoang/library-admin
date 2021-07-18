/* eslint-disable eqeqeq */
import {LOGIN, CHECK_AUTH} from '../actionTypes'
import { setLoading } from "./commonAction";
import axios from "axios";

//-----------------------------------------
const url = process.env.REACT_APP_BASE_URL;

export const login = async (dispatch, user, setToken, setUserId) => {
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
            response.data.success ? response.data.accessToken : null
        );
        setUserId(
            response.data.success ? response.data.user.id : null
        );
        dispatch({
            type: LOGIN,
            payload: {
                user: response.data.user,
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

