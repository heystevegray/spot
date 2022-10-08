import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { formatMoney } from 'lib/utils';
import { localStorageKey, UserSettings, initialUserSettingsState } from 'providers/App';
import { useLocalStorage } from 'react-use';
import {
    DataGrid,
    GridRenderCellParams,
    GridToolbarContainer,
    GridToolbarExport,
    GridValueFormatterParams,
    GridValueGetterParams,
} from '@mui/x-data-grid';

const cellWidth = 100;

const columns = [
    {
        field: 'saved',
        headerName: 'Saved',
        width: cellWidth,
        sortable: false,
        valueGetter: (params: GridValueGetterParams) => params.row.saved,
        valueFormatter: (params: GridValueFormatterParams) => `${formatMoney(params.value)}`,
    },
    {
        field: 'spent',
        headerName: 'Spent',
        width: cellWidth,
        sortable: false,
        valueGetter: (params: GridValueGetterParams) => params.row.spent,
        valueFormatter: (params: GridValueFormatterParams) => `${formatMoney(params.value)}`,
    },
    {
        field: 'date',
        headerName: 'Time',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => `${dayjs(params.value).fromNow()}`,
        valueGetter: (params: GridValueGetterParams) => `${dayjs(params.row.date)}`,
        valueFormatter: (params: GridValueFormatterParams) => {
            return `${dayjs(params.value).format('M/D/YYYY')}`;
        },
    },
];

const Table = () => {
    const [storage] = useLocalStorage(localStorageKey, JSON.stringify(initialUserSettingsState));

    const localStorage = storage ? (JSON.parse(storage) as UserSettings) : initialUserSettingsState;

    const rows = localStorage?.data?.map((row) => ({ ...row, id: row.date }));

    return (
        <Grid container>
            {localStorage.data.length > 0 && (
                <Grid container item xs={12}>
                    <DataGrid
                        components={{
                            Toolbar: () => (
                                <Grid container justifyContent="flex-end" padding={1}>
                                    <GridToolbarContainer>
                                        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
                                    </GridToolbarContainer>
                                </Grid>
                            ),
                            Footer: () => null,
                        }}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'date', sort: 'desc' }],
                            },
                        }}
                        disableColumnFilter
                        disableColumnMenu
                        disableDensitySelector
                        disableSelectionOnClick
                        autoHeight
                        rows={rows}
                        columns={columns}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default Table;
