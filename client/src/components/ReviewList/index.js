import React from 'react'
import { Link} from 'react-router-dom'
import './style.css'


const ReviewList = ({ reviews }) => {
  console.log(reviews)
  return (

   <div className=' mb-3'>
   <div className=''>
   <span className='reviews-header'>Reviews</span>
   </div>
   <div className='review-container'>
   {reviews && reviews.map((review) => {
    return(
      <div className='review-container'>
      <Link to={`/profile/${review.username}`} style={{fontWeight: 700}}
      className='review-username'>
      {review.username} on { review.createdAt}
      </Link>
       <p className='pill mb-3 single-review' key={review._id}>
       {review.reviewBody}</p>
       </div>
   )})}
   </div>
   </div>
  )
}

export default ReviewList