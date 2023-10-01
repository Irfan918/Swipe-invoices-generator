
// function to store invoices in localstorage 
export const saveInvoicesToLocalStorage = (invoices) => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
};

// and this is for getting the invoices 
export const loadInvoicesFromLocalStorage = () => {
    const storedInvoices = localStorage.getItem('invoices');
    return storedInvoices ? JSON.parse(storedInvoices) : [];
};
