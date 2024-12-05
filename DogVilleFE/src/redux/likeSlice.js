import { createSlice } from "@reduxjs/toolkit"

export const likeSlice = createSlice({
    name: "likesFetch",
    initialState: {
      value: [] 
    },
    reducers: {
      addLike: (state, action) => {
        const dogId = action.payload;
        const dogIndex = state.value.findIndex(dog => dog.id === dogId);
        if (dogIndex !== -1) {
          state.value[dogIndex].like_count += 1;
        }
      },
      removeLike: (state, action) => {
        const dogId = action.payload;
        const dogIndex = state.value.findIndex(dog => dog.id === dogId);
        if (dogIndex !== -1) {
          state.value[dogIndex].like_count -= 1;
        }
      },
    }
  });
  

export const addLikefetch = (dogId) => async () => {
    try {
        const url = `http://locahost:3001/likes/dogs/${dogId}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Access Token")}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
        } else {
            console.log("Like aggiunto con successo")
        }

    } catch (error) {
        console.error("Errore durante la fetch:", error);
    }
};


export const removeLikefetch = (dogId) => async () => {
    try {
        const url = `http://locahost:3001/likes/dogs/${dogId}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Access Token")}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
        } 

    } catch (error) {
        console.error("Errore durante la fetch:", error);
    }
};


export const likesFetchReducer = likeSlice.reducer;
export const { addLike } = likeSlice.actions;
export const { removeLike } = likeSlice.actions;