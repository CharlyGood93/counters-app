import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row, Table } from 'react-bootstrap';
import { getAllCounters } from '../../api/getAllCounters';
import { updateCountersById } from '../../api/updateCountersById';
import { Alert, Button, DecrementIcon, IncrementIcon, useAlert } from '../../ui';
import { RefreshIcon } from '../../ui/Icons/RefreshIcon';

export const ListCountersScreen = ({ products }) => {

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
        <>
            <ListGroup>
                <ListGroup.Item className="d-flex align-items-center">
                    <span className="float-left mr-2">
                        {
                            products.length > 1 ?
                                <><strong>{products.length} items</strong></> : <><strong>{products.length} item</strong></>
                        }
                    </span>
                    <span className="float-none mr-2">
                        {
                            products.reduce((a, b) => a + b.count, 0)
                        }
                    &nbsp;times
                    </span>
                    <span
                        className="d-flex float-right align-items-center"
                        onClick={handleRefreshList}
                        style={{ color: refreshList && 'var(--app-tint)' }}>
                        {
                            refreshList ? <><RefreshIcon fill="var(--app-tint)" /> &nbsp;Refreshing...</> : <RefreshIcon />
                        }
                    </span>
                </ListGroup.Item>
                {
                    products.map(product => (
                        <ListGroup.Item key={product.id}>
                            <span className="float-left" onClick={() => console.log('click')}>
                                {product.title}
                            </span>
                            <span className="align-items-center d-flex float-right">
                                <Button
                                    className="border-0 shadow-none button-action"
                                    color="white"
                                    disabled={product.count <= 0 ? true : false}
                                    onClick={() => handleDecIncCounters(product, 'dec')}
                                    size="big">
                                    <DecrementIcon
                                        fill={product.count > 0 ? 'var(--app-tint)' : 'var(--grey)'} />
                                </Button>
                                <strong>{product.count}</strong>
                                <Button
                                    className="border-0 shadow-none button-action"
                                    color="white"
                                    onClick={() => handleDecIncCounters(product, 'inc')}
                                    size="big" >
                                    <IncrementIcon
                                        fill="var(--app-tint)" />
                                </Button>
                            </span>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            {/* <Table size="sm" borderless>
                <tbody>
                    {
                        products.map(product => (
                            <tr id={product.id} key={product.id}>
                                <td colSpan="2" className="d-flex">
                                    <span>
                                        {product.title}
                                    </span>
                                    <span className="ml-auto">
                                        <Button
                                            color="white"
                                            disabled={product.count <= 0 ? true : false}
                                            onClick={() => handleDecIncCounters(product, 'dec')}>
                                            <DecrementIcon
                                                fill={product.count > 0 ? 'var(--app-tint)' : 'var(--grey)'} />
                                        </Button>
                                        <strong>{product.count}</strong>
                                        <Button
                                            color="white"
                                            onClick={() => handleDecIncCounters(product, 'inc')} >
                                            <IncrementIcon
                                                fill="var(--app-tint)" />
                                        </Button>
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table> */}
            {
                showErrorUpdate &&
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
                    </>
            }
        </>
    )
}
