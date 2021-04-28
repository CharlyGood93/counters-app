import React, { useEffect, useState } from 'react';
import { ExampleScreen } from '../examples/ExampleScreen';
import { Button, CloseIcon, Input, Loading, Modal, NewIcon, useModal } from '../../ui';
import { postNewCounters } from '../../api/postNewCounters';

import './MainScreen.css';

export const FooterScreen = () => {


    const [showExamples, setShowExamples] = useState(false);

    const handleViewExamples = () => {
        setShowExamples(true);
    }

    const { isVisible: isModalVisible, hideModal, showModal } = useModal();

    const showOrHideModalBody = () => {
        if (showExamples) {
            setShowExamples(false);
        } else {
            hideModal(true);
        }
    }

    const [countersValue, setCountersValue] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setCountersValue(e.target.value);
    }

    const [newCounters, setNewCounters] = useState();

    const handleAddCounters = (e) => {
        e.preventDefault();
        console.log('Your submited me!');
        console.log({ countersValue });
        if (countersValue !== '') {
            console.log('ahora puedo guardar');
            const saveNewCounter = postNewCounters(countersValue);
            saveNewCounter.then(resp => {
                console.log(resp.data);
                setNewCounters(resp.data);
            });
            console.log(newCounters);
            setCountersValue('');
        }
    }

    // postNewCounters();

    return (
        <>
            <section className="main__footer">
                <Button
                    className="main__footer-add"
                    onClick={showModal}>
                    <NewIcon fill="white" />
                </Button>
            </section>
            <Modal
                isVisible={isModalVisible}>
                <Modal.Header>
                    <Modal.Title className="main__modal-header-title">
                        <Button
                            color="grey"
                            onClick={showOrHideModalBody}
                            size="big">
                            <CloseIcon fill="white" />
                        </Button>
                        {
                            showExamples
                                ?
                                <p>Examples</p>
                                :
                                <>
                                    <p>Create counter</p>
                                    <Button onClick={handleAddCounters}>
                                        Save
                                    </Button>
                                </>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        showExamples ?
                            <ExampleScreen />
                            :
                            <>
                                <section className="main__loading">
                                    {/* <Loading /> */}
                                </section>
                                <p>
                                    <strong>
                                        Name
                                    </strong>
                                </p>
                                <Input onChange={handleInputChange} placeholder="Cups of coffee" type="text" value={countersValue} />
                                <p>
                                    Give it a name. Creative block?
                                    See <u style={{ cursor: 'pointer' }} onClick={handleViewExamples}>examples</u>.
                                </p>
                            </>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
