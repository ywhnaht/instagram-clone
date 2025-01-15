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
import EmailVerification from '@/pages/EmailVerification';

// Component bảo vệ route yêu cầu xác thực
function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth(); // Kiểm tra trạng thái đăng nhập
    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/accounts/login" replace />
    );
}

// Component bảo vệ route dành cho khách
function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? children : <Navigate to="/" replace />;
}

// Component bảo vệ route yêu cầu xác thực email
function EmailVerificationRoute({ children }) {
    const { user } = useAuth();
    return user?.isVerified ? (
        children
    ) : (
        <Navigate to="/accounts/emailverification" replace />
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                {/* <EmailVerificationRoute> */}
                    <DefaultLayout />
                {/* </EmailVerificationRoute> */}
            </PrivateRoute>
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
    {
        path: '/stories/:username/:id',
        element: <StoryModal />,
    },
    {
        path: '/accounts',
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
            {
                path: 'emailvertification',
                element: <EmailVerification />,
            },
        ],
    },
]);

export default router;
