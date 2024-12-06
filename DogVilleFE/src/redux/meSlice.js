import { createSlice } from "@reduxjs/toolkit"

export const meSlice = createSlice({
    name: "meFetch",

    initialState: {
        value: null
    },

    reducers: {
        setMeData: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const executemefetch = () => async (dispatch) => {
    try {
        const url = "http://localhost:3001/utenti/me";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Access Token")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();

            dispatch(setMeData(null)); 
            return;
        }

        const data = await response.json();
        dispatch(setMeData(data)); 

    } catch (error) {
        console.error("Errore durante la fetch:", error);
        dispatch(setMeData(null));
    }
};


export const { setMeData } = meSlice.actions;
export const meFetchReducer = meSlice.reducer;