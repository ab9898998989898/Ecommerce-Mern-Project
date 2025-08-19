import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const About = () => {
  return (
    <div className='pb-4'>
       <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
       </div>
       <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] rounded' src={assets.about_img} alt="About Image" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever Fashions is an online store that sells clothing and accessories for men, women, and kids. We offer a wide range of styles, colors, and sizes to fit your unique taste. we also offer a wide range of styles, colors, and sizes to fit your unique taste</p>
          <p>Since our establishment, we have been committed to providing our customers with the best possible experience. We value your feedback and are always looking for ways to improve our products and services.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our Mission is to provide our customers with the best possible experience by offering a wide range of styles, colors, and sizes to fit your unique taste and by always looking for ways to improve our products and services and to provide our customers with the best possible experience</p>
        </div>
       </div>
      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurance:</b>
                <p className='text-gray-600'>We provide a wide range of styles, colors, and sizes to fit your unique taste and by always looking for ways to improve our products and services and to provide our customers with the best possible experience </p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convenience:</b>
                <p className='text-gray-600'>Our products are high quality and durable, and we offer a wide range of styles, colors, and sizes to fit your unique taste</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Service:</b>
                <p className='text-gray-600'>We offer a wide range of styles, colors, and sizes to fit your unique taste, Our team is committed to providing our customers with the best possible experience</p>
            </div>
      </div>

      <NewsLetterBox />

    </div>
  )
}

export default About
