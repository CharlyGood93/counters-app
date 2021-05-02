import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Button, Input, SearchIcon } from '../../ui'

export const SearchbarScreen = (props) => {

    const [searchValue, setSearchValue] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchFilter, setSearchFilter] = useState([]);

    useEffect(() => {
        console.log(searchValue.length, searchValue.trim());
        if (searchValue.trim() !== '') {
            setSearchFilter(props.getCounters.filter(item => item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())));
            console.log(searchFilter);
            props.getFilteredSearch(searchFilter);
        } else {
            setSearchFilter([]);
            console.log(searchFilter);
            // props.getFilteredSearch(searchFilter);
        }
    }, [searchValue])


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
        <Row>
            <Col className="d-flex align-items-center">
                <div className="search-icon position-absolute px-3">
                    <SearchIcon />
                </div>
                <Input
                    className="search-input pl-5"
                    disabled={props.getCounters.length > 0 ? false : true}
                    placeholder="Search Counters"
                    onBlur={handleOnBlur}
                    onChange={handleChangeSearch}
                    onFocus={handleOnFocus} />
                {
                    (props.getCounters.length > 0 && searchFocus) &&
                    (<Button
                        className="ml-3"
                        color="white"
                        onClick={handleCancelSearch}>
                        Cancel
                    </Button>)
                }
            </Col>
        </Row>
    )
}
