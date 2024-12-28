import { createSlice } from "@reduxjs/toolkit"

export const sidebarSlice = createSlice({
    name: "sidebarToggle",

    initialState: {
        value: false
    },

    reducers: {
        changeSidebarState: (state, action) => {
            state.value = action.payload
        },
    }
})



export const { changeSidebarState } = sidebarSlice.actions
export const sidebarReducer = sidebarSlice.reducer
