import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Direct from '../pages/Direct';
import Reels from '../pages/Reels';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DefaultLayout from '../layouts/DefaultLayout';
import Explore from '../pages/Explore';
import ForgetPass from '@/pages/ForgetPass';
import DefaultGuest from '@/layouts/DefaultGuest';
import { useAuth } from '@/hooks/useAuth';
import StoryModal from '@/components/Story/StoryModal';
const stories = [
    {
        storyId: 1,
        avatar: 'https://via.placeholder.com/150',
        username: 'JohnDoe',
        status: true,
        images: [
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/400',
        ],
    },
    {
        storyId: 2,
        avatar: 'https://via.placeholder.com/150',
        username: 'JaneSmith',
        status: false,
        images: [
            'https://via.placeholder.com/500',
            'https://via.placeholder.com/600',
        ],
    },
    {
        storyId: 3,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'BobJohnson',
        status: true,
        images: [
            'https://via.placeholder.com/700',
            'https://via.placeholder.com/800',
        ],
    },
    {
        storyId: 4,
        avatar: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'JohnDoe',
        status: true,
        images: [
            'https://via.placeholder.com/900',
        ],
    },
    {
        storyId: 5,
        avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'JaneSmith',
        status: false,
        images: [
            'https://via.placeholder.com/1000',
        ],
    },
    {
        storyId: 6,
        avatar: 'https://via.placeholder.com/150',
        username: 'BobJohnson',
        status: true,
        images: [
            'https://via.placeholder.com/1100',
            'https://via.placeholder.com/1200',
        ],
    },
    {
        storyId: 7,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'JohnDoe',
        status: true,
        images: [
            'https://via.placeholder.com/1300',
            'https://via.placeholder.com/1400',
        ],
    },
    {
        storyId: 8,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'JaneSmith',
        status: false,
        images: [
            'https://via.placeholder.com/1500',
        ],
    },
    {
        storyId: 9,
        avatar: 'https://images.unsplash.com/photo-1546881963-ac8d67aee789?q=80&w=2558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'BobJohnson',
        status: true,
        images: [
            'https://via.placeholder.com/1600',
        ],
    },
    {
        storyId: 10,
        avatar: 'https://via.placeholder.com/150',
        username: 'JohnDoe',
        status: true,
        images: [
            'https://via.placeholder.com/1700',
            'https://via.placeholder.com/1800',
        ],
    },
];

// Component bảo vệ route yêu cầu xác thực
function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth(); // Kiểm tra trạng thái đăng nhập
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Component bảo vệ route dành cho khách
function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? children : <Navigate to="/" replace />;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            // <PrivateRoute>
                <DefaultLayout />
            // </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/accounts/:username',
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
    // {
    //     path: '/stories/:username/:id',
    //     element: <StoryModal stories={stories}/>,
    // },
    {
        path: '/',
        element: (
            <GuestRoute>
                <DefaultGuest />
            </GuestRoute>
        ),
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'forgetpass',
                element: <ForgetPass />,
            },
        ],
    },
]);

export default router;
