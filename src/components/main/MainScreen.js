import React, { useEffect, useState } from 'react';
import { getAllCounters } from '../../api/getAllCounters';
import { Loading } from '../../ui';
import { ErrorLoadCountersScreen } from '../errors/ErrorLoadCountersScreen';

import { FooterScreen } from './FooterScreen';
import { HeaderScreen } from './HeaderScreen';
import { ListCountersScreen } from './ListCountersScreen';
import { NoCounters } from './NoCounters';

import './MainScreen.css';

export const MainScreen = () => {

    const [counters, setCounters] = useState({
        status: 0,
        data: []
    });

    useEffect(() => {
        getAllCounters().then(resp => {
            setCounters({
                status: resp.status,
                data: resp
            });
        });
    }, []);

    const { status, data } = counters.data;

    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    return (
        <main className="main">
            <HeaderScreen />
            {
                loading ?
                    <>
                        <section className="main__loading">
                            <Loading />
                        </section>
                    </>
                    :
                    <>
                        {
                            (status !== 200)
                                ?
                                (<ErrorLoadCountersScreen />)
                                :
                                (data.length > 0) ? (<ListCountersScreen products={data} />) : <NoCounters />
                        }
                    </>
            }
            <FooterScreen />
        </main>
    )
}
