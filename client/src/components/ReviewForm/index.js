import React, {useState} from 'react'
import { useMutation } from '@apollo/client'
import { ADD_REVIEW } from '../../utils/mutations'
import "./style.css" 
import { GrSend } from "react-icons/gr";


const ReviewForm = ({productId}) => {
const [reviewBody, setBody] = useState('')
const [characterCount, setCharacterCount] = useState(0)
const [addReview, { error }] = useMutation(ADD_REVIEW)

const handleChange = event => {
  if(event.target.value.length <= 280){
    setBody(event.target.value);
    setCharacterCount(event.target.value.length)
  }
}

//submit form
const handleFormSubmit = async (event) => {
  //commit out
  //to get reviews to display without manualy refreshing page
  // event.preventDefault();

  try{
    await addReview({
      variables: {reviewBody, productId}
    })
    console.log('Is this working')
    setBody('')
    setCharacterCount(0)
  }catch(e){
console.error(e)
  }
 

}
  return (
    <div>
    <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}
    >
      Character Count: {characterCount}/280
      {error && <span className="ml-2">Something went wrong...</span>}
    </p>
    <form className="flex-row justify-center justify-space-between-md align-stretch review-form"
    onSubmit={handleFormSubmit}>
    <div className='review-form-container'>
    <textarea
    placeholder="Leave a review for this product..."
    value={reviewBody}
    onChange={handleChange}
    className="review-form-input col-12 col-md-9 review-input"
  ></textarea>
  <button className="review-btn col-12 col-md-3" type="submit">
    <GrSend className='GrSend' />
  </button>
    
    </div>
     
    </form>
  </div>
  )
}

export default ReviewForm