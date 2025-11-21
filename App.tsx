import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Contact } from './pages/Contact';

import { Join } from './pages/Join';
import { Consult } from './pages/Consult';

import { ScrollToTop } from './components/ScrollToTop';

// App Wrapper
const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
