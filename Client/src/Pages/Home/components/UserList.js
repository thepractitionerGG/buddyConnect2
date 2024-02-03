import React from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewChat } from '../../../apicalls/chats';
import { SetAllChats, SetSelectedChat } from '../../../redux/userSlice';
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";

function UserList({ searchKey }) {
  const { allUsers, allChats, user } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  const createNewChat = async (receipentUserId) => {
    try {
      dispatch(ShowLoader());
      const response = await CreateNewChat([user._id, receipentUserId]);
      dispatch(HideLoader());
      if (response.success) {
        toast.success(response.message);
        const newChat = response.data;
        const updatedChats = [...allChats, newChat];
        dispatch(SetAllChats(updatedChats));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  const openChat = (receipentUserId) => {
    console.log(receipentUserId);
    console.log(user._id);
    const chat = allChats.find(
      (chat) =>
        chat.members.includes(user._id) && chat.members.includes(receipentUserId)
    );
    console.log(chat);
    if (chat) {
      dispatch(SetSelectedChat(chat));
    }
  };

  return (
    <div className='flex flex-col gap-3 mt-5 lg:w-96 xl:w-96 md:w-60 sm:w-60'>
      {allUsers.filter((userObj) => (userObj.name.toLowerCase().includes(searchKey.toLowerCase()))
        || allChats.some((chat) => chat.members.includes(userObj._id)))
        .map((userObj) => {
          return (
            <div className='shadow-sm border p-5 rounded-2xl bg-white justify-between items-center'
              key={userObj._id}
              onClick={() => openChat(userObj._id)}>
              <div className='flex gap-5 items-center justify-between'>
                {userObj.profilePic && <img alt="profile"
                  src={userObj.profilePic}
                  className='w-10 h-10 rounded-full'
                />}
                {!userObj.profilePic && <div className='bg-gray-400 rounded-full h-12 w-12 flex items-center justify-center p-1 gap-2'>
                  <h1 className='uppercase text-2xl font-semibold'>{userObj.name[0]}</h1>
                </div>}
                <h1>{userObj.name}</h1>
              </div>

              <div onClick={() => createNewChat(userObj._id)}>
                { // !allChats.some(chat =>chat.members.some(ele => ele._id === userObj._id))
                  !allChats.find((chat) => {
                    for (const ele of chat.members) {
                      if (ele._id === userObj._id) return true;
                    }
                    return false
                  }) && (
                    <button className="border-primary border  text-primary bg-white p-1  rounded gap-1">
                      Create chat
                    </button>
                  )}
              </div>
            </div>
          )
        })

      }
    </div>
  );
}
export default UserList;