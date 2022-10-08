export const formatMoney = (value: string) => {
    return parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
