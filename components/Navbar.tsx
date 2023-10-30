import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navIcons = [
    {src:"/assets/icons/search.svg", alt: 'serach'},
    {src:"/assets/icons/white-heart.svg", alt: 'serach'},
    {src:"/assets/icons/user.svg", alt: 'serach'},
]

const Navbar = () => {
  return (
     <header className="w-full">
        <nav className="nav">
            <Link href='/' className='flex items-center gap-1'>
               <Image 
                 src="/assets/icons/logo.svg"
                 width={27}
                 height={27}
                 alt='logo'
                 className='mt-[1px]'
               />
               <p className="nav-logo">
                Data<span className='text-cyan-500'>Chisel</span>
               </p>
            </Link>
            <div className="flex items-center gap-5">
                  {navIcons.map((icon) =>(
                    <Image 
                      key={icon.alt}
                      src={icon.src}
                      alt={icon.alt}
                      width= {28}
                      height={28}
                      className='object-contain'
                     />
                  ))}
            </div>
        </nav>
     </header>
  )
}

export default Navbar
