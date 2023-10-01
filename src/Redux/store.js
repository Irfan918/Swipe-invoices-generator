import { configureStore } from '@reduxjs/toolkit';
import InvoiceSlicer from './invoiceSlicer/InvoiceSlicer';

const store = configureStore({
    reducer: {
        invoices: InvoiceSlicer,
    },
});

export default store;
