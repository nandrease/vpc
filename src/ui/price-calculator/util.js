const formatPrice = (amount, prefix = '', postfix = '') => {
    if (amount && amount > 0) {
        const formatter = Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });

        return prefix + formatter.format(amount) + postfix;
    } else {
        return '';
    }
};

export { formatPrice };
