'use client'
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { CldUploadButton } from 'next-cloudinary';
import Image from "next/image"
 
const Form = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [image, setImage] = useState('')
  const [publicId, setPublicId] = useState('')


  const handleImageUpload = (result) =>{
    const info = result.info;
    if('secure_url' in info && 'public_id' in info){
      const url = info.secure_url
      const public_id = info.public_id
      setImage(url)
      setPublicId(public_id)
    }
  }

  const removeImage = async (e) =>{
    e.preventDefault()
    try {
      const res = await fetch('api/removeImage',{
        method: "POST",
        header: { "Content-Type": "application/json"},
        body: JSON.stringify({ publicId })
      })
      if(res.ok){
        setImage("")
        setPublicId("")
      }
    } catch (error) {
        console.log(error)
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = { title, description, amount, image, publicId }
    try {
      const response = await fetch("/api/products",{
        method: 'POST',
        body: JSON.stringify(formData)
      })
      if(!response.ok){
        throw new Error("Failed to Post")
      }
      return response.json({ message: "Posted Successfully" })
    } catch (error) {
      console.error('Error:', error.message)
    } finally{
      setTitle("")
      setDescription("")
      setAmount("")
      setImage("")
      setPublicId("")
    }
  }

  return (
    <section className="p-4 mb-10 max-w-md h-full container mx-auto flex flex-col border border-blue-200 justify-between">
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 items-center ">
          <div className="relative w-full flex items-center">
            <input name="title" value={title} onChange={(e)=>setTitle(e.target.value)} className="border border-black pl-10  w-full py-2 px-4 rounded-md" type="text" placeholder="Product Title"/>            
            <div className="absolute left-4 text-blue-400"><FaRegUser /></div>
          </div>        
          <div className="relative w-full flex items-center">
            <textarea rows={3} name="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="border border-black pl-10 w-full py-2 px-4 rounded-md" type="text" placeholder="Product Description" />            
            <div className="absolute left-4 text-blue-400"><MdOutlineLock /></div>
          </div>  
          <div className="relative w-full flex items-center">
            <input name="amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border border-black pl-10 w-full py-2 px-4 rounded-md" type="text" placeholder="Product Amount" />            
            <div className="absolute left-4 text-blue-400"><MdOutlineLock /></div>
          </div>
          <CldUploadButton uploadPreset= {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onUpload={handleImageUpload} className={`h-48 w-full border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${image && 'pointer-events-none'}`}>
            Add Image
            {image && (<Image src={image} fill className="absolute object-cover inset-0" alt="product" /> )}
          </CldUploadButton>
          {publicId && (<button onClick={removeImage} className="rounded-full py-1 px-5 bg-red-500 hover:bg-red-400 text-white">Remove Image</button>)}                         
        </div>

        <div className="flex flex-col gap-6 items-center">
          <button className="bg-blue-800 hover:bg-blue-700 text-white w-full rounded-md py-2 ">Add Product</button>
        </div>
      </form>
    </section>
  )
}

export default Form
