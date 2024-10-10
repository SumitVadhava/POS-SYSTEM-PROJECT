// import 'antd/dist/antd.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import ItemsPage from './pages/ItemsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';
import './Styles/DefaultLayout.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BillsPage from './pages/BillPage';
import CustomerPage from './pages/CustomerPage';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  return (
   <>
     <BrowserRouter>
      <Routes>  
        <Route path='/' element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<ProtectedRoute isLoggedIn={isLoggedIn} component={Homepage} />}/>
        <Route path='/items' element={<ItemsPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/bills' element={<BillsPage/>}/>
        <Route path='/customers' element={<CustomerPage/>}/>


      </Routes>
     </BrowserRouter>
   </>
  );
}

export default App;