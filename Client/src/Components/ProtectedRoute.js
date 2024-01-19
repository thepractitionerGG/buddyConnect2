import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { GetCurrentUser } from '../apicalls/users'
import toast from "react-hot-toast";
import {useDispatch} from 'react-redux'
import { HideLoader  , ShowLoader} from '../redux/loaderSlice';


function ProtectedRoute({children}){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [user , setUser] = useState(null)
    const _getCurrentUser = async()=>{
        try {
            dispatch(ShowLoader())
            const response = await GetCurrentUser()
            dispatch(HideLoader())
            if(response.success){
                setUser(response.data)
                return true
            }else{
                toast.error(response.message)
                navigate('/login')
                return false
            }
            //return response.success ? true : false 
        } catch (error) {
            navigate('/login')
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            _getCurrentUser()
        }else{
            navigate('/login')
        }

    },[])
    
    return(
        <div>
            <h1>{user?.name}</h1>
            {user?.email}
            {children}</div>
    )
}

export default ProtectedRoute