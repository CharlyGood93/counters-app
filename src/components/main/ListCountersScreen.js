import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { getAllCounters } from '../../api/getAllCounters';
import { updateCountersById } from '../../api/updateCountersById';
import { Alert, Button, DecrementIcon, IncrementIcon, useAlert } from '../../ui';
import { RefreshIcon } from '../../ui/Icons/RefreshIcon';

export const ListCountersScreen = ({ products }) => {

    console.log(products)

    const [dataProducts, setDataProducts] = useState(products);
    const [refreshList, setRefreshList] = useState(false);
    const [showErrorUpdate, setShowErrorUpdate] = useState(false);
    const [retryUpdateCounters, setRetryUpdateCounters] = useState(products);

    const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();

    useEffect(() => {
        countersData();
    }, []);

    const handleDecIncCounters = async (item, opt) => {
        const resp = await updateCountersById(item.id, opt);
        if (resp.status === 200) {
            products.map((currentValue) => {
                if (currentValue.id === item.id) {
                    currentValue.count = resp.data.count;
                    setDataProducts({ currentValue });
                }
            });
        } else {
            if (opt === 'inc') {
                item.count += 1;
                item.opt = opt;
            } else {
                item.count -= 1;
                item.opt = opt;
            }
            setRetryUpdateCounters(item);
            setShowErrorUpdate(true);
            showAlert(true);
        }
    }

    const countersData = async () => {
        const data = await getAllCounters();
        setDataProducts(data);
    }

    const handleRefreshList = async () => {
        setRefreshList(true);
        await countersData();
        setTimeout(() => {
            setRefreshList(false);
        }, 1000);
    }

    const handleRetryUpdate = async (item) => {
        await handleDecIncCounters(item, item.opt);
        setShowErrorUpdate(false);
    }

    const handleDismissUpdate = () => {
        setShowErrorUpdate(false);
        hideAlert(true);
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
                                        onClick={() => handleDecIncCounters(product, 'dec')}
                                        size="big">
                                        <DecrementIcon fill={product.count <= 0 ? 'var(--grey)' : 'var(--app-tint)'} />
                                    </Button>
                                    <div className="list__count">
                                        <strong>{product.count}</strong>
                                    </div>
                                    <Button
                                        className="list__count-button"
                                        color="white"
                                        onClick={() => handleDecIncCounters(product, 'inc')}
                                        size="big">
                                        <IncrementIcon fill="var(--app-tint)" />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            {
                showErrorUpdate ?
                    <>
                        <Alert isVisible={isAlertVisible}>
                            <Alert.Title>
                                <p>
                                    Couldn't update <q>{retryUpdateCounters.title}</q> to {retryUpdateCounters.count}
                                </p>
                            </Alert.Title>
                            <Alert.Message>
                                The internet connection appears to be offline.
                                </Alert.Message>
                            <Alert.Actions>
                                <Button onClick={() =>
                                    handleRetryUpdate(retryUpdateCounters)}>
                                    Retry
                                    </Button>
                                <Button color="white" kind="flat" onClick={handleDismissUpdate}>
                                    Dismiss
                                </Button>
                            </Alert.Actions>
                        </Alert>
                    </> : <></>
            }
        </Container>
    )
}
