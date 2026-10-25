import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Inschrijven from './pages/Inschrijven';
import NotFound from './pages/NotFound';
import TotemGalerij from './pages/about/TotemGalerij';
import Leiders from './pages/about/Leiders';
import EenheidsLeiders from './pages/about/EenheidsLeiders';
import Technieken from './pages/activiteiten/Technieken';
import DocumentenPagina from './pages/praktisch/DocumentenPagina';
import Planning from './pages/praktisch/Planning';
import Uniformen from './pages/praktisch/Uniformen';

const router = createBrowserRouter([
  {
    element: <Layout />, 
    children: [
      { path: '/Home', element: <Home /> },
      { path: '/', element: <Navigate to='/home' replace /> },
      { path: '/over-ons', children: [
          { index: true, element: <Navigate to='/over-ons/totem-galerij' replace /> },

          { path: 'totem-galerij', element: <TotemGalerij /> },
          { path: 'leiders', element: <Leiders /> },
          { path: 'eenheidsleiders', element: <EenheidsLeiders /> },
          
        ],
      },
      { path: '/activiteiten', children: [
          { index: true, element: <Navigate to='/activiteiten/technieken' replace />,},
          { path: 'technieken', element: <Technieken /> },
        ],
      },
      { path: '/praktisch', children: [
          { index: true, element: <Navigate to='/praktisch/documenten' replace />},
          { path: 'documenten', element: <DocumentenPagina /> },
          { path: 'planning', element: <Planning /> },
          { path: 'uniformen', element: <Uniformen /> },
        ],
      },
      { path: '/inschrijven', element: <Inschrijven /> },
      { path: '*', element: <NotFound /> }, 
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);