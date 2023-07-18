import {configureStore, createSlice} from "@reduxjs/toolkit"



const initialState = {value: {username: "", ada:false}};
const nomorTelpon = createSlice({
    name: "nomorTelpon",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },

        logout: (state) => {
            state.value = initialState.value
        }
    }
})

export const {login, logout} = nomorTelpon.actions
export const store = configureStore({
    reducer: {
        user: nomorTelpon.reducer
    }
})