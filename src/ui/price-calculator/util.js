const formatPrice = (amount) => {
    const formatter = Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 2,
    });

    return formatter.format(amount)
}


export {
    formatPrice
}