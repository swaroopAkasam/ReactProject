import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import About from './pages/About';
import YourFood from './pages/YourFood';
import Abstract from './pages/Abstract';
import StartToYourFood from './pages/StartToYourFood';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Abstract />,
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/yourfood",
    element: <StartToYourFood />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

