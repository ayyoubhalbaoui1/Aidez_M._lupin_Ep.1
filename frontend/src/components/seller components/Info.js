import React,{useState,useEffect}  from 'react'
import userImg from '../../img/bussiness-man.png'
import jwt from 'jwt-decode'
import axios from 'axios'

export default function Info() {
    const [seller, setSeller] = useState({})
    const token = localStorage.getItem('token')
    const seller_id = jwt(token)._id

    useEffect(() => {
        getSeller()
      }, []) // eslint-disable-line react-hooks/exhaustive-deps

      const getSeller = async () => {
          await axios.get('http://localhost:5000/seller/getOne/'+seller_id)
                     .then( response =>{
                       setSeller(response.data)
                     })
                     .catch(error =>{
                       console.log(error);
                     })
      }

    return (
        <div className="profile-container">
            <div className="flex items-center justify-center">
                <div className="max">
                    <div className="bg-white rounded-lg py-3">
                    <div className="photo-wrapper p-8">
                        <img className="w-32 h-32 rounded-full mx-auto" src={userImg} alt="Seller" />
                    </div>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{seller.full_name}</h3>
                        <div className="text-center text-gray-400 text-xs {seller.full_name}font-semibold">
                        <p>Seller at Benjamin Marketplace</p>
                        </div>
                        <table className="text-xs my-3">
                        <tbody><tr>
                            <td className="px-2 py-2 text-green-700 font-bold">Address</td>
                            <td className="px-2 py-2">{seller.address}</td>
                            </tr>
                            <tr>
                            <td className="px-2 py-2 text-green-500 font-bold">Phone</td>
                            <td className="px-2 py-2">{seller.phone}</td>
                            </tr>
                            <tr>
                            <td className="px-2 py-2 text-green-500 font-bold">Email</td>
                            <td className="px-2 py-2">{seller.email}</td>
                            </tr>
                            <tr>
                            <td className="px-2 py-2 text-green-500 font-bold">Identity</td>
                            <td className="px-2 py-2">{seller.identity}</td>
                            </tr>
                            <tr>
                            <td className="px-2 py-2 text-green-500 font-bold">Seller Pack</td>
                            <td className="px-2 py-2">{seller.type}</td>
                            </tr>
                        </tbody></table>
                    </div>
                    </div>
                </div>
                </div>

        </div>
    )
}
