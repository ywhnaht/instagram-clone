import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Direct from '../pages/Direct';
import Reels from '../pages/Reels';

const router = createBrowserRouter([
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
    element: <Reels/>,
  },
]);

export default router;
