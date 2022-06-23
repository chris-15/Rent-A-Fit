import React, { useState } from "react";
import { BiUpload} from "react-icons/bi";
import "./style.css";

const AddPost = () => {
  // const [formData, setFormData] = useState({
  //   //input values in textarea
  //   name: '',
  //   price: '',
  //   description: '',
  //   image: ''
  // });

  // const uploadImage = (files) => {
  //     console.log(files[0])
  //     const formData = new FormData()
  //     formData.append('file', imageSelected)
  //     formData.append('upload_preset', 'RentAFit')

  //     Axios.post('https://api.cloudinary.com/v1_1/rentafit/image/upload', FormData
  //     ).then((response) => {
  //         console.log(response)
  //     })
  // }

  // const handleImageUpload = async () => {
  //     const data = new FormData()
  //     data.append('file', image)
  //     data.append('upload_preset', 'RentAFit')
  //     data.append("cloud_name", "rentafit")
  // }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("HEllo");
  };
  return (
    <div className="post_container">
    <div className="form-container-parent">

      <form onSubmit={handleFormSubmit} className="form-container">

      <span className="add-post-title">
      <h1>Post a Product</h1>
      </span>
     

      
        <h3>Title</h3>
        <div className="price-input-container">
        <textarea
        id="title-input"
        // value={formData.name}
        className="form-input"
      ></textarea>
          
          <input
            id="price-input"
            // value={formData.price}
            className="form-input "
            type="number"
            min="1"
            max="1000"
       
          ></input> 
          <p className="per-day"> /day</p>

        
        </div>

        <label id="add-photo">
          <input
            type="file"
            //  value={formData.image}
            accept="image/*"
            name="image"
            style={{display: 'none'}}
         />
        <h4>  <BiUpload /> Add Photo </h4>
        </label>

        <h3>Description</h3>
        <textarea
          id="description-input"
          //  value={formData.description}
          className="form-input"
        ></textarea>
        <button type="submit" className="add-post-btn">
       Add Post
        </button>
      </form>
     
    </div>
    </div>
  );
};

export default AddPost;
