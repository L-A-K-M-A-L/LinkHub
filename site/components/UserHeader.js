import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '@/context/userContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserHeader = () => {

    // const { name = 'Guest', role = 'User', avatar = 'https://cdn-icons-png.flaticon.com/128/924/924874.png', handle = '', links = 0 } = data || {};
    const router = useRouter();

    const handleLogOut = () => {
        localStorage.removeItem('LinkHubToken');
        router.push('/login');
    };

    const { userData, setUserData } = useContext(UserContext);

    const { role = 'User', avatar = 'https://cdn-icons-png.flaticon.com/128/924/924874.png', handle = '', name='' } = userData || {};
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); // Track errors
    // const { setUserData } = useContext(UserContext);

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

    return (
        <>
            <header className="flex flex-row justify-between items-center">
                {handle ? (
                    <>
                        <div className="flex flex-col md:flex-row p-5">
                            <Link href="/edit/link">
                                <button className="inline-flex px-5 py-3 text-purple-500 hover:text-purple-700 hover:bg-purple-100 rounded-md mb-3 border-2 border-purple-500">
                                    <img src="/svg/url.svg" alt="Edit Links" className="w-6 mr-3" />
                                    Edit Links
                                </button>
                            </Link>
                            <Link href="/edit/profile">
                                <button className="inline-flex px-5 py-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md mb-3 border-2 border-red-500 md:ml-4">
                                    <img src="/svg/user.svg" alt="Edit Profile" className="w-6 mr-3" />
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                        <Link href={`/${handle}`}>
                            <div className="flex flex-row justify-between items-center">
                                <div className="inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg gap-4">
                                    <div className="text-xs md:text-md flex flex-col">
                                        <span className="font-bold">{name ? name : handle }</span>
                                        <span>{role} Pack</span>
                                    </div>
                                    <img className="w-10 ml-auto rounded-full border-2 border-white shadow-md" src={avatar} alt="User Avatar" />
                                </div>
                                <img className="w-6 mr-5 cursor-pointer" src="/svg/notification.svg" alt="Notifications" />
                                <img className="w-6 mr-5 cursor-pointer" src="/svg/logout.svg" alt="Logout" onClick={handleLogOut} />
                            </div>
                        </Link>
                    </>
                ) : (
                    <p>Loading user information...</p>
                )}
            </header>
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
};

export default UserHeader;
