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


export const executedogsfetch = (filters, page, sorting) => async (dispatch) => {
    try {
        const genericUrl = `${import.meta.env.VITE_URL}/cani/filter`;

        const filterParams = Object.entries(filters)
            .filter(([key, value]) => value)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");

        // Gestione del parametro di ordinamento
        let sortParam = "";
        if (sorting) {
            const [sortBy, direction] = sorting.split(',');
            sortParam = `&sortBy=${sortBy}&direction=${direction}`;
        }

        const url = filterParams
            ? `${genericUrl}?${filterParams}&page=${page}${sortParam}`
            : `${genericUrl}?page=${page}${sortParam}`;

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