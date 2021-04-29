import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { getAllCounters } from '../../api/getAllCounters';
import { updateCountersById } from '../../api/updateCountersById';
import { Button, DecrementIcon, IncrementIcon } from '../../ui';
import { RefreshIcon } from '../../ui/Icons/RefreshIcon';

export const ListCountersScreen = ({ products }) => {

    console.log(products)

    const [dataProducts, setDataProducts] = useState(products);
    const [refreshList, setRefreshList] = useState(false);

    const handleDecIncCounters = async (id, opt) => {
        const resp = await updateCountersById(id, opt);
        console.log(resp);
        products.map((currentValue) => {
            if (currentValue.id === id) {
                currentValue.count = resp.data.count;
                setDataProducts({ currentValue });
            }
        });
    }

    const handleRefreshList = async () => {
        console.log('Youre click me');
        setRefreshList(true);
        // Here I need to call the api get
        setTimeout(() => {
            setRefreshList(false);
        }, 1000);
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    {
                        products.length > 1 ?
                            <><strong>{products.length} items</strong></> : <><strong>{products.length} item</strong></>
                    }
                </Col>
                <Col>
                    {
                        products.reduce((a, b) => a + b.count, 0)
                    }
                    &nbsp;times
                </Col>
                <Col className="icon-refresh" onClick={handleRefreshList}>
                    {
                        refreshList ? <><RefreshIcon fill="var(--app-tint)" />&nbsp;<small style={{ color: 'var(--app-tint)' }}>Refreshing...</small> </> :
                            <RefreshIcon />
                    }
                </Col>
            </Row>
            <ListGroup>
                {
                    products.map((product) => (
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
