import React, { useState } from 'react'; // Importing React and useState hook
import styles from '../styles/apply.module.css'; // Importing CSS module for styling
import Footer from '@/components/Footer'; // Importing Footer component
import { toast, ToastContainer } from 'react-toastify'; // Importing Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing Toastify CSS
import Link from 'next/link'; // Importing Next.js Link for navigation

import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    
    // Initializing state variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission for login
    const handleLogin = async (e) => {
        e.preventDefault(); // Preventing default form submission

        try {
            const res = await fetch('http://localhost:8080/api/login', {
                method: 'POST', // Setting method as POST
                headers: {
                    'Content-Type': 'application/json' // Specifying JSON content type
                },
                body: JSON.stringify({
                    email, // Sending email from state
                    password // Sending password from state
                })
            })
                .then(res => res.json()) // Parsing response as JSON
                .then(data => {
                    // Checking response status
                    if (data.status === 'success') {
                        toast('Login Successful!'); // Showing success message
                        localStorage.setItem('LinkHubToken', data.token); // Storing token in local storage
                        router.push('/dashboard');
                    } else if (data.status === 'not found') {
                        toast.error('User Not Found'); // Showing error if user not found
                    } else {
                        toast.error('Login Failed!'); // Showing error for other failures
                    }
                })
                .catch(err => {
                    console.log(err); // Logging any fetch errors
                    toast.error('An Error Occurred'); // Showing error message for network or other issues
                });
        } catch (err) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>
            {/* Main section with background and centering */}
            <section className={`${styles.background} min-h-screen flex justify-center items-center`}>
                <div className='main'>
                    {/* Container for login form */}
                    <div className="content border-2 px-4 py-6 rounded-2xl shadow-lg bg-white">
                        <h1 className="text-3xl font-bold text-center text-indigo-400">Welcome Back</h1>
                        <p className='text-center py-5 font-bold text-gray-400'>Log into Your account</p>

                        {/* Form with onSubmit handler */}
                        <form onSubmit={handleLogin} className='flex flex-col gap-4 text-lg mt-3'>
                            {/* Email input with icon */}
                            <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                                <img className='w-6 mr-2' src='/svg/email.svg' alt="Email Icon" />
                                <input
                                    className='focus:outline-none'
                                    type='email'
                                    placeholder='Enter Your Email'
                                    value={email} // Binding email input with state
                                    onChange={e => setEmail(e.target.value)} // Updating state on input change
                                    required
                                />
                            </span>
                            {/* Password input */}
                            <input
                                className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'
                                type='password'
                                placeholder='Enter Your Password'
                                value={password} // Binding password input with state
                                onChange={e => setPassword(e.target.value)} // Updating state on input change
                                required
                            />
                            {/* Submit button for form submission */}
                            <input
                                className='bg-blue-500 text-white py-2 rounded-lg cursor-pointer'
                                type='submit'
                                value='Log In'
                            />
                        </form>
                    </div>
                    {/* Link for new users to register */}
                    <h4 className='text-center text-white pt-3'>
                        New Here?{' '}
                        <Link href='/apply' legacyBehavior>
                            <a className='font-bold text-indigo-400 ml-2 underline'>Register</a>
                        </Link>
                    </h4>
                </div>
            </section>
            {/* Toast notification container */}
            <ToastContainer position="top-right" autoClose={5000} />
            {/* Footer component */}
            <Footer />
        </>
    );
};

export default Login;
