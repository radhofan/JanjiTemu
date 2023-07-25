import {configureStore, createSlice} from "@reduxjs/toolkit"



const initialStateGuest = {value: {username: "", ada:false}};
const nomorTelpon = createSlice({
    name: "nomorTelpon",
    initialState: initialStateGuest,
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },

        logout: (state) => {
            state.value = initialStateGuest;
        }
    }
})

const initialStateAdmin = {value: {idRumahSakit: 0, inisial:""}};
const idrs = createSlice({
    name: "idrs",
    initialState: initialStateAdmin,
    reducers: {
        loginAdmin: (state, action) => {
            state.value = action.payload
        },

        logoutAdmin: (state) => {
            state.value = initialStateAdmin;
        }
    }
})

const initialStateRs = {value: {idDokter: 0, idrs: 0, nama_dokter: ""}};
const rumahSakit = createSlice({
    name: "rumahSakit",
    initialState: initialStateRs,
    reducers: {
        getData: (state, action) => {
            state.value = action.payload
        },
    }
})





export const {login, logout} = nomorTelpon.actions
export const {loginAdmin, logoutAdmin} = idrs.actions
export const {getData} = rumahSakit.actions

export const store = configureStore({
    reducer: {
        user: nomorTelpon.reducer,
        admin: idrs.reducer,
        rumahSakit: rumahSakit.reducer,
    }
})