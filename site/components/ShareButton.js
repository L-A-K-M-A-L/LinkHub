import { useRouter } from 'next/router'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShareButton = () => {
    const router = useRouter();
    
    const copyLink = () => {
        navigator.clipboard.writeText(`http://localhost:3000/${router.query.handle}`);
        toast('Copied to Clipboard');
    }
  
    return (
    <>
        <div className='absolute cursor-pointer top-28 left-10 bg-indigo-200 hover:bg-indigo-400 p-2 rounded-md z-10 shadow-md border-2 border-indigo-400' onClick={copyLink}>
            <img className='w-4' src='/svg/share.svg' alt='share_button_icon'/>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
    </>
  )
}

export default ShareButton