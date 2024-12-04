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


export const executedogsfetch = ([...filtri], [...valoreFiltri]) => async (dispatch) => {
    try {
      const genericUrl = "http://localhost:3001/cani/filter"; 
  
      let url = genericUrl;
      let filterParams = "";
  
      if (filtri.length > 0 && valoreFiltri.length > 0) {
        filterParams = filtri
          .map((f, i) => {
            return `${f}=${valoreFiltri[i]}`;
          })
          .join("&");
  
        url = `${genericUrl}?${filterParams}`;
      }
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("Access Token"),
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
      }
  
      const data = await response.json();
      dispatch(setDogsData(data));
  
      return { success: true };
    } catch (error) {
      console.error("Errore durante la fetch:", error);
    }
  };
  


export const { setDogsData } = dogsFetchSlice.actions;
export const dogsFetchReducer = dogsFetchSlice.reducer;