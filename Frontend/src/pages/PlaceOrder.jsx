import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/cartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
        screenshot: null
    })


    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }))
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                // Api calls for cash on delivery order
                case 'cod':
                    {
                        const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                        if (response.data.success) {
                            setCartItems({})
                            navigate('/orders')
                        } else {
                            console.log(response.data.message);
                            toast.error(response.data.message)
                        }

                        break;
                    }
                case 'stripe':
                    {
                        const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
                        if (responseStripe.data.success) {
                            const { session_url } = responseStripe.data
                            window.location.replace(session_url)
                        } else {
                            toast.error(responseStripe.data.message)
                        }
                        break;
                    }
                case 'jazzcash': {
                    // Instead of calling API here, redirect to JazzCash page
                    navigate('/jazzcash', {
                        state: {
                            orderData, // pass order info to next page
                        },
                    });
                    break;
                }


                default:
                    break;

            }


        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left Side */}
            <div className='flex flex-col gap-4 w-full max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'ORDER'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" required />
                    <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' type="text" required />
                </div>
                <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter your email' type="email" required />
                <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street Address' type="text" required />
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" required />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" required />
                </div>
                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zip Code' type="number" required />
                    <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" required />
                </div>
                <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' type="number" required />
            </div>
            {/* Right Side */}
            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>


                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex gap-3 flex-col sm:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-emerald-400' : ''}`}></p>
                            <img className='h-5 mx-4 max-w-12' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('jazzcash')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'jazzcash' ? 'bg-emerald-400' : ''}`}></p>
                            <img className='h-5 mx-4 max-w-14' src={assets.jazzcash_icon} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-emerald-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>

                    </div>


                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white text-sm my-8 px-16 py-3 cursor-pointer'>PLACE ORDER</button>
                    </div>
                </div>

            </div>


        </form>
    )
}

export default PlaceOrder
