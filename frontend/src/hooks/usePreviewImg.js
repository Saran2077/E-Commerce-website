import React, { useState } from 'react'
import { toast } from 'react-toastify'

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file.type.startsWith("image")) {
        const reader = new FileReader()
        
        reader.onloadend = () => {
            setImgUrl(reader.result)
        }

        reader.readAsDataURL(file)
    }
    else {
        toast.error("Only images are supported")
    }
  }

  return { imgUrl, handleImageChange, setImgUrl }
}

export default usePreviewImg