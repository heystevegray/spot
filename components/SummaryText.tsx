import { Grid, Typography } from '@mui/material';
import { formatMoney } from 'lib/utils';

interface Props {
    title: string;
    color?: string;
    description?: string;
    amount: string;
}

const SummaryText = ({ title, amount, description = '', color = '' }: Props) => {
    const value = parseFloat(amount)?.toFixed(2) || '0';

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" component="h2" color={color}>
                    {formatMoney(value)}
                </Typography>
            </Grid>
            {description && (
                <Grid item xs={12}>
                    <Typography color={color}>{description}</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default SummaryText;
