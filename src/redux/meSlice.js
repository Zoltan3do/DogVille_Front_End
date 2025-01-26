import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadAvatar = createAsyncThunk(
  "meFetch/uploadAvatar",
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const url = `${import.meta.env.VITE_URL}/utenti/avatar`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Errore durante l'upload dell'immagine"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Errore durante l'upload dell'immagine: " + error);
    }
  }
);

export const executemefetch = createAsyncThunk(
  "meFetch/executemefetch",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_URL}/utenti/me`;
      const token = localStorage.getItem("Access Token");

      if (!token) {
        console.error("Token mancante!");
        return rejectWithValue("Token non presente");
      }

      console.log("URL della fetch:", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // Legge il messaggio di errore
        console.error("Errore dal server:", response.status, errorText);
        return rejectWithValue(`Errore dal server: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore durante la fetch:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateMeDataFetch = createAsyncThunk(
  "meFetch/updateMeDataFetch",
  async (updatedData, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_URL}/utenti/me`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Errore durante l'aggiornamento"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Errore durante la fetch PUT" + ": " + error);
    }
  }
);

export const addProfileToUser = createAsyncThunk(
  "meFetch/addProfileToUser",
  async ({ userId, profileType }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/utenti/${userId}/profiles/${profileType}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add profile");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeProfileFromUser = createAsyncThunk(
  "meFetch/removeProfileFromUser",
  async ({ userId, profileType }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_URL
        }/api/users/${userId}/profiles/${profileType}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove profile");
      }

      return { userId, profileType };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const meSlice = createSlice({
  name: "meFetch",
  initialState: {
    value: null,
    error: null,
    status: "idle",
    updateStatus: "idle",
    avatarUploadStatus: "idle",
    profileStatus: "idle",
    profiles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(executemefetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(executemefetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(executemefetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.value = null;
      })
      .addCase(updateMeDataFetch.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateMeDataFetch.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.value = action.payload;
      })
      .addCase(updateMeDataFetch.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.avatarUploadStatus = "loading";
      })
      .addCase(uploadAvatar.fulfilled, (state) => {
        state.avatarUploadStatus = "succeeded";
      })
      .addCase(uploadAvatar.rejected, (state) => {
        state.avatarUploadStatus = "failed";
      })
      .addCase(addProfileToUser.pending, (state) => {
        state.profileStatus = "loading";
      })
      .addCase(addProfileToUser.fulfilled, (state) => {
        state.profileStatus = "succeeded";
      })
      .addCase(addProfileToUser.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.error = action.payload;
      })
      .addCase(removeProfileFromUser.pending, (state) => {
        state.profileStatus = "loading";
      })
      .addCase(removeProfileFromUser.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        state.value.profiles = state.value.profiles.filter(
          (profile) => profile.profileType !== action.payload.profileType
        );
      })
      .addCase(removeProfileFromUser.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default meSlice.reducer;
