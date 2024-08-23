import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Sign';
import ForgotPassword from './Components/Forgetpassword';
import HomePage from './Components/HomePage'; // Import the HomePage component
import HomeTraining from './Components/HomeTraining'; // Import the HomeTraining component
import HomeTrainingadmin from './Components/HomeTrainingadmin'; // Import the HomeTraining component
import './App.css';
import Main2 from './Components/Main2';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main2 />,
      children: [
        { path: 'home', element: <HomePage /> },
        { path: 'training', element: <HomeTraining /> },
        { path: 'a', element: <HomeTrainingadmin /> },
        { path: '*', element: <Navigate to="/home" /> }
      ],
    },
    // Uncomment and adjust this if you have an admin dashboard
    // {
    //   path: '/admin',
    //   element: <AdminDashboard />,
    //   children: [
    //     { path: 'dashboard', element: <AdminDashboard /> },
    //     { path: 'viewUsers', element: <DisplayUsers /> },
    //     { path: 'viewFeedbacks', element: <ViewFeedbacks /> },
    //   ],
    // },
    { path: 'login', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    { path: 'verify', element: <ForgotPassword /> }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
