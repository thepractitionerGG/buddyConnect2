import React from 'react'
import {RiFileSearchLine , RiSearchLine} from "@remixicon/react"

const UserSearch = ({searchKey , setSearchKey}) => {
  return (
    <div>
    <div className="relative">
      <input
        type="text"
        placeholder="Search users / chats"
        className="rounded-xl w-full border-gray-300 pl-10 text-gray-500 h-14"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <RiSearchLine
      className='absolute top-4 left-4 text-gray-500'
      />
      {/* <i className="ri-search-line absolute top-4 left-4 text-gray-500"></i> */}
    </div>
    </div>
  )
}

export default UserSearch