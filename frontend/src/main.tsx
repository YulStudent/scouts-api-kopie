import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import NotFound from './pages/NotFound'; 
import { RouterProvider, createBrowserRouter } from 'react-router';
import Leiders  from './pages/about/Leiders.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home  />,
  },
  { path: '/transactions', element: <TransactionList /> },  2
  { path: '/places', element: <PlacesList /> }, 
  { path: '/about', element: <About /> }, 
  { path: '*', element: <NotFound /> }, 
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
