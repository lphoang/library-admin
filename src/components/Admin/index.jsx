/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import {useRouteMatch, Switch, Route, Link, useHistory, Redirect} from 'react-router-dom'
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {useSelector} from "react-redux";
import Home from './Home'
import Login from './Login'

function Admin() {
    const match = useRouteMatch();
    const state = useSelector((state) => state);
    const history = useHistory();

    useEffect(() => {
        !state.admin.isAuthenticated
        && history.push(`${match.url}/login`);
    }, [state.admin.isAuthenticated]);

    const Error = () => {
        return (
            <h1>
                Page is not found
            </h1>
        )
    }
    return (
        <div className="h-full min-h-screen flex flex-col md:flex-col justify-between">
            <div>
                <main className="bg-gray-100 bg-opacity-100 min-h-screen ">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-1 min-h-screen">
                        <div className="px-4 py-6 sm:px-0 min-h-screen">
                            <div className="box-border p-4 border-4 bg-white rounded-md min-h-screen">
                                <div className="container my-12 mx-auto px-4 md:px-12">
                                    <Breadcrumb>
                                        <BreadcrumbItem>
                                            <Link to={`${match.url}`}>
                                                Home
                                            </Link>
                                        </BreadcrumbItem>
                                        <BreadcrumbItem>
                                            <Link to="/logout">
                                                Logout
                                            </Link>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                    <Switch>
                                        <Redirect exact from={`${match.url}`} to={`${match.url}/page=0&size=10`}/>
                                        <Route exact path={`${match.url}/page=:page?&size=:size?`} component={Home}/>
                                        <Route exact path={`${match.url}/login`} component={Login}/>
                                        <Route exact component={Error}/>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Admin;
