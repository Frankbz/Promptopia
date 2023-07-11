"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);


    useEffect(() => {
        const get_providers = async () => {
            const providers = await getProviders();
            setProviders(providers);
        }
        get_providers();
    }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className='flex gap-2 flex-center'>
            <Image src="/assets/images/logo.svg" alt="logo" width={30} height={30} className='object-contain'/>
            <p className="logo_text">Promptopia</p>
        </Link>

        {/* PC Nav */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn'>
                        Create Prompt
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>

                    <Link href="/profile" className='flex gap-2 flex-center'>
                        <Image 
                        src={session?.user.image}
                        alt="user-picture"
                        width={37} 
                        height={37} 
                        className='rounded-full'/>
                    </Link>
                </div>
            ):(
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button type='button' key={providers.key} onClick={() => signIn(provider.id)} className='black_btn'>
                            Sign in
                        </button>
                    ))}
                </>
            )}
        </div>

        {/* Mobile Dev */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className='flex'>
                    <Image 
                    src={session?.user.image} 
                    alt="user-picture"
                    width={37} height={37} 
                    className='rounded-full' 
                    onClick={() => setToggleDropdown(!toggleDropdown)}
                    />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link
                            href="/profile"
                            className='dropdown_link'
                            onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>

                            <Link
                            href="/create-prompt"
                            className='dropdown_link'
                            onClick={() => setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>

                            <button type='button' 
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }} 
                                    className='mt-5 black_btn w-full'>
                                        Sign Out
                            </button>
                        </div>
                    )}

                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button type='button' key={providers.key} onClick={() => signIn(provider.id)} className='black_btn'>
                            Sign in
                        </button>
                    ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav;