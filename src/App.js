import React, {Suspense} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Loading} from './components/Global/Loading'

const Admin = React.lazy(() => import(`./components/Admin`));
const Logout = React.lazy(() => import(`./components/Global/Logout`));


function App() {
    return (
        <div className="App">
            <Suspense fallback={<Loading/>}>
                <BrowserRouter>
                    <Switch>
                        {/*ADMIN */}
                        <Redirect from="/" exact to="/admin" />
                        <Route exact path="/logout" component={Logout}/>
                        <Route
                            path='/admin'
                            component={Admin}
                        />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
