import './App.css' //signup & login css
import './StyleSheets/PrdListing.css'
import './StyleSheets/Home.css';
import './StyleSheets/Slider.css'
import './StyleSheets/Profile.css'
import './StyleSheets/HomeCat.css'
import './StyleSheets/Navbar.css'
import './StyleSheets/Cart.css'
import './StyleSheets/Payment.css'
import './StyleSheets/Orders.css'

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import PrdListing from './components/PrdListing';
import HomeCat1 from './components/HomeCat1';
import HomeCat2 from './components/HomeCat2';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Orders from './components/Orders'

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
  <>
        <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/login" element={<Login />} />
             <Route path="/profile" element={<Profile />} />
             <Route path="/prdlisting" element={<PrdListing />} />
             <Route path="/homecat1" element={<HomeCat1 />} />
             <Route path="/homecat2" element={<HomeCat2 />} />
             <Route path="/cart" element={<Cart />} />
             <Route path="/payment" element={<Payment />} />
             <Route path="/orders" element={<Orders />} />
             
        </Routes>
  </>
  );
}

export default App;
