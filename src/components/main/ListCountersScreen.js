import React, { useState } from 'react';
import { Button, DecrementIcon, IncrementIcon } from '../../ui';

export const ListCountersScreen = ({ products }) => {

    const [counter, setCounter] = useState();

    const handleGetItem = () => {
        console.log('Getting item');
    }

    const handleDecrementCount = (count) => {
        console.log('Decrement counters');
        setCounter(count - 1);
        console.log(counter);
    }

    const handleIncrementCount = (count) => {
        console.log('Increment counters');
        // setCounter(count + 1);
        // console.log(counter)
    }

    return (
        <section style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ padding: '10px' }}>
                    {
                        products.length > 1 ? <><strong>{products.length} items</strong></> : <>{products.length} item</>
                    }
                </div>
                <div style={{ padding: '10px' }}>
                    Refresh here
                </div>
            </div>
            {
                products.map(product => (
                    <div key={product.id} style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}>
                        <div>
                            {product.title}
                        </div>
                        <div>
                            <Button color="white" onClick={() => handleDecrementCount(product.count)}>
                                <DecrementIcon fill="var(--app-tint)" />
                            </Button>

                        </div>
                        <div>
                            <strong>{product.count}</strong>
                        </div>
                        <div>
                            <Button color="white" onClick={() => handleIncrementCount(product.count)}>
                                <IncrementIcon fill="var(--app-tint)" />
                            </Button>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}
