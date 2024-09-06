import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage, { loadEvents } from './Pages/HomePage';
import NavBar from './Pages/NavBar';
import ShopPage from './Pages/ShopPage';
import CartPage from './Pages/CartPage';
import LoginPage from './Pages/LoginPage';
import Error from './Pages/Error';
import CheckOutPage from './Pages/CheckOutPage';

import { ToastContainer } from 'react-toastify';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import DetailPage from './Pages/DetailPage';
import HistoryPage from './Pages/History';
import HistoryDetailPage from './Pages/HistoryDetail';
import { PaymentSuccess } from './Pages/PaymentSuccess';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <NavBar/>, id: 'root', loader: loadEvents, children: [
        {index: true, element: <HomePage/>},
        {path:"shop", element: <ShopPage/>, children: [
          {index:true, element: <ShopPage/>, loader: loadEvents},
        ]},
        {path:"product/:productId", element: <DetailPage/>},
        {path:"cart", element: <CartPage/>},
        {path:'login', id:'login', element: <LoginPage/>},
        {path:'checkout', element: <CheckOutPage/>},
        {path:'history', element: <HistoryPage/>},
        {path:'history/:detail', element: <HistoryDetailPage/>},
        {path:'payment_success/:userId', element: <PaymentSuccess/>},
        {path:"*", element: <Error/>}
      ]
    }
  ]);
  return (
    <>
      <ToastContainer position='top-left' autoClose={1000}/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
