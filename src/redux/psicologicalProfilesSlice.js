import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPsicologicalProfiles = createAsyncThunk(
    "psicologicalProfiles/fetchProfiles",
    async () => {
        const response = await fetch("http://localhost:3001/api/psycologicalProfiles/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Access Token")}`,
            },
        }
        );
        if (!response.ok) {
            throw new Error("Errore nel recupero dei profili psicologici");
        }
        const data = await response.json();
        return data;
    }
);


export const psicologicalProfilesSlice = createSlice({
    name: "psicologicalProfiles",
    initialState: {
        value: [],
        status: "idle",
        error: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchPsicologicalProfiles.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPsicologicalProfiles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.value = action.payload;
            })
            .addCase(fetchPsicologicalProfiles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export default psicologicalProfilesSlice.reducer;
