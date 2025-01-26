import { createSlice } from "@reduxjs/toolkit"

export const singleDogFetchSlice = createSlice({
    name: "dogFetch",

    initialState: {
        value: null
    },

    reducers: {
        setDogData: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const executedogfetch = (id) => async (dispatch) => {
    try {
        const url = `${import.meta.env.VITE_URL}/cani/${id}`;

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
            return { success: false };
        }

        const data = await response.json();
        console.log('Dati ricevuti dal backend:', data);

        dispatch(setDogData(data));
        return { success: true };
    } catch (error) {
        console.error("Errore durante la fetch:", error);
        return { success: false };
    }
};



export const { setDogData } = singleDogFetchSlice.actions;
export const dogFetchReducer = singleDogFetchSlice.reducer;