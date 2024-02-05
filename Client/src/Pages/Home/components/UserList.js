import React from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewChat } from '../../../apicalls/chats';
import { SetAllChats, SetSelectedChat } from '../../../redux/userSlice';
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";
import moment from "moment";

function UserList({ searchKey }) {
  const { allUsers, allChats, user, selectedChat } = useSelector(
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
        dispatch(SetSelectedChat(newChat));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  const openChat = (receipentUserId) => {
    const chat = allChats.find(function (chat) {
      return ((chat.members[0]._id == user._id || chat.members[1]._id == user._id) &&
        (chat.members[0]._id == receipentUserId || chat.members[1]._id == receipentUserId));
    });
    if (chat) {
      dispatch(SetSelectedChat(chat));
    }
  };

  const getData = () => {
    return allUsers.filter((userObj) => (userObj.name.toLowerCase().includes(searchKey.toLowerCase()) && searchKey)
      || allChats.some((chat) => chat.members.map((mem) => mem._id).includes(userObj._id)))
  };

  const getIsSelectedChat = (userObj) => {
    if (selectedChat) {
      return selectedChat.members.map((mem) => mem._id).includes(userObj._id)
    }
    return false;
  }

  const getLastMessage = (userObj) => {
    const chat = allChats.find((chat) => chat.members.map((mem) => mem._id).includes(userObj._id));
    if (!chat || !chat.lastMessage) {
      return "";
    }
    else {
      const lastMsgPerson = chat?.lastMessage?.sender === user._id ? "You :" : "";
      return (
        <div className='flex justify-between'>
          <h1 className='text-gray-600 text-sm'>{lastMsgPerson} {chat?.lastMessage?.text}</h1>
          <h1 className='text-gray-500 text-sm'>{moment(chat?.lastMessage?.createdAt).format("hh:mm A")}</h1>
        </div>
      );
    }
  }

  return (
    <div className='flex flex-col gap-3 mt-5 lg:w-96 xl:w-96 md:w-60 sm:w-60'>
      {getData()
        .map((userObj) => {
          return (
            <div className={`shadow-sm border p-3 rounded-xl bg-white justify-between items-center cursor-pointer w-full
              ${getIsSelectedChat(userObj) && "border-primary border-2"} `}
              key={userObj._id}
              onClick={() => openChat(userObj._id)}>
              <div className='flex gap-5 items-center justify-between'>
                {userObj.profilePic && <img alt="profile"
                  src={userObj.profilePic}
                  className='w-10 h-10 rounded-full'
                />}
                {!userObj.profilePic && <div className='bg-gray-400 rounded-full h-12 w-12 flex items-center justify-center p-1 gap-2'>
                  <h1 className='uppercase text-xl font-semibold'>{userObj.name[0]}</h1>
                </div>}
                <div className='flex flex-col gap-1 w-full'>
                  
                  <h1>{userObj.name}</h1>
                  {getLastMessage(userObj)}
                </div>
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