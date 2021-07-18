import React, {useState, useEffect} from "react";
import {login} from '../../../redux/action/admin.action'
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Loading} from "../../Global/Loading";
import {useSecureLs} from "../../Global/useSecureLs"

function Login() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [token, setToken] = useSecureLs("admin_token"); // eslint-disable-line
    const [userId, setUserId] = useSecureLs("admin_id"); // eslint-disable-line

    const onSubmitHandler = (e) => {
        e.preventDefault();
        login(dispatch, user, setToken, setUserId);
    };
    let history = useHistory();
    useEffect(() => {
        state.admin.isAuthenticated && history.push("/admin");
    }, [state.admin.isAuthenticated]); // eslint-disable-line

    useEffect(() => {
        document.title = `Admin Login`;
    }, []); // eslint-disable-line
    return (
        <div className="w-full bg-gray-100 flex flex-col justify-center items-center py-24">
            {state.admin.loading && <Loading/>}
            <h1 className="text-3xl font-semibold text-center">
                Sign In To Your Account
            </h1>

            <form
                className="w-11/12 sm:w-10/12 lg:w-9/12 xl:w-8/12 bg-gray-200 p-10 rounded-sm  mt-10 border shadow-lg"
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="email" className="block">
                    E-mail:{" "}
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="p-2 w-full border border-gray-400 focus:outline-none focus:border-black"
                    aria-required="true"
                    onChange={(e) =>
                        setUser({...user, email: e.target.value})
                    }
                />

                <label htmlFor="password" className="block mt-5">
                    Password:{" "}
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="p-2 w-full border border-gray-400 focus:outline-none focus:border-black"
                    aria-required="true"
                    onChange={(e) =>
                        setUser({...user, password: e.target.value})
                    }
                />

                <div className="mt-5 flex flex-col md:flex-row justify-center items-center">
                    <button
                        className="text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase text-sm px-12 py-4 shadow
                    hover:shadow-lg"
                        type="submit"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
