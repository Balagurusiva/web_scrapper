 import Image from 'next/image'
import React from 'react'
 
 const Home = () => {
   return (
     <section className="px-6 md:px-20 py-24 border-2 border-cyan-500">
        <div className="flex max-xl:flex-col gap-16">
            <div className="flex flex-col justify-center">
                <p className="small-text">
                    Smart Buy
                    <Image
                      src="/assets/icons/arrow-right.svg"
                      alt="arrow right"
                      width={16}
                      height={16}
                    />
                </p>
                <h1 className="head-text">
                    unleassh the power of 
                    <span className="text-cyan-500"> PriceWise</span>
                </h1>
            </div>
        </div>
     </section>
   )
 }
 
 export default Home