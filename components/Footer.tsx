import { AppBar, Grid, Link, Toolbar, Typography } from '@mui/material';

const Footer = () => {
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Grid container justifyContent="center" alignItems="center">
                    <Typography textAlign="center">
                        Created by{' '}
                        <Link color="secondary" target="_blank" href="https://heystevegray.dev/">
                            Steve Gray
                        </Link>
                    </Typography>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
