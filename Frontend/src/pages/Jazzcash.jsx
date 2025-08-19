import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const JazzCashPage = () => {
  const { backendUrl, token, setCartItems, delivery_fee, getCartAmount } =
    useContext(ShopContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [screenshot, setScreenshot] = useState(null);

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append("address", JSON.stringify(state.orderData.address));
      form.append("items", JSON.stringify(state.orderData.items));
      form.append("amount", state.orderData.amount);
      if (screenshot) {
        form.append("screenshot", screenshot);
      }

      const response = await axios.post(
        backendUrl + "/api/order/jazzcash",
        form,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("JazzCash order placed!");
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
   <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 py-4">

      <h2 className="text-xl font-bold mb-4">Pay with JazzCash</h2>

      <p className="mb-2 text-gray-700">
        Amount to Pay: <b>PKR {getCartAmount() + delivery_fee}</b>
      </p>
      <p className="mb-6 text-gray-700">
        Send payment to JazzCash Number: <b>0300-XXXXXXX</b>
      </p>

      <input
  type="file"
  accept="image/*"
  onChange={(e) => setScreenshot(e.target.files[0])}
  className="mb-4 block mx-auto text-sm text-gray-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-gray-100 file:text-black
             hover:file:bg-gray-200"
  required
/>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-8 sm:px-6 py-2 rounded-lg"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default JazzCashPage;
