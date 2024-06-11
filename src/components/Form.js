'use client'
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
  })

  const [image, setImage] = useState(null)

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formData.title)
    formData.append("description", formData.description)
    formData.append("amount", formData.amount)
    formData.append("image", image)

    console.log(FormData)
  }

  return (
    <section className="p-4 mt-20 h-full max-w-md mx-auto flex flex-col border border-blue-200 justify-between">
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 items-center ">
          <div className="relative w-full flex items-center">
            <input name="title" value={formData.title} onChange={handleChange} className="border border-black pl-10  w-full py-2 px-4 rounded-md" type="text" placeholder="Product Title"/>            
            <div className="absolute left-4 text-blue-400"><FaRegUser /></div>
          </div>        
          <div className="relative w-full flex items-center">
            <input name="description" value={formData.description} onChange={handleChange} className="border border-black pl-10 w-full py-2 px-4 rounded-md" type="text" placeholder="Product Description" />            
            <div className="absolute left-4 text-blue-400"><MdOutlineLock /></div>
          </div>  
          <div className="relative w-full flex items-center">
            <input name="amount" value={formData.amount} onChange={handleChange} className="border border-black pl-10 w-full py-2 px-4 rounded-md" type="text" placeholder="Product Amount" />            
            <div className="absolute left-4 text-blue-400"><MdOutlineLock /></div>
          </div>                                     
          <div className="relative w-full flex items-center">
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" className="border border-black pl-10 w-full py-2 px-4 rounded-md" required/>            
            <div className="absolute left-4 text-blue-400"><MdOutlineLock /></div>
          </div>                                     
        </div>

        <div className="flex flex-col gap-6 items-center">
          <button className="bg-blue-800 hover:bg-blue-700 text-white w-full rounded-md py-2 ">Add Product</button>
        </div>
      </form>
    </section>
  )
}

export default Form