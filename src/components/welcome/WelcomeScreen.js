import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Logo } from '../../logo.svg';
import { Button } from '../../ui';

import './WelcomeScreen.css';

export const WelcomeScreen = () => {

    const history = useHistory();

    const handleContinue = () => {
        history.push('/counters');
    }

    return (
        <Container>
            <Row className="mt-5 py-5">
                <Col className="col-md-12 text-center">
                    <Logo />
                </Col>
            </Row>
            <Row className="mt-3 py-3">
                <Col className="col-md-12 text-center">
                    <h4 className="color-text">
                        <strong>Welcome to Counters</strong>
                    </h4>
                    <p className="color-text">Capture cups of lattes, frappucinos, or anything else that can be counted.</p>
                </Col>
            </Row>
            <Row className="mt-2 py-2">
                <Col className="col-md-12 text-center py-32">
                    <Button
                        onClick={handleContinue}>
                        Get started
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
