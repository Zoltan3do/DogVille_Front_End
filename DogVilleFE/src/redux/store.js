import { configureStore } from "@reduxjs/toolkit"
import { sidebarReducer } from "./sidebarSlice"
import { loginToggleReducer } from "./loginToggleSlice"
import { loginFetchReducer } from "./loginFetchSlice"
import { dogsFetchReducer } from "./dogsListFetchSlice"
import meFetchReducer from "./meSlice"
import { dogFetchReducer } from "./singleDogFetch"
import psicologicalProfilesReducer from "./psicologicalProfilesSlice";
import adoptionsReducer from "./adoptionsSlice";

export default configureStore({
    reducer: {
        sidebarToggle: sidebarReducer,
        loginModalToggle: loginToggleReducer,
        loginFetches: loginFetchReducer,
        dogsFetch: dogsFetchReducer,
        meFetch: meFetchReducer,
        dogFetch: dogFetchReducer,
        psicologicalProfiles: psicologicalProfilesReducer,
        adoptions: adoptionsReducer,
    }
})