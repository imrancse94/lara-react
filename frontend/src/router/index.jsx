
import { useRoutes } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import auth from './auth';
import guest from './guest';


export default function Router() {
    return useRoutes([
        auth,
        guest,
        
        {
            path: '/404',
            element: <h1>404</h1>
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />
        }
    ])
}