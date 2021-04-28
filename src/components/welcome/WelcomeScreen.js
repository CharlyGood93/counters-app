import React from 'react';
import { useHistory } from 'react-router-dom';

import './WelcomeScreen.css';

import { ReactComponent as Logo } from '../../logo.svg';
import { Button } from '../../ui';

export const WelcomeScreen = () => {

    const history = useHistory();

    const handleContinue = () => {
        console.log('Click!');
        history.push('/counters');
    }

    return (
        <main className="welcome-screen">
            <Logo className="welcome-screen__img" />
            <h2 className="welcome-screen__title">
                <strong>Welcome to Counters</strong>
            </h2>
            <p className="welcome-screen__subtitle">Capture cups of lattes, frappucinos, or anything else that can be counted.</p>
            <Button
                className="welcome-screen__continue-btn"
                onClick={handleContinue}
            >
                Get started
            </Button>
        </main>
    )
}
