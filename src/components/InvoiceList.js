import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteInvoice } from "../Redux/invoiceSlicer/InvoiceSlicer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Modal } from "react-bootstrap";
import "../App.css";

const List = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const invoices = useSelector((state) => state.invoices.invoices);

    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const handleAddButtonClick = () => {
        navigate("/invoice", { state: null });
    };

    const handleEditButtonClick = (invoice) => {
        navigate(`/invoice/${invoice.invoiceNumber}`, {
            state: { ...invoice, copymode: false },
        });
    };

    const handleCopyButtonClick = (invoice) => {
        navigate("/invoice", { state: { ...invoice, copymode: true } });
    };

    const handleDeleteInvoice = (invoiceNumber) => {
        dispatch(deleteInvoice(invoiceNumber));
    };

    const openInvoiceModal = (invoice) => {
        setSelectedInvoice(invoice);
        setShowInvoiceModal(true);
    };

    const closeInvoiceModal = () => {
        setSelectedInvoice(null);
        setShowInvoiceModal(false);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Invoice Generator App</h1>
            <div className="text-center mb-3">
                <Button
                    className="text-center btn btn-primary fs-5"
                    onClick={handleAddButtonClick}
                >
                    Create Invoice
                </Button>
            </div>
            <Table bordered rounded className="text-center border border-black">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Invoice Date</th>
                        <th>Billed To</th>
                        <th>Billed From</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.invoiceNumber}>
                            <td className="text-center fs-5">{invoice.invoiceNumber}</td>
                            <td className="text-center fs-5">{invoice.dateOfIssue}</td>
                            <td className="text-center fs-5 ">{invoice.billTo}</td>
                            <td className="text-center fs-5">{invoice.billFrom}</td>
                            <td className="text-center fs-5">
                                <Button
                                    variant="info"
                                    className=" me-2"
                                    size="lg"
                                    onClick={() => openInvoiceModal(invoice)}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="warning"
                                    className=" me-2"
                                    size="lg"
                                    onClick={() => handleEditButtonClick(invoice)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className=" me-2"
                                    size="lg"
                                    onClick={() => handleDeleteInvoice(invoice.invoiceNumber)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="success"
                                    size="lg"
                                    onClick={() => handleCopyButtonClick(invoice)}
                                >
                                    Copy
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal
                show={showInvoiceModal}
                onHide={closeInvoiceModal}
                dialogClassName="modal-a4"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Invoice Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInvoice && (
                        <div className="container mx-auto  p-3 border border-black">
                            <div className="row">
                                <div className="col">
                                    <h3>Invoice</h3>
                                    <p>Invoice Number: {selectedInvoice.invoiceNumber}</p>
                                    <p>Date of Issue: {selectedInvoice.dateOfIssue}</p>
                                </div>
                                <div className="col text-end">
                                    <h3>Bill From</h3>
                                    <p>From: {selectedInvoice.billFrom}</p>
                                    <p>Address: {selectedInvoice.billFromAddress}</p>
                                    <p>Email: {selectedInvoice.billFromEmail}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h3>Bill To</h3>
                                    <p>To: {selectedInvoice.billTo}</p>
                                    <p>Address: {selectedInvoice.billToAddress}</p>
                                    <p>Email: {selectedInvoice.billToEmail}</p>
                                </div>
                            </div>
                            <h5 className="text-center">Items:</h5>
                            <table className="table table-bordered table-centered">
                                <thead>
                                    <tr>
                                        <th className="text-center custom-font">Name</th>
                                        <th className="text-center custom-font">Description</th>
                                        <th className="text-center custom-font">Price</th>
                                        <th className="text-center custom-font">Quantity</th>
                                        <th className="text-center custom-font">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedInvoice.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-center custom-font">{item.name}</td>
                                            <td className="text-center custom-font">
                                                {item.description}
                                            </td>
                                            <td className="text-center custom-font">{item.price}</td>
                                            <td className="text-center custom-font">
                                                {item.quantity}
                                            </td>
                                            <td className="text-center custom-font">
                                                {(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row mt-4">
                                <div className="col">
                                    <p>Notes: {selectedInvoice.notes}</p>
                                </div>
                                <div className="col text-end">
                                    <p>Currency: {selectedInvoice.currency}</p>
                                    <p>Subtotal: {selectedInvoice.subTotal}</p>
                                    <p>
                                        Discount: {selectedInvoice.discountRate}% (
                                        {selectedInvoice.discountAmmount})
                                    </p>
                                    <p>
                                        Tax: {selectedInvoice.taxRate}% (
                                        {selectedInvoice.taxAmmount})
                                    </p>
                                    <h4>Total: {selectedInvoice.total}</h4>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeInvoiceModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default List;
