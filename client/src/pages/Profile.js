import React from 'react'
import Auth from '../utils/auth'
import { Navigate, useParams } from 'react-router-dom'
import ProductList from '../components/ProductList'
import  { QUERY_ME, QUERY_USER} from '../utils/queries'
import { useQuery } from '@apollo/client'


const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, { 
        variables: { username: userParam}
    })

    const user = data?.user || data?.me || []

      //navigate to personal profile page if the username is the logged-in user's
    if(Auth.loggedIn() && Auth.getProfile().data.username === userParam){
        return <Navigate to='/profile' />
    }

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
    <div className='flex-row mb-3'>
    <h2>Viewing { userParam ? `${user.username}'s` : 'Your'} </h2>
    </div>

    <div className=' col-12 col-lg-8 flex-row justify-space-between mb-3'>
    {/* Print PRODUCT List */}
    <ProductList 
    username={user.username}
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