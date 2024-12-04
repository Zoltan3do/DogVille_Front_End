import { configureStore } from "@reduxjs/toolkit"
import { sidebarReducer } from "./sidebarSlice"
import { loginToggleReducer } from "./loginToggleSlice"
import { loginFetchReducer } from "./loginFetchSlice"
import { dogsFetchReducer } from "./dogsListFetchSlice"

export default configureStore({
    reducer: {
        sidebarToggle: sidebarReducer,
        loginModalToggle: loginToggleReducer,
        loginFetches: loginFetchReducer,
        dogsFetch: dogsFetchReducer
    }
})

