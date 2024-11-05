import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer aria-label="Site Footer" className="fixed bottom-5 left-1/2 -translate-x-1/2">
      <Link target='_blank' href="/" className='flex flex-row items-center'>
        <img className='hover:rotate-45 transition-all duration-400' src="/images/favicon.ico" />
        <h5 className='text-indigo-400 pl-4 font-bold hover:text-indigo-300 transition-all duration-400'>Try Link</h5>
      </Link>

    </footer>
  )
}

export default Footer