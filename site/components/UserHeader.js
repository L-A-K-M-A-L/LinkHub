import { useRouter } from 'next/router';
import React from 'react';

const UserHeader = ({ data }) => {
    console.log("UserHeader received data:", data); // Debug data

    const { name = 'Guest', role = 'User', avatar = 'https://cdn-icons-png.flaticon.com/128/924/924874.png', handle = '', links = 0 } = data || {};
    const router = useRouter();
    
    const handleLogOut = () => {
        localStorage.removeItem('LinkHubToken');
        router.push('/login');
    };
    
    return (
        <>
            <header className="flex flex-row justify-between items-center">
                {handle ? (
                    <>
                        <div className="flex flex-col md:flex-row p-5">
                            <button className="inline-flex px-5 py-3 text-purple-500 hover:text-purple-700 hover:bg-purple-100 rounded-md mb-3 border-2 border-purple-500">
                                <img src="/svg/url.svg" alt="Edit Links" className="w-6 mr-3" />
                                Edit Links
                            </button>
                            <button className="inline-flex px-5 py-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md mb-3 border-2 border-red-500 md:ml-4">
                                <img src="/svg/user.svg" alt="Edit Profile" className="w-6 mr-3" />
                                Edit Profile
                            </button>
                        </div>
                        <div className="flex flex-row">
                            <div className="inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg">
                                <div className="text-xs md:text-md flex flex-col">
                                    <span className="font-bold">{handle}</span>
                                    <span>{role} Pack</span>
                                </div>
                                <img className="w-10 ml-5" src={avatar} alt="User Avatar" />
                            </div>
                            <img className="w-6 mr-5 cursor-pointer" src="/svg/notification.svg" alt="Notifications" />
                            <img className="w-6 mr-5 cursor-pointer" src="/svg/logout.svg" alt="Logout" onClick={handleLogOut} />
                        </div>
                    </>
                ) : (
                    <p>Loading user information...</p>
                )}
            </header>
        </>
    );
};

export default UserHeader;
