import React from 'react';
import { Button } from '../../../ui';

export const ErrorLoadCountersScreen = () => {
    return (
        <section className="main__no-counters">
            <h3 className="main__no-counters-title">
                <strong>Couldn't load the counters</strong>
            </h3>
            <p className="main__no-counters-subtitle">
                The internet connection appears to be offline.
            </p>
            <Button color="white">
                <span style={{ color: "var(--app-tint)" }}>Retry</span>
            </Button>
        </section>
    )
}
