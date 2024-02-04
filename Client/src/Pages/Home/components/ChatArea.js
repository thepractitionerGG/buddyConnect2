import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";
import { SendMessage, GetMessages } from '../../../apicalls/messages';
import toast from "react-hot-toast";
import moment from "moment";

const ChatArea = () => {
  const dispatch = useDispatch();
  const [newMessage, setMessage] = React.useState("");
  const { selectedChat, user } = useSelector(state => state.userReducer);
  const [messages, setMessages] = React.useState([])
  const receipentUser = selectedChat.members.find(
    (mem) => mem._id != user._id
  );

  const sendNewMessage = async () => {
    try {
      dispatch(ShowLoader());
      const message = {
        chat: selectedChat._id,
        sender: user._id,
        text: newMessage
      };
      const response = await SendMessage(message);
      dispatch(HideLoader());
      if (response.success) {
        setMessage("");
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  }

  const getMessages = async () => {
    try {
      dispatch(ShowLoader());
      const response = await GetMessages(selectedChat._id);
      console.log(response.data);
      dispatch(HideLoader());
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  const getDateInRegualarFormat = (date) => {
    let result = "";

    // if date is today return time in hh:mm format
    if (moment(date).isSame(moment(), "day")) {
      result = moment(date).format("hh:mm");
    }
    // if date is yesterday return yesterday and time in hh:mm format
    else if (moment(date).isSame(moment().subtract(1, "day"), "day")) {
      result = `Yesterday ${moment(date).format("hh:mm")}`;
    }
    // if date is this year return date and time in MMM DD hh:mm format
    else if (moment(date).isSame(moment(), "year")) {
      result = moment(date).format("MMM DD hh:mm");
    }

    return result;
  };

  return (
    <div className="bg-white h-[78vh] border rounded-2xl w-full flex flex-col justify-between p-2">
      <div>
        <div className='flex gap-5 items-center justify-between'>
          {receipentUser.profilePic && <img alt="profile"
            src={receipentUser.profilePic}
            className='w-10 h-10 rounded-full'
          />}
          {!receipentUser.profilePic && <div className='bg-gray-400 rounded-full h-12 w-12 flex items-center justify-center p-1 gap-2 mb-2'>
            <h1 className='uppercase text-xl font-semibold'>{receipentUser.name[0]}</h1>
          </div>}
          <h1 className="uppercase">{receipentUser.name}</h1>
        </div>
        <hr />

      </div>
      <div>
        <div className='flex flex-col gap-2'>
          {messages.map((message) => {
            const isCurrUserSender = message.sender === user._id;
            return <div className={`flex ${isCurrUserSender && 'justify-end'}`}>
              <div className='flex flex-col'>
                <h1 className={`${isCurrUserSender
                    ? "bg-primary text-white rounded-bl-none"
                    : "bg-gray-300 text-primary rounded-tr-none"
                  } p-2 rounded-xl`}>{message.text}</h1>
                <h1 className="text-gray-500 text-sm">
                    {getDateInRegualarFormat(message.createdAt)}
                  </h1>
              </div>
              
            </div>
          })}
        </div>
      </div>
      <div>
      </div>
      <div className='h-20 rounded-xl border-gray-300 shadow border'>
        <input type="text" placeholder="Type a message" className='w-[90%] border-0 h-full rounded-xl focus:border-none'
          value={newMessage}
          onChange={(e) => setMessage(e.target.value)}></input>
        <button className='bg-primary text-white py-2 px-3 rounded h-max'
          onClick={sendNewMessage}>
          SEND
        </button>
      </div>
    </div>
  );
}
export default ChatArea;