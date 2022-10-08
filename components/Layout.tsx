import { Box, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AppContext } from 'providers/App';
import React, { FunctionComponent, useContext } from 'react';
import AppBar from './AppBar';

interface Props {
    icon?: string;
    title?: string;
    description?: string;
}
const Layout: FunctionComponent<Props> = ({ children, icon = '', title = '', description = '' }) => {
    const { defaultGridSpacing } = useContext(AppContext);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    /*
    Get the total heights of the app bars (header and footer).
    App bar size changes based on screen size.
    */

    const totalAppBarHeight = matches ? 112 : 128;

    const content = (
        <Grid container spacing={defaultGridSpacing} justifyContent="center" padding={defaultGridSpacing}>
            <Grid item xs={12}>
                {icon && (
                    <Typography display="inline" variant="h5" component="h2">
                        {`${icon} `}
                    </Typography>
                )}
                {title && (
                    <Typography display="inline" variant="h5" component="h2">
                        {title}
                    </Typography>
                )}
            </Grid>
            {description && (
                <Grid item xs={12}>
                    <Typography>{description}</Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );

    return (
        <Box sx={{ height: `calc(100vh - ${totalAppBarHeight}px)` }}>
            <AppBar />
            <Box sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {!matches && <Container maxWidth="md">{content}</Container>}
                {matches && <Box>{content}</Box>}
            </Box>
            {/* <Footer /> */}
        </Box>
    );
};

export default Layout;
