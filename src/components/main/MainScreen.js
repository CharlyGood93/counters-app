import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { getAllCounters } from '../../api/getAllCounters';
import { NoCounters } from '../no-counters/NoCounters';

import { Input } from '../../ui';
import { ErrorLoadCountersScreen } from '../errors/ErrorLoadCountersScreen';
import { ListCountersScreen } from '../list-counters/ListCountersScreen';

import './MainScreen.css';
import { FooterScreen } from '../footer/FooterScreen';
import { LoadingScreen } from '../loading/LoadingScreen';

export const MainScreen = (props) => {

    const [getCounters, setGetCounters] = useState({
        status: 0,
        data: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

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

    const updateSelectedItems = (items) => {
        setSelectedItems(items);
        console.log({ main: selectedItems });
    }

    return (
        <>
            <Container className="mh-100 py-4">
                {/* TODO: Change this to filter */}
                <Row>
                    <Col>
                        <Input placeholder="Search Counters" disabled={getCounters.data.length > 0 ? false : true} />
                    </Col>
                </Row>
                {
                    loading ? <LoadingScreen classNameTitle={'py-8 vh-90'} /> :
                        <>
                            {
                                getCounters.status !== 200 ?
                                    <>
                                        {/* TODO: Programing and change this */}
                                        <Row>
                                            <Col>
                                                <ErrorLoadCountersScreen />
                                            </Col>
                                        </Row>
                                    </> :
                                    getCounters.data.length > 0 ?
                                        <ListCountersScreen
                                            products={getCounters.data}
                                            selectedItems={selectedItems}
                                            updateSelectedItems={items => updateSelectedItems(items)}
                                        /> :
                                        <NoCounters />
                            }
                        </>
                }
                <FooterScreen
                    countersData={countersData}
                    selectedItems={selectedItems}
                    updateSelectedItems={items => updateSelectedItems(items)} />
            </Container>
        </>
    )
}
