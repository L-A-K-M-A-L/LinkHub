import React, { useEffect, useState, useContext } from 'react';
import UserContext from '@/context/userContext';
import UserHeader from '@/components/UserHeader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Profile = () => {
    const { userData, setUserData } = useContext(UserContext);
    const router = useRouter();

    // Initialize state for social media links
    const [social, setSocial] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        github: ''
    });

    // Initialize other profile fields
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('https://cdn-icons-png.flaticon.com/128/924/924874.png');

    // Update social media state on input change
    const handleSocial = (e) => {
        setSocial({
            ...social,
            [e.target.id]: e.target.value
        });
    };

    // Update profile fields from the user data context
    useEffect(() => {
        if (userData) {
            setName(userData.name ? userData.name : userData.handle || '');
            setBio(userData.bio || '');
            setAvatar(userData.avatar || 'https://cdn-icons-png.flaticon.com/128/924/924874.png');
        }
    }, [userData]);

    // Save profile data to the backend
    const saveProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/save/profile', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    tokenMail: localStorage.getItem('LinkHubToken'),
                    name,
                    bio,
                    avatar
                })
            });
            const response = await res.json();
            if (response.status === 'error') {
                return toast.error(response.error || 'An error occurred while saving profile');
            }
            toast.success('Profile saved successfully');
        } catch (error) {
            console.error('Profile Save Error:', error);
            toast.error('Failed to save profile');
        }
    };

    // Save social links to the backend
    const saveSocials = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/save/socials', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    tokenMail: localStorage.getItem('LinkHubToken'),
                    socials: social
                })
            });
            const response = await res.json();
            if (response.status === 'error') {
                return toast.error(response.error || 'An error occurred while saving socials');
            }
            toast.success('Socials saved successfully');
        } catch (error) {
            console.error('Socials Save Error:', error);
            toast.error('Failed to save socials');
        }
    };

    // Fetch social links if token exists
    useEffect(() => {
        if (!localStorage.getItem('LinkHubToken')) {
            router.push('/login');
            return;
        }

        fetch('http://localhost:8080/load/socials', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                tokenMail: localStorage.getItem('LinkHubToken')
            })
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.status === 'error') {
                    toast.error(response.error || 'Failed to load socials');
                } else {
                    // Ensure we handle undefined or missing data gracefully
                    setSocial(response.social || {});
                }
            })
            .catch((err) => {
                console.error('Error loading socials:', err);
                toast.error('Failed to load socials');
            });
    }, []);

    return (
        <>
            <div>
                <UserHeader />
                <main>
                    <section>
                        <div>
                            <h4 className="font-bold text-center mb-5">Edit Profile</h4>
                            <div>
                                <form onSubmit={saveProfile} className="flex flex-col justify-center items-center">
                                    <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                                        <img className="w-6 mr-2" src="/svg/user.svg" alt="icon" />
                                        <input
                                            className="focus:outline-none w-full"
                                            type="text"
                                            placeholder="Set a Name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </span>
                                    <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                                        <img className="w-6 mr-2" src="/svg/bio.svg" alt="icon" />
                                        <input
                                            className="focus:outline-none w-full"
                                            type="text"
                                            placeholder="Enter Your bio"
                                            required
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </span>
                                    <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                                        <img className="w-6 mr-2" src="/svg/icon.svg" alt="icon" />
                                        <input
                                            className="focus:outline-none w-full"
                                            type="text"
                                            placeholder="Enter profile Icon"
                                            required
                                            value={avatar}
                                            onChange={(e) => setAvatar(e.target.value)}
                                        />
                                        <img className="w-10 rounded-full border-2 border-white shadow-md" src={avatar} alt="user avatar" />
                                    </span>
                                    <input
                                        className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white"
                                        type="submit"
                                        value="Save Profile"
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="mt-14">
                            <h4 className="font-bold text-center mb-5">Edit Social</h4>
                            <div>
                                <form onSubmit={saveSocials} className="flex flex-col justify-center items-center">
                                    {['facebook', 'instagram', 'twitter', 'linkedin', 'github', 'youtube'].map((platform) => (
                                        <span key={platform} className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                                            <img className="w-6 mr-2" src={`/svg/${platform}.svg`} alt="icon" />
                                            <input
                                                id={platform}
                                                className="focus:outline-none w-full"
                                                type="text"
                                                placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`}
                                                required
                                                value={social[platform] || ''}
                                                onChange={handleSocial}
                                            />
                                        </span>
                                    ))}
                                    <input
                                        className="bg-green-500 mb-10 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white"
                                        type="submit"
                                        value="Save socials"
                                    />
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
};

export default Profile;
