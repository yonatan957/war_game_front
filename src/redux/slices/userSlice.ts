import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DataStatus, userState } from "../../types/redux";
import { IUser } from "../../types/user";
import { socket } from "../../main";

const initialState: userState = {
  error: null,
  status: DataStatus.IDLE,
  user: null,
};

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (userData: { userName: string; password: string }, thunkApi) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        thunkApi.rejectWithValue("can't login, please try again");
        return;
      }
      const data = await res.json();
      thunkApi.fulfillWithValue(data);
      data.attacker
        ? localStorage.setItem("Atoken", data.token)
        : localStorage.setItem("Dtoken", data.token);
      socket.emit("goToRoom", { room: data.organization });
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    decrese: (state, action: PayloadAction<string>) => {
      state.user!.resources.find((resource) => resource.name == action.payload)!
        .amount--;
    },
    encrese: (state, action: PayloadAction<string>) => {
      state.user!.resources.find((resource) => resource.name == action.payload)!
        .amount++;
    },
    decreseBudget: (state, action: PayloadAction<number>) => {
      state.user!.budget -= action.payload;
    },
    initUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
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
      });
  },
});

export default userSlice;
