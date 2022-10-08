import '../styles/globals.css';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import theme from '../lib/theme';
import { AppContext, initialAppState } from 'providers/App';

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/service-worker.js').then(
                    function (registration) {
                        console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function (err) {
                        console.log('Service Worker registration failed: ', err);
                    }
                );
            });
        }
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <AppContext.Provider
                    value={{
                        defaultGridSpacing: initialAppState.defaultGridSpacing,
                    }}
                >
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </AppContext.Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
