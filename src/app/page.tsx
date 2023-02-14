'use client'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import { register } from '@/services/register'


export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [completed, setCompleted] = useState<boolean>(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  async function handleUpload() {
    const formData = new FormData()
    if (!image || !username) return
    formData.append('username', username)
    formData.append('image', image)
    register(formData).then((res) => {
      setCompleted(true)
    })
  }

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      {completed &&
        <div className="bg-white rounded-lg  p-6">
          <h1 className="text-md font-bold">Thank you for registering!</h1>
        </div>
      }
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
            <input type="text" name="username"
              id="username"
              data-testid="username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Username" />
          </div>
          {!image ? <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input
                data-testid="file"
                id="dropzone-file"
                onChange={handleFileChange}
                type="file" className="hidden" />
            </label>
          </div> : <div className="flex items-center justify-center w-full">
            <Image alt='image' src={URL.createObjectURL(image)} width={800} height={400} />
          </div>}
          <button type="submit"
            data-testid="submit"
            onClick={handleUpload}
            className="w-full text-white bg-black focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >Create an account</button>
        </div>
      </div>
    </main>
  )
}
