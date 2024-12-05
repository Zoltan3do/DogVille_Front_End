import { createSlice } from "@reduxjs/toolkit"

export const dogsFetchSlice = createSlice({
    name: "dogsFetch",

    initialState: {
        value: []
    },

    reducers: {
        setDogsData: (state, action) => {
            state.value = action.payload;
        },
    }
})


export const executedogsfetch = (filters, page) => async (dispatch) => {
    try {
        const genericUrl = "http://localhost:3001/cani/filter";

        const filterParams = Object.entries(filters)
            .filter(([key, value]) => value)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");

        const url = filterParams ? `${genericUrl}?${filterParams}&page=${page}` : `${genericUrl}?page=${page}`;

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

        dispatch(setDogsData(data));
        return { success: true };
    } catch (error) {
        console.error("Errore durante la fetch:", error);
        return { success: false };
    }
};



export const { setDogsData } = dogsFetchSlice.actions;
export const dogsFetchReducer = dogsFetchSlice.reducer;