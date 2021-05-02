import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Loading } from '../../ui';

import './LoadingScreen.css';

export const LoadingScreen = ({ classNameTitle }) => {
    return (
        <Row className={classNameTitle}>
            <Col className="col-md-12 d-flex justify-content-center align-items-center">
                <Loading />
            </Col>
        </Row>
    )
}
