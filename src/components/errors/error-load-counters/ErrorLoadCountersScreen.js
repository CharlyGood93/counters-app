import React, { useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';
import { Button } from '../../../ui';

import './ErrorLoadCountersScreen.css';

export const ErrorLoadCountersScreen = (props) => {

    const handleRetryGetCounters = async () => {
        await props.countersData();
    }

    return (
        <Row className="py-10 vh-80">
            <Col className="text-center">
                <h3>
                    <strong>Couldn't load the counters</strong>
                </h3>
                <p>
                    The internet connection appears to be offline.
                </p>
                <Button color="white">
                    <span
                    onClick={handleRetryGetCounters} 
                    style={{ color: "var(--app-tint)" }}
                    >Retry</span>
                </Button>
            </Col>
        </Row>
    )
}
