import { createSlice } from "@reduxjs/toolkit"

export const loginFetchSlice = createSlice({
    name: "loginFetches",

    initialState: {
        value: {}
    },

    reducers: {
    }
})

export const executeLoginFetch = (param1, param2) => async () => {
    try {
        const url = "http://localhost:3001/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: param1, password: param2 }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
            return { success: false };
        }

        const data = await response.json();
        localStorage.setItem("Access Token", data.accessToken);
        alert("Login avvenuto con successo!");
        return { success: true };
    } catch (error) {
        console.error("Errore durante la fetch:", error);
        return { success: false };
    }
};



export const executeRegisterFetch = (param1, param2, param3, param4, param5, param6) => async () => {
    try {
        const url = "http://locahost:3001/auth/register";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: param1, surname: param2, address: param3, telephoneNumber: param4, email: param5, password: param6}),
        });
        if (!response.ok) {
            response.json().then((error) => {
                alert(error.message)
            })
            throw new Error("Errore nella chiamata API");
        }
        alert("Resitrazione avvenuta con successo!")
    } catch (error) {
        console.error("Errore durante la fetch:", error);
    }
};


export const loginFetchReducer = loginFetchSlice.reducer;