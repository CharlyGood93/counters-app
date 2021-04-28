import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Logo } from '../../logo.svg';
import { Button } from '../../ui';

import '../../styles/components/welcome/WelcomeScreen.css';

export const WelcomeScreen = () => {

    const history = useHistory();

    const handleContinue = () => {
        history.push('/counters');
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Logo />
                </Col>
            </Row>
            <Row>
                <Col className="container-fluid__title">
                    <h4>
                        <strong>Welcome to Counters</strong>
                    </h4>
                    <p>Capture cups of lattes, frappucinos, or anything else that can be counted.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        onClick={handleContinue}>
                        Get started
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
