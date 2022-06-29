import React from 'react'
import Auth from '../utils/auth'
import { Navigate, useParams } from 'react-router-dom'
import ProductList from '../components/ProductList'
import  { QUERY_ME, QUERY_USER} from '../utils/queries'
import { useQuery } from '@apollo/client'
import UserProductList from '../components/UserProductList'


const Profile = () => {
    const { username } = useParams();

    const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, { 
        variables: { username }
    })

    const user = data?.user || data?.me || []
console.log(user)
      //navigate to personal profile page if the username is the logged-in user's
    if(Auth.loggedIn() && Auth.getProfile().data.username === username){
        // return <Navigate to='/profile' />
    }
    //   return  <Navigate to='/login' />
    // }

    console.log(user)
    if(!user?.username){
        return(
            <h4>
            You need to be logged in to see this page. Use the navigation above to sign up or log in.
            </h4>
        )
    }
    if(loading){
        return <div>Loading...</div>
    }


  return (
    <div>
    <div className='flex-row justify-center mb-3'>
    <h2 className='profile-component-h2'> { username ? `${user.username}'s Profile` : 'Your'} </h2>
    </div>

    <div className='flex-row justify-center mb-3'>
    {/* Print PRODUCT List */}
    <UserProductList
    username={user.username}
    products={user.products}
    />
    </div>

     {/* Print Orders List?
    <div className=' col-12 col-lg-3 flex-row justify-space-between mb-3'>
    <OrderList
    username={user.username}
    rentalDate={user.rentalDate}
    />
    </div>
    */}

    </div>
  )
}

export default Profile