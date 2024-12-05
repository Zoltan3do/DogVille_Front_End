import { createSlice } from "@reduxjs/toolkit"

export const meSlice = createSlice({
    name: "meFetch",

    initialState: {
        value: []
    },

    reducers: {
        setMeData: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const executemefetch = () => async (dispatch) => {
    try {
        const url = "http://locahost:3001/utenti/me";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Access Token")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
        }

        const data = await response.json();
        console.log('Dati ricevuti dal backend:', data);

        dispatch(setMeData(data));
        return { success: true };
    } catch (error) {
        console.error("Errore durante la fetch:", error);
    }
};

export const { setMeData } = meSlice.actions;
export const meFetchReducer = meSlice.reducer;