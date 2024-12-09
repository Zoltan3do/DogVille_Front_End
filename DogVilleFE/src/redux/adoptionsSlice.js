import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAdoptionsByUser = createAsyncThunk(
    'adoptions/fetchAdoptionsByUser',
    async ({ email, page, size }, { rejectWithValue }) => {
        try {
            const url = `http://localhost:3001/adozioni/user?email=${email}&page=${page}&size=${size}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Access Token")}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Errore durante il recupero delle adozioni");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("Errore durante la fetch delle adozioni: " + error.message);
        }
    }
);

export const adoptionsSlice = createSlice({
    name: "adoptions",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdoptionsByUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAdoptionsByUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.content;
                state.currentPage = action.payload.number;
                state.totalPages = action.payload.totalPages;
                state.totalElements = action.payload.totalElements;
            })
            .addCase(fetchAdoptionsByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default adoptionsSlice.reducer;
