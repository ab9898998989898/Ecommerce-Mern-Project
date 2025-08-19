import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-600'>
      <div>
        <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="Exchange Icon" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer a hassle-free exchange policy to ensure your satisfaction.</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="Quality Icon" />
        <p className='font-semibold'>Quality Assurance</p>
        <p className='text-gray-400'>We ensure the best quality products for our customers.</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={assets.support_img} alt="Support Icon" />
        <p className='font-semibold'>24/7 Customer Support</p>
        <p className='text-gray-400'>Our support team is here to assist you at any time.</p>
      </div>
    </div>
  )
}

export default OurPolicy
