import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './NoCountersScreen.css';

export const NoCountersScreen = () => {
    return (
        <Row className="py-8 vh-90">
            <Col className="col-md-12 text-center">
                <h4 className="color-text">
                    <strong>No counters yet</strong>
                </h4>
                <p className="color-text">
                    <q>When I started couting my blessings, my whole life turned around.</q>
                </p>
                <p className="color-text">
                    &mdash;&nbsp;Willie Nelson
                </p>
            </Col>
        </Row>
    )
}
