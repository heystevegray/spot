import { Add } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { localStorageKey, initialUserSettingsState, UserSettings, AppContext } from 'providers/App';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import SummaryText from './SummaryText';
import relativeTime from 'dayjs/plugin/relativeTime';
import Table from './Table';

dayjs.extend(relativeTime);

const Summary = () => {
    const router = useRouter();
    const { defaultGridSpacing } = useContext(AppContext);
    const [status, setStatus] = useState('');
    const [difference, setDifference] = useState(0);
    const [storage] = useLocalStorage(localStorageKey, JSON.stringify(initialUserSettingsState));

    const localStorage = storage ? (JSON.parse(storage) as UserSettings) : initialUserSettingsState;

    const isPositive = difference > 0;
    let differenceColor = isPositive ? 'success.main' : 'error';

    if (difference === 0) {
        differenceColor = 'textPrimary';
    }

    useEffect(() => {
        const isNonZero = difference !== 0;
        if (isNonZero && isPositive) {
            setStatus(`🎉 Aaawww yea! You're saving more than you're spending`);
        } else if (isNonZero && !isPositive) {
            setStatus(`😬 Oof. You're spending more than you're saving`);
        } else {
            setStatus('');
        }
    }, [difference, isPositive]);

    useEffect(() => {
        setDifference(parseFloat(localStorage?.totalSaved) - parseFloat(localStorage?.totalSpent));
    }, [localStorage]);

    return (
        <Grid container spacing={defaultGridSpacing} sx={{ height: '90%' }}>
            <Grid container item xs={12} marginBottom={2}>
                <Button startIcon={<Add />} fullWidth variant="contained" onClick={() => router.push('/add')}>
                    Add
                </Button>
            </Grid>
            <Grid container item spacing={defaultGridSpacing}>
                <Grid item xs={6}>
                    <SummaryText color="success.main" amount={localStorage?.totalSaved} title="Total Saved" />
                </Grid>
                <Grid item xs={6}>
                    <SummaryText color="error" amount={localStorage?.totalSpent} title="Total Spent" />
                </Grid>
                <Grid item xs={12}>
                    <SummaryText
                        description={status}
                        color={differenceColor}
                        amount={`${difference}`}
                        title="Saved - Spent"
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Table />
            </Grid>
        </Grid>
    );
};

export default Summary;
