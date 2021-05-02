import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row, Table } from 'react-bootstrap';
import { getAllCounters } from '../../api/getAllCounters';
import { updateCountersById } from '../../api/updateCountersById';
import { Alert, Button, DecrementIcon, IncrementIcon, useAlert } from '../../ui';
import { RefreshIcon } from '../../ui/Icons/RefreshIcon';
import { NoResultsScreen } from '../errors/no-results/NoResultsScreen';

import './ListCountersScreen.css';

export const ListCountersScreen = (props) => {

    const [dataProducts, setDataProducts] = useState(props.products);
    const [refreshList, setRefreshList] = useState(false);
    const [showErrorUpdate, setShowErrorUpdate] = useState(false);
    const [retryUpdateCounters, setRetryUpdateCounters] = useState(props.products);
    const [selectedItems, setSelectedItems] = useState([]);

    const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();

    useEffect(() => {
        if (props.selectedItems.length === 0 && selectedItems.length > 1) {
            setSelectedItems(props.selectedItems);
        }
        let lastItem = selectedItems[selectedItems.length - 1];
        if (selectedItems.length > 0) {
            let counts = 0;
            selectedItems.map(items => {
                if (lastItem.id === items.id) {
                    counts += 1;
                }
                if (counts === 2) {
                    const list = document.getElementById(lastItem.id);
                    list.className = 'list-group-item';
                    setSelectedItems(selectedItems.filter(i => i.id !== lastItem.id));
                }
            })
        }
        props.updateSelectedItems(selectedItems);
    }, [selectedItems, props.selectedItems]);

    const handleDecIncCounters = async (item, opt) => {
        const resp = await updateCountersById(item.id, opt);
        if (resp.status === 200) {
            props.products.map((currentValue) => {
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

    const countersData = () => {
        const data = props.products;
        setDataProducts(data);
    }

    const handleRefreshList = () => {
        setRefreshList(true);
        countersData();
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

    const handleSelectedItems = (products) => {
        setSelectedItems([...selectedItems, products]);
        const list = document.getElementById(products.id);
        list.className = 'list-group-item active';
    }

    return (
        <Row>
            <Col className="vh-90">
                {
                    props.products.length > 0 ?
                        <>
                            <ListGroup>
                                <ListGroup.Item className="d-flex align-items-center">
                                    {
                                        selectedItems.length > 0 ?
                                            <>
                                                {
                                                    <span className="align-items-center d-flex float-left mr-2 selected-color">
                                                        {selectedItems.length} selected
                                        </span>
                                                }
                                            </> :
                                            <>
                                                <span className="float-left mr-2">
                                                    {
                                                        props.products.length > 1 ?
                                                            <><strong>{props.products.length} items</strong></> : <><strong>{props.products.length} item</strong></>
                                                    }
                                                </span>
                                                <span className="float-none mr-2">
                                                    {
                                                        props.products.reduce((a, b) => a + b.count, 0)
                                                    }
                                        &nbsp;times
                                    </span>
                                            </>
                                    }
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
                                    props.products.map(product => (
                                        <ListGroup.Item id={product.id} key={product.id}>
                                            <span className="float-left select-item" onClick={() => handleSelectedItems(product)}>
                                                {product.title}
                                            </span>
                                            <span className="align-items-center d-flex float-right">
                                                <Button
                                                    className="border-0 shadow-none dec-inc-button"
                                                    color="white"
                                                    disabled={product.count <= 0 ? true : false}
                                                    onClick={() => handleDecIncCounters(product, 'dec')}
                                                    size="big">
                                                    <DecrementIcon
                                                        fill={product.count > 0 ? 'var(--app-tint)' : 'var(--grey)'} />
                                                </Button>
                                                <strong>{product.count}</strong>
                                                <Button
                                                    className="border-0 shadow-none dec-inc-button"
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
                        </> :
                        <>
                           <NoResultsScreen />
                        </>
                }

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
            </Col>
        </Row>
    )
}
