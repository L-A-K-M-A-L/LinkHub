import Link from 'next/link';
import React from 'react'

const SocialTree = ({ social }) => {

    const {
        facebook,
        twitter,
        instagram,
        youtube,
        linkedin,
        github
    } = social;

    return (
        <>
            <div className='social flex flex-row justify-center my-4'>
                <Link className='bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hiver:scale-110 shadow border boder-gray-70 mx-1 select-none' target='_blank' href={`https://facebook.com/${facebook}`}>
                     <img src='/svg/facebook.svg' className='w-6'/>
                </Link>
                <Link className='bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hiver:scale-110 shadow border boder-gray-70 mx-1 select-none' target='_blank' href={`https://instagram.com/${instagram}`}>
                     <img src='/svg/instagram.svg' className='w-6'/>
                </Link>
                <Link className='bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hiver:scale-110 shadow border boder-gray-70 mx-1 select-none' target='_blank' href={`https://youtube.com/${youtube}`}>
                     <img src='/svg/youtube.svg' className='w-6'/>
                </Link>
                <Link className='bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hiver:scale-110 shadow border boder-gray-70 mx-1 select-none' target='_blank' href={`https://linkedin.com/${linkedin}`}>
                     <img src='/svg/linkedin.svg' className='w-6'/>
                </Link>
                <Link className='bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hiver:scale-110 shadow border boder-gray-70 mx-1 select-none' target='_blank' href={`https://twitter.com/${twitter}`}>
                     <img src='/svg/twitter.svg' className='w-6'/>
                </Link>
                <Link className='bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hiver:scale-110 shadow border boder-gray-70 mx-1 select-none' target='_blank' href={`https://github.com/${github}`}>
                     <img src='/svg/github.svg' className='w-6'/>
                </Link>
            </div>
        </>
    )
}

export default SocialTree;