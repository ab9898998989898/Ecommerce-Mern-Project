import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div className='p-4 text-center'>
            <h1 className='text-4xl font-bold mb-4 text-center'>Welcome to the Admin Dashboard</h1>
            <p className='mb-2'>Manage your e-commerce platform effectively from here.</p>
            <p className='mb-2'>Use the sidebar to navigate through different sections.</p>
            <p className='mb-2'>Stay updated with the latest trends and customer preferences.</p>
            <p className='mb-2'>For any assistance, refer to the documentation or contact support.</p>
            <div className='mt-5 bg-emerald-200 flex flex-col sm:flex-row justify-between items-center px-4 py-2'>
                <h2 className='text-3xl font-bold mb-2'>Quick Links</h2>
                <div className='list-disc list-inside flex flex-col sm:flex-row gap-4 items-center'>
                    <NavLink to='/add' className='text-blue-500 hover:underline decoration-0'>Add New Product</NavLink>
                    <NavLink to='/list' className='text-blue-500 hover:underline decoration-0'>View Products</NavLink>
                    <NavLink to='/orders' className='text-blue-500 hover:underline decoration-0'>Manage Orders</NavLink>
                </div>
            </div>
            <article className="bg-gray-100 p-4 rounded-lg mt-6 shadow-md mb-4">
                <summary className="text-lg font-bold cursor-pointer">Disclaimer</summary>
                <section className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Website Disclaimer</h2>
                    <p className="text-gray-600 mb-4">This website and its contents are provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of this website or the information, content, materials, or products included on this website.</p>
                </section>
                <section className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Limitation of Liability</h2>
                    <p className="text-gray-600 mb-4">We will not be liable for any damages of any kind arising from the use of this website, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages.</p>
                </section>
                <section className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Intellectual Property</h2>
                    <p className="text-gray-600 mb-4">All content on this website, including text, images, and other materials, is the property of [Your Company Name] and is protected by copyright, trademark, and other intellectual property laws.</p>
                </section>
            </article>
        </div>
    )
}

export default Home
