import { Button, Grid, TextField } from '@mui/material';
import Layout from 'components/Layout';
import { APP_NAME } from 'lib/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppContext, Data, initialUserSettingsState, localStorageKey, UserSettings } from 'providers/App';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocalStorage } from 'react-use';

const Add = () => {
    const description = 'Add your money for the day';
    const router = useRouter();
    const { defaultGridSpacing } = useContext(AppContext);
    const { register, handleSubmit, control } = useForm<Data>();
    const [storage, setStorage] = useLocalStorage(localStorageKey, JSON.stringify(initialUserSettingsState));

    const goBack = () => {
        router.push('/');
    };

    const onSubmit = (data: Data) => {
        const { spent, saved } = data;

        const localStorage = storage ? (JSON.parse(storage) as UserSettings) : initialUserSettingsState;

        const totalSaved = parseFloat(localStorage.totalSaved) + parseFloat(saved);
        const totalSpent = parseFloat(localStorage.totalSpent) + parseFloat(spent);

        const userSettings: UserSettings = {
            totalSaved: totalSaved.toString(),
            totalSpent: totalSpent.toString(),
            data: [...localStorage.data, { spent, saved, date: new Date().toISOString() }],
        };

        setStorage(JSON.stringify(userSettings));

        goBack();
    };

    return (
        <>
            <Head>
                <title>{`Add ${APP_NAME}`}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout icon="💰" title="Add" description={description}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={defaultGridSpacing}>
                            <Grid item xs={12}>
                                <Controller
                                    name="saved"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            autoFocus
                                            fullWidth
                                            inputProps={{
                                                step: '.01',
                                            }}
                                            type="number"
                                            label="Saved"
                                            placeholder="Money brought in"
                                            variant="outlined"
                                            {...field}
                                            {...register('saved', { required: true })}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="spent"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            inputProps={{
                                                step: '.01',
                                            }}
                                            type="number"
                                            label="Spent"
                                            placeholder="Money spent"
                                            variant="outlined"
                                            {...field}
                                            {...register('spent', { required: true })}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" type="submit">
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" onClick={goBack}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Layout>
        </>
    );
};

export default Add;
