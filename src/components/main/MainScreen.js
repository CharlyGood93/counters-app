import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { getAllCounters } from '../../api/getAllCounters';
import { NoCounters } from '../no-counters/NoCounters';

import { Button, Input, SearchIcon } from '../../ui';
import { ErrorLoadCountersScreen } from '../errors/error-load-counters/ErrorLoadCountersScreen';
import { ListCountersScreen } from '../list-counters/ListCountersScreen';

import './MainScreen.css';
import { FooterScreen } from '../footer/FooterScreen';
import { LoadingScreen } from '../loading/LoadingScreen';
import { SearchbarScreen } from '../searchbar/SearchbarScreen';

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
        console.log(searchFilter);
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
        setSearchFocus(false);
    }

    const handleOnFocus = () => {
        setSearchFocus(true);
    }

    const handleOnBlur = () => {
        setSearchFocus(false);
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
                            onBlur={handleOnBlur}
                            onChange={handleChangeSearch}
                            onFocus={handleOnFocus} />
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
                {/* <SearchbarScreen getCounters={getCounters.data} getFilteredSearch={items => getFilteredSearch(items)} /> */}
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
                                            products={searchFilter}
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
