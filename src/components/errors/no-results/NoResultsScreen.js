import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './NoResultsScreen.css';

export const NoResultsScreen = () => {
    return (
        <Row className="vh-80">
            <Col className="col-md-12 d-flex justify-content-center align-items-center">
                <h3>
                    No results
                </h3>
            </Col>
        </Row>
    )
}
