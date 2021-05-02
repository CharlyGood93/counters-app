import React from 'react';
import { Input, SearchIcon } from '../../ui';

export const HeaderScreen = () => {
    return (
        <section className="main__searchbar">
            <div className="main__searchbar-icon">
                <SearchIcon className="icon" />
                <Input className="main__searchbar-input" placeholder="Search Counters" />
            </div>
        </section>
    )
}
