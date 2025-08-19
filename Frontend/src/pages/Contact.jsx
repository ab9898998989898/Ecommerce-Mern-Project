import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='pb-4'>
      
    <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
    </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] rounded' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>54709 William St <br /> Suite 350, New York, NY 10012</p>
            <p className='text-gray-500'>Tel: (123) 456-7890 <br /> Email: 4oJb0@example.com</p>
            <p className='font-semibold text-xl text-gray-600'>Careers at Forever Fashions</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>
            <button className='border rounded border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>

      <NewsLetterBox />

    </div>
  )
}

export default Contact
