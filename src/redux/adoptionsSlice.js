import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createAdoption = createAsyncThunk(
  "adoptions/createAdoption",
  async (adoptionData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/adozioni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
        body: JSON.stringify(adoptionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Errore durante la creazione dell'adozione"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        "Errore durante la creazione dell'adozione: " + error.message
      );
    }
  }
);

export const fetchAdoptionsByUser = createAsyncThunk(
  "adoptions/fetchAdoptionsByUser",
  async ({ email, page, size }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_URL}/adozioni/user?email=${email}&page=${page}&size=${size}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Errore durante il recupero delle adozioni"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        "Errore durante la fetch delle adozioni: " + error.message
      );
    }
  }
);

export const deleteAdoption = createAsyncThunk(
  "adoptions/deleteAdoption",
  async (adozioneId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/adozioni/${adozioneId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Errore durante l'eliminazione dell'adozione"
        );
      }

      return adozioneId;
    } catch (error) {
      return rejectWithValue(
        "Errore durante l'eliminazione dell'adozione: " + error.message
      );
    }
  }
);

export const addAdoptionDocument = createAsyncThunk(
  "adoptions/addDocument",
  async ({ adoptionId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("document", file);

      const response = await fetch(
        `${import.meta.env.VITE_URL}/adozioni/${adoptionId}/document`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Errore durante il caricamento del documento"
        );
      }

      const documentUrl = await response.text();
      return { adoptionId, documentUrl };
    } catch (error) {
      return rejectWithValue(
        "Errore durante il caricamento del documento: " + error.message
      );
    }
  }
);

export const addAdoptionSign = createAsyncThunk(
  "adoptions/addSign",
  async ({ adoptionId, file }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/adozioni/${adoptionId}/sign`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
          },
          body: file,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Errore durante il caricamento della firma"
        );
      }

      const documentUrl = await response.text();
      return { adoptionId, documentUrl };
    } catch (error) {
      return rejectWithValue(
        "Errore durante il caricamento della firma: " + error.message
      );
    }
  }
);

export const fetchAdoptionState = createAsyncThunk(
  "adoptions/fetchAdoptionState",
  async (adoptionId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/adozioni/${adoptionId}/state`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message ||
            "Errore durante il recupero dello stato dell'adozione"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        "Errore durante la fetch dello stato dell'adozione: " + error.message
      );
    }
  }
);

export const adoptionsSlice = createSlice({
  name: "adoptions",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAdoption.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createAdoption.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...(state.data || []), action.payload];
        state.totalElements += 1;
      })
      .addCase(createAdoption.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAdoptionsByUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdoptionsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.content;
        state.currentPage = action.payload.number;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchAdoptionsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteAdoption.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAdoption.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (adoption) => adoption.id !== action.payload
        );
        state.totalElements -= 1;
      })
      .addCase(deleteAdoption.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addAdoptionDocument.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addAdoptionDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        const adoptionIndex = state.data.findIndex(
          (adoption) => adoption.id === action.payload.adoptionId
        );
        if (adoptionIndex !== -1) {
          state.data[adoptionIndex].document = action.payload.documentUrl;
        }
      })
      .addCase(addAdoptionDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAdoptionState.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdoptionState.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adoptionState = action.payload;
      })
      .addCase(fetchAdoptionState.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adoptionsSlice.reducer;
