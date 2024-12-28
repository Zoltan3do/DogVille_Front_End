import { createSlice } from "@reduxjs/toolkit"

export const loginToggleSlice = createSlice({
    name: "loginModalToggle",

    initialState: {
        value: false
    },

    reducers: {
        changeModalState: (state, action) => {
            state.value = action.payload
        }
    }
})



export const { changeModalState } = loginToggleSlice.actions
export const loginToggleReducer = loginToggleSlice.reducer