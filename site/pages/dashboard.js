import React, { useEffect, useState } from 'react';
import LinkBox from '@/components/LinkBox';
import UserHeader from '@/components/UserHeader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '@/context/userContext';
import { useContext } from 'react';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); // Track errors
    const { setUserData } = useContext(UserContext);
    
    useEffect(() => {
        const token = localStorage.getItem('LinkHubToken');
        if (!token) {
            window.location.href = "/login";
            return;
        }

        fetch('http://localhost:8080/data/dashboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tokenMail: token })
        })
        .then(res => res.json())
        .then(response => {
            console.log("Dashboard API response:", response); // Debug API response
            if (response.status === 'error') {
                setError(response.message || 'An error occurred');
                toast.error(response.message || 'Failed to load dashboard data');
            } else {
                setData(response.userData);
                setUserData(response.userData);
                localStorage.setItem('userHandle', response.userData.handle);
                toast.success(response.message);
            }
        })
        .catch(err => {
            console.error("Fetch Error:", err);
            setError('Failed to load user data.');
        });
    }, []);

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!data) {
        return <p className="text-center">Loading user data...</p>;
    }

    return (
        <>
            <div>
                <UserHeader />
                <main>
                    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <LinkBox lbTitle="Links" lbNumber={data.links} lbSvg="url" lbTheme="red" />
                        <LinkBox lbTitle="Growth" lbNumber="30%" lbSvg="growth" lbTheme="blue" />
                        <LinkBox lbTitle="Links" lbNumber="12" lbSvg="email" lbTheme="red" />
                        <LinkBox lbTitle="Growth" lbNumber="30%" lbSvg="ig" lbTheme="blue" />
                    </section>
                </main>
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
};

export default Dashboard;
