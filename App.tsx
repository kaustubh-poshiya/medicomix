import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Contact } from './pages/Contact';

import { Join } from './pages/Join';
import { Consult } from './pages/Consult';

import { ScrollToTop } from './components/ScrollToTop';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(5px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(5px)' }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/consult" element={<PageTransition><Consult /></PageTransition>} />
        <Route path="/join" element={<PageTransition><Join /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

// App Wrapper
const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;
