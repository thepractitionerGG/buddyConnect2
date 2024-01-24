import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        allUsers: [],
        allChats: []
    },
    reducers:{
        SetUser:(state ,action)=>{
            state.user = action.payload
        },
        SetAllUser: (state ,action)=>{
            state.allUsers = action.payload
        },
        SetAllChats:(state,action)=>{
            state.allChats=action.payload;
        } 
    }
})
export const {SetUser , SetAllUser,SetAllChats} = userSlice.actions
export default userSlice.reducer