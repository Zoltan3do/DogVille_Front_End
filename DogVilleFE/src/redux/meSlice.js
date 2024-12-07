import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const uploadAvatar = createAsyncThunk(
    'meFetch/uploadAvatar',
    async (file, { rejectWithValue }) => {
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const url = "http://localhost:3001/utenti/avatar";
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("Access Token")}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Errore durante l'upload dell'immagine");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("Errore durante l'upload dell'immagine: " + error);
        }
    }
);


export const executemefetch = createAsyncThunk(
    'meFetch/executemefetch',
    async (_, { rejectWithValue }) => {
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
                return rejectWithValue(null);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Errore durante la fetch:", error);
            return rejectWithValue(null);
        }
    }
);

export const updateMeDataFetch = createAsyncThunk(
    'meFetch/updateMeDataFetch',
    async (updatedData, { rejectWithValue }) => {
        try {
            const url = "http://localhost:3001/utenti/me";
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Access Token")}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Errore durante l'aggiornamento");
            }

            const data = await response.json();
            return data;

        } catch (error) {
            return rejectWithValue("Errore durante la fetch PUT" + ": " + error);
        }
    }
);

export const meSlice = createSlice({
    name: "meFetch",
    initialState: {
        value: null,
        error: null,
        status: 'idle',
        updateStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(executemefetch.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(executemefetch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(executemefetch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.value = null;
            })
            .addCase(updateMeDataFetch.pending, (state) => {
                state.updateStatus = 'loading';
            })
            .addCase(updateMeDataFetch.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                state.value = action.payload;
            })
            .addCase(updateMeDataFetch.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(uploadAvatar.pending, (state) => {
                state.avatarUploadStatus = 'loading';
            })
            .addCase(uploadAvatar.fulfilled, (state) => {
                state.avatarUploadStatus = 'succeeded';
            })
            .addCase(uploadAvatar.rejected, (state) => {
                state.avatarUploadStatus = 'failed';
            });
    }
});

export default meSlice.reducer;