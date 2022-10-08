import { BugReport, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Layout from 'components/Layout';
import { APP_DESCRIPTION, APP_NAME } from 'lib/config';
import Head from 'next/head';
import { useState } from 'react';

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
                    enabled: nextState,
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
                <Container maxWidth="md">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs>
                            <Button
                                fullWidth
                                startIcon={<BugReport />}
                                variant="contained"
                                color="primary"
                                onClick={handleStatus}
                            >
                                Status
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Button
                                fullWidth
                                startIcon={enabled ? <VisibilityOff /> : <Visibility />}
                                variant="contained"
                                color="primary"
                                onClick={toggleStart}
                            >
                                {enabled ? 'Disable' : 'Enable'}
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography textAlign="center">{response}</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        </>
    );
}
