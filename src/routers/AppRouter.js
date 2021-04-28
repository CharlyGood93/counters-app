import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react'
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';
import { MainScreen } from '../components/main/MainScreen';

export const AppRouter = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={WelcomeScreen} />
                    <Route exact path="/counters" component={MainScreen} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    )
}
