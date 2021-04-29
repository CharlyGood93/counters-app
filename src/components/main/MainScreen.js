import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { getAllCounters } from '../../api/getAllCounters';
import { NoCounters } from './NoCounters';

import { Alert, Button, CloseIcon, Input, Loading, Modal, NewIcon, OpenIcon, TrashBinIcon, useAlert, useModal } from '../../ui';
import '../../styles/components/main/MainScreen.css';
import { postNewCounters } from '../../api/postNewCounters';
import { ErrorLoadCountersScreen } from '../errors/ErrorLoadCountersScreen';
import { ListCountersScreen } from './ListCountersScreen';

export const MainScreen = () => {

    const [getCounters, setGetCounters] = useState({
        status: 0,
        data: []
    });
    const [loading, setLoading] = useState(true);
    const [getCountersName, setGetCountersName] = useState('');
    const [loadingNewCounters, setLoadingNewCounters] = useState(false);
    const [showErrorPostCounters, setShowErrorPostCounters] = useState(false)

    const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();
    const { isVisible: isModalVisible, hideModal, showModal } = useModal();

    useEffect(() => {
        countersData();
    }, []);

    const countersData = async () => {
        const data = await getAllCounters();
        setGetCounters(data);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const handleDeleteCounters = () => {
        console.log('Deleting counters');
    }

    const handleChangeCountersName = (e) => {
        e.preventDefault();
        setGetCountersName(e.target.value);
    }

    const handleNewCounters = async (e) => {
        e.preventDefault();
        setLoadingNewCounters(true);
        const data = await postNewCounters(getCountersName);
        if (data.status === 200) {
            setTimeout(async () => {
                // setGetCounters(data);
                setLoadingNewCounters(false);
            }, 1000);
            setGetCountersName('');
            countersData();
            hideModal(true);
        } else {
            setTimeout(() => {
                setLoadingNewCounters(false);
            }, 1000);
            showAlert(true);
            setShowErrorPostCounters(true);
        }
    }

    const handleHideAlert = () => {
        hideAlert(true);
        setShowErrorPostCounters(false);
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <Input placeholder="Search Counters" disabled={getCounters.data.length > 0 ? false : true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            loading ? <Loading /> :
                                <>
                                    {
                                        getCounters.status !== 200 ? <ErrorLoadCountersScreen /> :
                                            getCounters.data.length > 0 ? <ListCountersScreen products={getCounters.data} /> :
                                                <NoCounters />
                                    }
                                </>
                        }
                    </Col>
                </Row>
            </Container>
            <div className="footer">
                <Container>
                    <Row>
                        <Col className="footer__actions">
                            <Button size="big" color="white" onClick={handleDeleteCounters}>
                                <TrashBinIcon fill="var(--destructive-red)" />
                            </Button>
                            <Button size="big" color="white">
                                <OpenIcon />
                            </Button>
                        </Col>
                        <Col className="footer__add-counter">
                            <Button size="big" onClick={showModal}>
                                <NewIcon fill="var(--white)" />
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal isVisible={isModalVisible}>
                <Modal.Header>
                    <Modal.Title>
                        <Container>
                            <Row>
                                <Col className="modal__close-button">
                                    <Button size="big" color="grey" onClick={hideModal}>
                                        <CloseIcon fill="var(--white)" />
                                    </Button>
                                </Col>
                                <Col>
                                    <p><strong>Create counters</strong></p>
                                </Col>
                                <Col>
                                    <Button disabled={getCountersName.trim() === '' && getCountersName.length === 0 ? true : false}
                                        onClick={handleNewCounters}>
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {
                            loadingNewCounters ?
                                <>
                                    <Row>
                                        <Col>
                                            <Loading />
                                        </Col>
                                    </Row>
                                </> :
                                <>
                                    {
                                        showErrorPostCounters ?
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
                                                <Row>
                                                    <Col>
                                                        <Input placeholder="Cups of coffee" value={getCountersName} onChange={handleChangeCountersName} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p>Give it name. Creative block? See examples.</p>
                                                    </Col>
                                                </Row>
                                            </>
                                    }
                                </>
                        }
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}
