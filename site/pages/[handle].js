import LinkTree from '@/components/LinkTree';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import SocialTree from '@/components/SocialTree';
import ShareButton from '@/components/ShareButton';

const Handle = () => {
    const router = useRouter();
    const [data, setData] = useState({});
    const [userFound, setUserFound] = useState(false);
    const [social, setSocial ] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        github: ''
    });

    useEffect(() => {
        if (router.query?.handle) {
            fetch(`http://localhost:8080/get/${router.query.handle}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'error') {
                        toast.error(data.error);
                    } else if (data.status === 'success') {
                        setData(data.userData);
                        setUserFound(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error('An error occurred while fetching data.');
                });
        }
    }, [router.query]);

    // Grab social link from db
    useEffect(()=>{
        if (router.query?.handle) {
            fetch(`http://localhost:8080/get/socials/${router.query.handle}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'error') {
                        toast.error(data.error);
                    } else if (data.status === 'success') {
                        setSocial(data.socials);
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error('An error occurred while fetching data.');
                });
        } 
    }, [router.query]);

    if (!userFound) {
        return (
            <>
                <div className='not-found px-3 text-center text-black pt-3 '>
                    <h1 className='font-bold text-3l'>User is not found 🫤</h1>
                    <h4>
                        New Here?{' '}
                        <Link href='/apply' legacyBehavior>
                            <a className='font-bold text-indigo-400 ml-2 underline'>Register</a>
                        </Link>
                    </h4>
                    <ToastContainer position="top-right" autoClose={5000} />
                </div>
            </>
        );
    }

    return (
        <div>
            <ShareButton />
            <LinkTree data={data} />
            <SocialTree social={social}/>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default Handle;
