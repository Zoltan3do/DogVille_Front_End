import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const executeLoginFetch = createAsyncThunk(
    'loginFetches/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const url = "http://localhost:3001/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            localStorage.setItem("Access Token", data.accessToken);
            return data;
        } catch (error) {
            return rejectWithValue("Errore di connessione al server " + error)
        }
    }
);

export const executeRegisterFetch = createAsyncThunk(
    'loginFetches/register',
    async ({ name, surname, address, telephoneNumber, email, password }, { rejectWithValue }) => {
        try {
            const url = "http://localhost:3001/auth/register";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name, 
                    surname, 
                    address, 
                    telephoneNumber, 
                    email, 
                    password 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("Errore di connessione al server "+ error);
        }
    }
);

export const loginFetchSlice = createSlice({
    name: "loginFetches",
    initialState: {
        value: {},
        status: 'idle',
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(executeLoginFetch.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(executeLoginFetch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.value = action.payload;
            })
            .addCase(executeLoginFetch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(executeRegisterFetch.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(executeRegisterFetch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.value = action.payload;
            })
            .addCase(executeRegisterFetch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { clearError } = loginFetchSlice.actions;
export const loginFetchReducer = loginFetchSlice.reducer;