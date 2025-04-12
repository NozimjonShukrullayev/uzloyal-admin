import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    const savedState = localStorage.getItem("activeMenu")
    return savedState ? savedState : "dashboard"
}

const activeMenuSlice =  createSlice({
    name:"activeMenu",
    initialState:getInitialState(),
    reducers:{
        setActiveMenu: (state,action) => {
            localStorage.setItem("activeMenu",action.payload)
            return action.payload
        }
    }
})

export const {setActiveMenu} = activeMenuSlice.actions

export default activeMenuSlice.reducer