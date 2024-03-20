import { lazy } from 'react';

const AuthLayout = lazy(() => import('@/components/layouts/AuthLayout'));
const Dashboard = lazy(() => import('@/pages/Auth/Dashboard'));

const auth = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: 'dashboard',
            element: <Dashboard />,
            // index:true
        }
    ]

}

export default auth;