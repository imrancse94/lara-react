import React, { Suspense, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/components/include/Loader';

import useAuth from '@/hooks/useAuth';

const AuthLayout = () => {

    // const { isSideMenuOpen } = useThemeContext()
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
    const { auth } = useAuth()


    const AuthComponent = () => {

        return (
            <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSideMenuOpen ? 'overflow-hidden' : ""}`}>
                <Sidebar />
                <div className="flex flex-col flex-1 w-full">
                    <Header />
                    <main className="h-full overflow-y-auto">
                        <div className="container px-6 mx-auto grid">
                            <Suspense fallback={<Loader />}>
                                <Outlet />
                            </Suspense>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

    return auth?.access_token ? <AuthComponent /> : <Navigate to="/login" />;

}

export default AuthLayout;
