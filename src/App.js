import React, { Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { Loading } from './components'
// import Auth from 'views/Auth'

import Header from './layout/Header'

import Order from './components/Order'

import './style/sidebar.css'
import './style/index.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={Loading()}>
        {/* <ScrollToTop /> */}
        <Routes>
          <Route path='/' element={<Order />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
