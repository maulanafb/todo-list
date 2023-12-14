"use client"
import { signIn, useSession ,signOut} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className='mx-auto px-6 py-4 bg-[#333333]'
    >
      <div className='flex flex-row justify-between mx-auto'>
          <Image src={'/logo.png'} alt='logo'  width={126} height={126}/>
        <div className='flex flex-row space-x-4'>
          {session ? 
            <div className='px-6 py-3 bg-[#1E6F9F] rounded-xl text-lg text-white'>Hello {session?.user?.name}</div>
          : 
          <button onClick={()=>signIn()}>
            <div className='px-6 py-3 bg-[#1E6F9F] rounded-xl text-lg text-white'>Login</div>
          </button>
          }
          {session?.user && <button onClick={()=> signOut()}>
            <div className='px-6 py-3 bg-red-400 rounded-xl text-lg text-white'>Logout</div>
          </button>}
          </div>
      </div>
    </nav>
  )
}

export default Navbar