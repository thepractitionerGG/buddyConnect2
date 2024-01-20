import React, { useState } from "react";
import UserSearch from "./components/UserSearch";
import ChatArea from "./components/ChatArea";
import UserList from "./components/UserList";

function Home(){
    const [searchKey , setSearchKey] = useState(null)
    return (
        <div className="flex">
            {/* user search , user list */}
            <div className="w-96">
                <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
                <UserList searchKey={searchKey} />
            </div>
            {/* chat area */}
            <div>
                <ChatArea />
            </div>
        </div>
    )
}

export default Home