import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { getAllCounters } from '../../api/getAllCounters';
import { updateCountersById } from '../../api/updateCountersById';
import { Button, DecrementIcon, IncrementIcon } from '../../ui';

export const ListCountersScreen = ({ products }) => {

    const [counts, setCounts] = useState(0);

    const handleDecIncCounters = async (id, opt) => {
        const resp = await updateCountersById(id, opt);
        console.log(resp);
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    {
                        products.length > 1 ? <><strong>{products.length} items</strong></> : <>{products.length} item</>
                    }
                </Col>
                <Col>
                    {
                        products.reduce((a, b) => a + b.count, 0)
                    }
                    &nbsp;times
                </Col>
                <Col>
                    Icon Refresh
                </Col>
            </Row>
            <ListGroup>
                {
                    products.map((product, i) => (
                        <ListGroup.Item key={product.id}>
                            <Row className="list__product">
                                <Col className="list__product-title">
                                    {product.title}
                                </Col>
                                <Col className="list__actions">
                                    <Button
                                        className="list__count-button"
                                        color="white"
                                        disabled={product.count <= 0 ? true : false}
                                        onClick={() => handleDecIncCounters(product.id, 'dec')}
                                        size="big">
                                        <DecrementIcon fill={product.count <= 0 ? 'var(--grey)' : 'var(--app-tint)'} />
                                    </Button>
                                    <div className="list__count">
                                        <strong>{product.count}</strong>
                                    </div>
                                    <Button
                                        className="list__count-button"
                                        color="white"
                                        onClick={() => handleDecIncCounters(product.id, 'inc')}
                                        size="big">
                                        <IncrementIcon fill="var(--app-tint)" />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </Container>
    )
}
