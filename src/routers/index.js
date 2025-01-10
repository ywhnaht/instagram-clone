import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Direct from '../pages/Direct';
import Reels from '../pages/Reels';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DefaultLayout from '../layouts/DefaultLayout';
import Explore from '../pages/Explore';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/direct',
                element: <Direct />,
            },
            {
                path: '/reels',
                element: <Reels />,
            },
            {
                path: '/explore',
                element: <Explore />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
]);

export default router;
