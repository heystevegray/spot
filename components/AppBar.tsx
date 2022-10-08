import { Delete } from '@mui/icons-material';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Grid,
    IconButton,
    Tooltip,
    Link,
    DialogContent,
    Typography,
    DialogActions,
    Button,
    Dialog,
    DialogTitle,
} from '@mui/material';
import { APP_NAME } from 'lib/config';
import { useRouter } from 'next/router';
import { AppContext, localStorageKey, initialUserSettingsState } from 'providers/App';
import { useContext, useState } from 'react';
import { useLocalStorage } from 'react-use';

const AppBar = () => {
    const router = useRouter();
    const { defaultGridSpacing } = useContext(AppContext);
    const [open, setOpen] = useState(false);

    const [_storage, setStorage, remove] = useLocalStorage(localStorageKey, JSON.stringify(initialUserSettingsState));

    const handleClose = () => {
        setOpen(false);
    };

    const clearStorage = () => {
        handleClose();
        remove();
        setStorage(JSON.stringify(initialUserSettingsState));
        router.reload();
    };

    return (
        <MuiAppBar position="static">
            <Toolbar>
                <Grid container spacing={defaultGridSpacing} alignItems="center">
                    <Grid item xs sx={{ flexGrow: 1 }}>
                        <Link
                            underline="hover"
                            component="button"
                            variant="h6"
                            onClick={() => {
                                router.push('/');
                            }}
                        >
                            {APP_NAME}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Delete All Data">
                            <IconButton onClick={() => setOpen(true)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Delete All Data</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete all data? This cannot be undone.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={clearStorage}>Burn it all 🔥</Button>
                </DialogActions>
            </Dialog>
        </MuiAppBar>
    );
};

export default AppBar;
