import React, {useState} from 'react'
import Axios from 'axios'

const AddPost = () => {

    const [imageSelected, setImageSelected] = useState("")

    const uploadImage = (files) => {
        console.log(files[0])
        const formData = new FormData()
        formData.append('file', imageSelected)
        formData.append('upload_preset', 'RentAFit')
   

        Axios.post('https://api.cloudinary.com/v1_1/rentafit/image/upload', FormData
        ).then((response) => {
            console.log(response)
        })
    }


    // const handleImageUpload = async () => {
    //     const data = new FormData()
    //     data.append('file', image)
    //     data.append('upload_preset', 'RentAFit')
    //     data.append("cloud_name", "rentafit")
    // }
  return (
    <div>
    <input type='file' onChange={(event) =>{setImageSelected(event.target.files[0])}}/>

    <button onClick={uploadImage}>upload Post</button>
    </div>
  )
}

export default AddPost