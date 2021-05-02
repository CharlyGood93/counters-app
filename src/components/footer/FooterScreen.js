import React, { useEffect, useState } from 'react';
import { Col, OverlayTrigger, Row, Popover } from 'react-bootstrap';
import { deleteCountersById } from '../../api/deleteCountersById';
import { postNewCounters } from '../../api/postNewCounters';
import { Alert, Button, CloseIcon, Input, Modal, NewIcon, OpenIcon, TrashBinIcon, useAlert, useModal } from '../../ui';
import { ExampleScreen } from '../examples/ExampleScreen';
import { LoadingScreen } from '../loading/LoadingScreen';

import './FooterScreen.css';

export const FooterScreen = (props) => {

    const [getCountersName, setGetCountersName] = useState('');
    const [loadingAddCounters, setLoadingAddCounters] = useState(false);
    const [showAddCountersError, setShowAddCountersError] = useState(false);
    const [viewExamples, setViewExamples] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [titleToDelete, setTitleToDelete] = useState('');
    const [showRetryAlertDelete, setshowRetryAlertDelete] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();
    const { isVisible: isModalVisible, hideModal, showModal } = useModal();

    // useEffect(() => {
    //     console.log(selectedItems);
    //     if (selectedItems.length > 1) {
    //         props.updateSelectedItems(selectedItems);
    //     } else {
    //         props.updateSelectedItems([]);
    //     }
    // }, [selectedItems]);

    const handleCountersName = (e) => {
        e.preventDefault();
        setGetCountersName(e.target.value);
    }

    const handleAddCounters = async (e) => {
        e.preventDefault();
        setLoadingAddCounters(true);
        const data = await postNewCounters(getCountersName);
        if (data.status === 200) {
            setTimeout(() => {
                setLoadingAddCounters(false);
            }, 1500);
            setGetCountersName('');
            hideModal(true);
            await props.countersData();
        } else {
            setTimeout(() => {
                setLoadingAddCounters(false);
            }, 1500);
            showAlert(true);
            setShowAddCountersError(true);
        }
    }

    const handleHideAlert = () => {
        hideAlert(true);
        setShowAddCountersError(false);
    }

    const handleViewExamples = () => {
        setViewExamples(true);
    }

    const handleHideExamples = () => {
        setViewExamples(false);
    }

    const handleHideModal = () => {
        setGetCountersName('');
        hideModal(true);
    }

    const handleShowDeleteAlert = () => {
        let title = '';
        if (props.selectedItems.length > 1) {
            title = props.selectedItems.map(t => t.title).reduce((prev, curr) => [prev, curr]);
            title = title.join(', ');
            console.log(title);
            setTitleToDelete(title);    
        } else {
            setTitleToDelete(props.selectedItems[0].title);
        }
        setShowDeleteAlert(true);
        showAlert(true);
    }

    const handleDeleteItem = async () => {
        props.selectedItems.map(async item => {
            const resp = await deleteCountersById(item.id);
            if (resp.status === 200) {
                // setSelectedItems([]);
                // props.updateSelectedItems([]);
                // props.countersData();
                hideAlert(false);
            } else {
                setshowRetryAlertDelete(true);
                showAlert(true);
            }
        });
    }

    const handleRetryDeleteItem = async () => {
        await handleDeleteItem();
        setshowRetryAlertDelete(false);
    }

    const handleDismissRetryDelete = () => {
        setshowRetryAlertDelete(false);
    }

    const popoverShared = (
        <Popover id="popover-basic">
            <Popover.Content>
                <Row>
                    <Col>
                        <p>Share 1 Counter</p>
                        <Button className="shared-cancel-button" color="white">
                            Copy
                        </Button>
                    </Col>
                    <Col>
                        IMG SHARED
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>
    )

    return (
        <>
            <Row>
                <Col>
                    <footer className="footer position-fixed">
                        <div className="actions float-left px-3 py-3"
                            style={{ visibility: props.selectedItems.length === 0 ? 'hidden' : 'visible' }}>
                            <Button color="white" size="big" onClick={handleShowDeleteAlert}>
                                <TrashBinIcon fill="var(--destructive-red)" />
                            </Button>
                            <OverlayTrigger trigger="click" placement="top" overlay={popoverShared}>
                                <Button className="ml-3" color="white" size="big">
                                    <OpenIcon fill="var(--dark-black)" />
                                </Button>
                            </OverlayTrigger>
                        </div>
                        <div className="add-item float-right px-3 py-3">
                            <Button onClick={showModal} size="big">
                                <NewIcon fill="var(--white)" />
                            </Button>
                        </div>
                    </footer>
                </Col>
            </Row>
            <Modal isVisible={isModalVisible}>
                <Modal.Header>
                    <Modal.Title>
                        <Row>
                            {
                                viewExamples ?
                                    <>
                                        <Col>
                                            <Button className="mr-2" color="grey" onClick={handleHideExamples} size="big">
                                                <CloseIcon fill="var(--white)" />
                                            </Button>
                                            <small>
                                                <strong>Examples</strong>
                                            </small>
                                        </Col>
                                    </> :
                                    <>
                                        <Col>
                                            <Button className="mr-2" color="grey" onClick={handleHideModal} size="big">
                                                <CloseIcon fill="var(--white)" />
                                            </Button>
                                            <small>
                                                <strong>Create counters</strong>
                                            </small>
                                        </Col>
                                        <Col className="text-right">
                                            <Button
                                                disabled={(getCountersName.trim() === '' || getCountersName.trim() === null) ? true : false}
                                                onClick={handleAddCounters}>
                                                Save
                                            </Button>
                                        </Col>
                                    </>
                            }
                        </Row>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loadingAddCounters ?
                            <LoadingScreen classNameTitle={'vh-40'} /> :
                            <>
                                {
                                    showAddCountersError ?
                                        <>
                                            <Alert isVisible={isAlertVisible}>
                                                <Alert.Title>
                                                    Couldn't create counter
                                                    </Alert.Title>
                                                <Alert.Message>
                                                    The internet connection appears to be offline.
                                                    </Alert.Message>
                                                <Alert.Actions>
                                                    <Button onClick={handleHideAlert}>
                                                        Dismiss
                                                    </Button>
                                                </Alert.Actions>
                                            </Alert>
                                        </> :
                                        <>
                                            {
                                                viewExamples ?
                                                    <ExampleScreen
                                                        setGetCountersName={setGetCountersName}
                                                        setViewExamples={setViewExamples} /> :
                                                    <>
                                                        <Row>
                                                            <Col>
                                                                <Input
                                                                    placeholder="Cups of coffee"
                                                                    onChange={handleCountersName}
                                                                    value={getCountersName} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className="pt-3">
                                                                <p>
                                                                    Give it name. Creative block? <u className="view-examples" onClick={handleViewExamples}>See examples</u>.
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </>
                                            }
                                        </>
                                }
                            </>
                    }
                </Modal.Body>
            </Modal>
            {
                showDeleteAlert && (
                    <Alert isVisible={isAlertVisible}>
                        <Alert.Title>
                            Delete the <q>{titleToDelete}</q> counter?
                        </Alert.Title>
                        <Alert.Message>
                            This cannot be undone.
                        </Alert.Message>
                        <Alert.Actions>
                            <Button onClick={handleHideAlert}>
                                Cancel
                            </Button>
                            <Button
                                className="delete-button"
                                color="white"
                                onClick={handleDeleteItem}>
                                Delete
                            </Button>
                        </Alert.Actions>
                    </Alert>
                )
            }
            {
                showRetryAlertDelete && (
                    <Alert isVisible={isAlertVisible}>
                        <Alert.Title>
                            Couldn't delete <q>{titleToDelete}</q>
                        </Alert.Title>
                        <Alert.Message>
                            The internet connection.
                        </Alert.Message>
                        <Alert.Actions>
                            <Button onClick={handleRetryDeleteItem}>
                                Retry
                            </Button>
                            <Button
                                className="dismiss-button"
                                color="white"
                                onClick={handleDismissRetryDelete}>
                                Dismiss
                            </Button>
                        </Alert.Actions>
                    </Alert>
                )
            }
        </>
    )
}
