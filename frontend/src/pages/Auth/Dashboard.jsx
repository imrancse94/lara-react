import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import HeadingTitle from '@/components/include/HeadingTitle'

const Dashboard = () => {

    const {api} = useAxios();
    const [message,setMessage] = useState("");

    const getDashboardInfo = async () => {
        const {data} = await api.get('dashboard');
        if(data?.status_code == 100){
            setMessage(data?.message);
        }
    }
    
    useEffect(()=>{
        getDashboardInfo();

    },[])

    return (
        <div>
            <HeadingTitle title="Dashboard"/>
            <p>{message}</p>
        </div>
    );
}

export default Dashboard;
