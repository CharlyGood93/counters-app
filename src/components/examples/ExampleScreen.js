import React, { useState } from 'react';
import { Button } from '../../ui';
import { products } from '../../data/products';
import { Col, Row } from 'react-bootstrap';

import './ExampleScreen.css';

export const ExampleScreen = (props) => {

    const handleGetValueButton = (e) => {
        e.preventDefault();
        console.log(e.target.innerText);
        props.setGetCountersName(e.target.innerText);
        props.setViewExamples(false);
    }

    return (
        <Row>
            <Col className="py-3">
                <p className="title-examples">
                    Select an example to add it to your counters.
                </p>
                <div className="py-2">
                    <p className="section-title">
                        <strong>Drinks</strong>
                    </p>
                    {
                        products[0].drinks.map(product => (
                            <Button className="button-examples m-1" key={product.id} onClick={handleGetValueButton}>
                                {product.name}
                            </Button>
                        ))
                    }
                </div>
                <div className="py-2">
                    <p className="section-title">
                        <strong>Food</strong>
                    </p>
                    {
                        products[0].foods.map(product => (
                            <Button className="button-examples m-1" key={product.id} onClick={handleGetValueButton}>
                                {product.name}
                            </Button>
                        ))
                    }
                </div>
                <div className="py-2">
                    <p className="section-title">
                        <strong>Misc</strong>
                    </p>
                    {
                        products[0].miscs.map(product => (
                            <Button className="button-examples m-1" key={product.id} onClick={handleGetValueButton}>
                                {product.name}
                            </Button>
                        ))
                    }
                </div>
            </Col>
        </Row>
    )
}
