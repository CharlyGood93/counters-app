import React, { useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Button, DecrementIcon, IncrementIcon } from '../../ui';

export const ListCountersScreen = ({ products }) => {

    const [counter, setCounter] = useState();

    const handleDecrementCount = (count) => {
        console.log('Decrement counters');
    }

    const handleIncrementCount = (count) => {
        console.log('Increment counters');
    }

    return (
        <Container fluid>
            <Row style={{ alignContent: 'center' }}>
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
                            <Row>
                                <Col>
                                    {product.title}
                                </Col>
                                <Col>
                                    <Button size="big" color="white">
                                        <DecrementIcon fill="var(--app-tint)" />
                                    </Button>
                                    {product.count}
                                    <Button size="big" color="white">
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
