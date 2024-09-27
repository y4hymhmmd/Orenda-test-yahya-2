import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerTable from './components/CustomerTable';
import CustomerForm from './components/CustomerForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CustomerTable />} />
        <Route path="/customer/new" element={<CustomerForm />} />
        <Route path="/customer/edit/:id" element={<CustomerForm />} />
      </Routes>
    </div>
  );
};

export default App;