import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';
import store from './Redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import InvoiceList from './components/InvoiceList';

class App extends Component {
  render() {
    return (
      <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <Provider store={store}>
          <BrowserRouter>
            <Container>
              <Routes>
                <Route exact path="/" element={<InvoiceList />} />
                <Route path="/invoice" element={<InvoiceForm />} />
                <Route path="invoice/:id" element={<InvoiceForm />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
