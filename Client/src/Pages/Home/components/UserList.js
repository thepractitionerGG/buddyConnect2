import React from 'react'
import {useSelector} from 'react-redux'

const UserList = ({searchKey}) => {
    const {allUsers} = useSelector(state=>state.userReducer)
  return (
    <div className='flex flex-col gap-3 mt-5 lg:w-96 xl:w-96 md:w-60 sm:w-60'>
        {allUsers
        .filter((user)=>user.name.toLowerCase().includes(searchKey && searchKey.toLowerCase()) && searchKey)
        .map((user)=>{
            return(
                <div className='shadow-sm border p-5 rounded-2xl bg-white'>
                    <div className='flex gap-2 item-center'>
                        {user.profilePic && <img
                        src={user.profilePic}
                        className='w-10 h-10 rounded-full'
                        />}
                        {!user.profilePic &&<div className='bg-gray-400 rounded-full h-12 w-12 flex items-center justify-center relative'> 
                            <h1 className='uppercase text-2xl font-semibold'>{user.name[0]}</h1>
                        </div> }
                        <h1>{user.name}</h1>
                    </div>
                </div>
            )
        })

        }
    </div>
  )
}

export default UserList