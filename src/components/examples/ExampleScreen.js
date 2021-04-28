import React from 'react';
import { Button } from '../../ui';
import { products } from '../../data/products';

import './ExampleScreen.css';

export const ExampleScreen = () => {

    return (
        <section>
            <p>Select an example to add it to your counters.</p>
            <div className="examples">
                <p><strong>Drinks</strong></p>
                {
                    products[0].drinks.map(drink => (
                        <Button
                            key={drink.id}
                        >
                            {drink.name}
                        </Button>
                    ))
                }
            </div>
            <div className="examples">
                <p><strong>Food</strong></p>
                {
                    products[0].foods.map(food => (
                        <Button
                            key={food.id}
                        >
                            {food.name}
                        </Button>
                    ))
                }
            </div>
            <div className="examples">
                <p><strong>Misc</strong></p>
                {
                    products[0].miscs.map(misc => (
                        <Button
                            key={misc.id}
                        >
                            {misc.name}
                        </Button>
                    ))
                }
            </div>
        </section>
    )
}
