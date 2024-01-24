import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { GetCurrentUser, getAllUsers } from '../apicalls/users'
import toast from "react-hot-toast";
import {useDispatch , useSelector} from 'react-redux'
import { HideLoader  , ShowLoader} from '../redux/loaderSlice';
import { SetAllUser, SetUser,SetAllChats } from '../redux/userSlice';
import {RiChat1Fill , RiShieldUserLine , RiLogoutCircleRLine} from "@remixicon/react"
import { GetAllChats } from '../apicalls/chats';


function ProtectedRoute({children}){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.userReducer)
    // const [user , setUser] = useState(null)
    const _getCurrentUser = async()=>{
        try {
            dispatch(ShowLoader())
            const response = await GetCurrentUser()
            const allUsers = await getAllUsers()
            const allChatsResponse = await GetAllChats()
            dispatch(HideLoader())
            if(response.success){
                dispatch(SetUser(response.data))
                dispatch(SetAllUser(allUsers.data))
                dispatch(SetAllChats(allChatsResponse.data))
                 /* here we load users and data*/
                // setUser(response.data)
                return true
            }else{
                toast.error(response.message)
                localStorage.removeItem("token");
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
        <div className="h-screen w-screen bg-gray-200 p-2">
      {/* header */}
      <div className="flex justify-between p-5 bg-primary rounded">
        <div className="flex items-center gap-1">
            <RiChat1Fill
            size={30}
            className='text-2xl'
            color='white'
            />
          {/* <i className="ri-message-3-line text-2xl text-white"></i> */}
          <h1
            className="text-white text-2xl uppercase font-bold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            BUDDYCHAT
          </h1>
        </div>
        <div className="flex gap-2 text-md items-center bg-white p-2 rounded">
          {user?.profilePic && 
            <img
              src={user?.profilePic}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          }
          {!user?.profilePic && <RiShieldUserLine size={30} color='primary'/>}
          <h1
            className=" text-primary cursor-pointer font-bold"
            onClick={() => {
              navigate("/profile");
            }}
          >
            {user?.name}
          </h1>

          <RiLogoutCircleRLine
            className="ri-logout-circle-r-line ml-5 text-xl cursor-pointer text-primary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          />
        </div>
      </div>

      {/* content (pages) */}
      <div className="py-5">{children}</div>
    </div>
    )
}

export default ProtectedRoute