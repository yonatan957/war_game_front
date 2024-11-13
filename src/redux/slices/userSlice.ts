import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataStatus, userState } from "../../types/redux";
import { IUser } from "../../types/user";

const initialState: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null,
};

export const fetchLogin = createAsyncThunk('user/login',
    async (userData: { userName: string, password: string, }, thunkApi) => {
        try {
            const res = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!res.ok) {
                thunkApi.rejectWithValue("can't login, please try again");
                return
            }
            const data = await res.json();
            thunkApi.fulfillWithValue(data);
            localStorage.setItem('token', data.token)
            return data
        } catch (error) {
            thunkApi.rejectWithValue(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder:ActionReducerMapBuilder<userState>) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.status = DataStatus.LOADING;
            state.error = null;
            state.user = null;
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
            state.status = DataStatus.SUCCESS;
            state.error = null;
            state.user = action.payload as IUser;
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            state.status = DataStatus.FAILED;
            state.error = action.payload as string;
            state.user = null;
        })
    }
})

export default userSlice;