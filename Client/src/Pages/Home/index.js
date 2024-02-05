import React, { useState } from "react";
import UserSearch from "./components/UserSearch";
import ChatArea from "./components/ChatArea";
import UserList from "./components/UserList";
import { useSelector } from "react-redux";

function Home() {
    const [searchKey, setSearchKey] = React.useState("");
    const { selectedChat } = useSelector((state) => state.userReducer);
    return (
        <div className="flex gap-5">
            {/* user search , user list */}
            <div className="w-96">
                <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
                <UserList searchKey={searchKey} />
            </div>
            {/* chat area */}
            <div className="w-full">
                {selectedChat && <ChatArea />}
            </div>
        </div>
    )
}

export default Home