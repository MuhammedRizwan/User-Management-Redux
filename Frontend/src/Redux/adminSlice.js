import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const API = 'http://localhost:3005/admin'


const initialState = {
    admin: null,
    userData: null,
    loading: false,
    error: null
}

export const adminLogin = createAsyncThunk(
    'admin/adminLogin',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}`, credentials);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUserData(state, action) {
            const { users } = action.payload
            state.userData = users
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false
                const { admin } = action.payload
                state.admin = admin
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})
export const { setUserData } = adminSlice.actions
export default adminSlice.reducer