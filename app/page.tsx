 import Image from 'next/image'
import React from 'react'
import Searchbar from '../components/Searchbar'
import HeroCarousel from '../components/HeroCarousel'
 
 const Home = () => {
   return (
    <> 
     <section className="px-6 md:px-20 py-14 ">
        <div className="flex max-xl:flex-col  items-center gap-16">
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

                <p className="mt-6">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                </p>
                <Searchbar />           
            </div>
            <HeroCarousel />
        </div>
     </section>

     <section className="trending-section">
        <h2 className="section-text ">Trending</h2>

        <div className="flex flex-wrap gap-8 gap-y-16">
            {
                ["apple", 'bala', 'asdf'].map((item) =>(
                    <div>{item}</div>
                ))
            }
        </div>
     </section>
     </>
   )
 }
 
 export default Home