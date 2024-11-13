import React, { useState } from 'react';
import styles from '../styles/apply.module.css';
import Footer from '@/components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Apply = () => {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!category) {
      return toast.error('Please select category');
    }

    try {
      const res = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ handle, email, password, category })
      });
      
      const data = await res.json();

      if (data.status === 'success') {
        toast.success('Registration Successful!');
        localStorage.setItem('LinkHubToken', data.token);

        setSubmitted(true);

        // Add a small delay before redirecting to allow the toast to display
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <section className={`${styles.background} min-h-screen flex justify-center items-center`}>
        <div className='main'>
          <div className="content border-2 px-4 py-6 rounded-2xl shadow-lg bg-white">
            <h1 className="text-3xl font-bold text-center text-indigo-400">Join Link Hub Today</h1>
            <p className='text-center mt-3 text-gray-500 font-bold'>Create one Link for all your Accounts!</p>
            <form onSubmit={handleRegister} className='flex flex-col gap-4 text-lg mt-2'>
              <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                <img className='w-6 mr-2' src='/svg/ig.svg' alt="icon" />
                <input
                  className='focus:outline-none'
                  type='text'
                  placeholder='Social Handle'
                  required
                  value={handle}
                  onChange={e => setHandle(e.target.value)}
                />
              </span>
              <input
                className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'
                type='email'
                placeholder='Enter your email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'
                type='password'
                placeholder='Set Your password'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <h5 className='text-sm text-center text-gray-500'>Account Type: </h5>
              <span className='flex'>
                {['Creator', 'Agency', 'Brand'].map((type) => (
                  <label key={type} className='flex flex-row mr-3 gap-2'>
                    <input type='radio' value={type} checked={category === type} onChange={handleCategoryChange} />
                    <p>{type}</p>
                  </label>
                ))}
              </span>

              <input className='bg-blue-500 text-white py-2 rounded-lg cursor-pointer' type='submit' value='Apply' />
            </form>
          </div>
          <h4 className='text-center text-white pt-3 '>
            Already have an account? <Link href='/login' className='font-bold text-indigo-400 ml-2 underline'>Log In</Link>
          </h4>
        </div>
      </section>
      <Footer />
       
    </>
  );
}

export default Apply;
