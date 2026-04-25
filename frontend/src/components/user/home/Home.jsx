import React from 'react'
import Hero from './Hero'
import Listing from './listing/Listing'
import Footer from './Footer'

const Home = () => {
    return (
        <div className='w-full'>
            <Hero />
            <Listing/>
            <Footer/>
        </div>
    )
}

export default Home
