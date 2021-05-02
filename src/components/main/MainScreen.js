import React, { useEffect, useState } from 'react';

import { getAllCounters } from '../../api/getAllCounters';

import { Col, Container, Row } from 'react-bootstrap';
import { Button, Input, SearchIcon } from '../../ui';

import { ErrorLoadCountersScreen } from '../errors/error-load-counters/ErrorLoadCountersScreen';
import { FooterScreen } from '../footer/FooterScreen';
import { ListCountersScreen } from '../list-counters/ListCountersScreen';
import { LoadingScreen } from '../loading/LoadingScreen';
import { NoCountersScreen } from '../no-counters/NoCountersScreen';

import './MainScreen.css';

export const MainScreen = (props) => {

    const [getCounters, setGetCounters] = useState({
        status: 0,
        data: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchFilter, setSearchFilter] = useState([]);

    useEffect(() => {
        countersData();
    }, []);

    useEffect(() => {
        setSearchFilter(getCounters.data.filter(item => item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())));
    }, [searchValue, getCounters]);

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

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    const handleCancelSearch = () => {
        setSearchValue('');
        console.log(searchValue);
        setSearchFocus(false);
    }

    const handleOnFocus = () => {
        setSearchFocus(true);
    }
    
    return (
        <>
            <Container className="mh-100 py-4">
                <Row>
                    <Col className="d-flex align-items-center">
                        <div className="search-icon position-absolute px-3">
                            <SearchIcon />
                        </div>
                        <Input
                            className="search-input pl-5"
                            disabled={getCounters.data.length > 0 ? false : true}
                            placeholder="Search Counters"
                            onChange={handleChangeSearch}
                            onFocus={handleOnFocus}
                            value={searchValue} />
                        {
                            (getCounters.data.length > 0 && searchFocus) &&
                            (<Button
                                className="ml-3"
                                color="white"
                                onClick={handleCancelSearch}>
                                Cancel
                            </Button>)
                        }
                    </Col>
                </Row>
            
                {
                    loading ? <LoadingScreen classNameTitle={'py-8 vh-90'} /> :
                        <>
                            {
                                getCounters.status !== 200 ?
                                    <ErrorLoadCountersScreen countersData={countersData} /> :
                                    getCounters.data.length > 0 ?
                                        <ListCountersScreen
                                            products={searchFilter}
                                            searchFocus={searchFocus}
                                            selectedItems={selectedItems}
                                            updateSelectedItems={items => updateSelectedItems(items)}
                                        /> :
                                        <NoCountersScreen />
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
