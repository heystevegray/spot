import { Button, Typography } from '@mui/material';
import Layout from 'components/Layout';
import { APP_DESCRIPTION, APP_NAME } from 'lib/config';
import Head from 'next/head';
import { useState } from 'react';
import { ResponseData } from 'types/api';

export default function Home() {
    const [enabled, setEnabled] = useState(false);
    const [response, setResponse] = useState('');

    const handleStatus = async () => {
        try {
            await fetch('/api/enable', {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((response) => {
                    setResponse(response?.message);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const toggleStart = async () => {
        const nextState = !enabled;
        setEnabled(nextState);

        try {
            await fetch('/api/enable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enable: nextState,
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    setResponse(response?.message);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Head>
                <title>{APP_NAME}</title>
                <meta name="description" content={APP_DESCRIPTION} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Button variant="contained" color="primary" onClick={toggleStart}>
                    {enabled ? 'Disable' : 'Enable'}
                </Button>
                <Button variant="contained" color="primary" onClick={handleStatus}>
                    Status
                </Button>
                <Typography>{response}</Typography>
            </Layout>
        </>
    );
}
