import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { User } from './Layout/User/User';
import { Product } from './Layout/Product/Product';
import { AddProduct } from './Layout/Product/AddProduct';
import { EditProduct } from './Layout/Product/EditProduct';
import { RestoreProduct } from './Layout/Product/RestoreProduct';
import { LiveChat } from './Layout/Chat/LiveChat';
import { Dashboard } from './Layout/DashBoard/Dashboard';
import { Layout } from './Layout/Layout';
import { Error } from './Layout/Error';
import { Login } from './Layout/Login';
import { ViewOrder } from './Layout/DashBoard/ViewOrder';

function App() {
 const router = createBrowserRouter([
    {path: '/', element: <Login/>},
    {path: '/home', element:<Layout/> , children: [
       {index: true, element: <Dashboard/>},
       {path: ':orderId', element: <ViewOrder/> },
       {path: 'user', element: <User/> },
       {path: 'product', element: <Product/> },
       {path: 'add_product', element: <AddProduct/> },
       {path: 'edit/:editId', element: <EditProduct/> },
       {path: 'deleted_product', element: <RestoreProduct/>},
       {path: 'live_chat', element: <LiveChat/>},
       {path: '*', element: <Error/>},
    ]}
 ])
 
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
