import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const API = 'http://localhost:3005'

const initialState = {
    user: null,
    errorMessage: null,
    loading: false,
    error: null,
}

export const userSignUp = createAsyncThunk(
    'user/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/signup`, userData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const userSignIn = createAsyncThunk(
    'user/signIn',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/login`, userData);
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.user._id);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchUserData = createAsyncThunk(
    'user/fetchUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/user/${userId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false

            })
            .addCase(userSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(userSignIn.pending, (state) => {
                state.loading = false;
            })
            .addCase(userSignIn.fulfilled, (state, action) => {
                const { user, error } = action.payload
                state.user = user;
                if (error) {
                    state.errorMessage = error;
                }
                state.loading = false;
            })
            .addCase(userSignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.loading = false
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})
export const { logout, setData } = userSlice.actions;
export default userSlice.reducer